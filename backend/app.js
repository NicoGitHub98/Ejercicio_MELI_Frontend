const express = require('express')
var cors = require('cors');
const axios = require('axios').create({
  baseURL: 'https://api.mercadolibre.com',
});

const author = {
  name: "Nicolas",
  lastname: "Marquez"
}

const app = express();
app.use(cors());

const retrieveCategoryAsArray = async (categoryId) => {
  try {
      const categResponse = await axios.get('/categories/'+categoryId);
      return categResponse.data.path_from_root.map(category=>category.name);
    } catch (error) {
      console.error(`Error while trying to search category [${categoryId}] on MELI API.`, error)
      throw error;
    }
}

app.get('/', (req, res) => {
  res.send('<h2 style="text-align: center;">MELI Test Backend Server running!');
})

app.get('/api/items', async (req, res) => {
  let searchResponse;
  try {
    searchResponse = await axios.get('/sites/MLA/search', {
      params: {
        q: req.query.q
      }
    })
  } catch (error) {
    console.error(`Error while trying to search [${req.query.q}] on MELI API.`, error)
    res.status(error.response.status).json(error.response.data);
    return;
  }
  const responseData = searchResponse.data;
  const results = responseData.results.slice(0,4);
  
  let categResponse;
  let categories = [];

  if (results[0]?.category_id) {
    try {
      categories = await retrieveCategoryAsArray(results[0]?.category_id)
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
      return;
    }
  }

  const formattedResult = {
    author,
    categories,
    items: results.map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: (item.price % 1).toFixed(2).substring(2)
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      location: item.address.state_name
    }))
  }
  res.json(formattedResult)
})

app.get('/api/items/:id', async (req, res) => {
  let itemResponse, descriptionResponse;
  try {
    itemResponse = await axios.get('/items/' + req.params.id);
    descriptionResponse = await axios.get('/items/' + req.params.id + '/description');
  } catch (error) {
    console.error(`Error while trying to fetch item [${req.params.id}] info on MELI API.`, error)
    res.status(error.response.status).json(error.response.data);
    return;
  }

  const item = itemResponse.data;
  const itemDescription = descriptionResponse.data;
  let categories;
  try {
    categories = await retrieveCategoryAsArray(item?.category_id)
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
    return;
  }
  const formattedResult = {
    author,
    categories,
    item: {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: (item.price % 1).toFixed(2).substring(2)
      },
      picture: item.pictures[0].secure_url,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      description: itemDescription.plain_text
    }
  }
  res.json(formattedResult)
})

module.exports = {
  app,
  axios
}