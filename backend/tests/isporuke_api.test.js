const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('Isporuke se vracaju kao JSON', async () => {
    await api
        .get('/api/isporuke')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('Imamo 2 isporuke', async () => {
    const odg = await api.get('/api/isporuke')

    expect(odg.body).toHaveLength(2)
})

test('Naziv proizvoda prve isporuke je Prvi testni proizvod', async () =>{
    const odg = await api.get('/api/isporuke')

    expect(odg.body[0].proizvod).toBe('Prvi testni proizvod')
})


afterAll(() => {
    mongoose.connection.close()
})