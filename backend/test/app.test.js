const supertest = require('supertest');
const { app } = require('../app');

const api = supertest(app);

describe('when searching with query param', () => {
    test('Response is correct and in JSON format', async () => {
        await api.get('/api/items?q=samsung')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    })
    test('Searched items are 4 and author is "Nicolas Marquez"', async () => {
        const response = await api.get('/api/items?q=samsung');
        expect(response.body.items).toHaveLength(4);
        expect(response.body.author).toMatchObject({name:"Nicolas",lastname:"Marquez"})
    })
    test('Return empty array if no query',async () => {
        const response = await api.get('/api/items?q=samsung')
        .expect(200);
        expect(response.body.items).toHaveLength(4);
    })
    test('Categories are an array of strings', async () => {
        const response = await api.get('/api/items?q=samsung');
        expect(response.body.categories.every(elem=>typeof elem === 'string')).toBe(true);
    })
})

describe('when searching for a specific item',() => {
    test('item must have description and sold quantity', async () => {
        const response = await api.get('/api/items/MLA1127156356');
        expect(response.body.item.description).toBeDefined();
        expect(response.body.item.sold_quantity).toBeDefined();
    })
    test('fail if the item id is incorrect', async () => {
        await api.get('/api/items/someBadId');
        expect(400);
    })
})
