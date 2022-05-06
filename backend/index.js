const { app } = require('./app');
const port = process.env.SERVER_PORT || 10101;

app.listen(port, () => {
    console.log(`MELI Test Backend started on port "${port}"`)
  })