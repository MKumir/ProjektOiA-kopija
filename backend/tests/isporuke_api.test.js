const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const pomocni = require('./dohvatTestPodataka')

const api = supertest(app)

const Isporuka = require('../models/Isporuka')

beforeEach( async () => {
    await Isporuka.deleteMany({})
    let i = new Isporuka(pomocni.pocetneIsporuke[0])
    await i.save()
    i = new Isporuka(pomocni.pocetneIsporuke[1])
    await i.save()
})

describe('Testovi za GET', () => {
    test('Isporuke se vracaju kao JSON', async () => {
        await api
            .get('/api/isporuke')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Dohvat svih isporuka', async () => {
        const isporuke = await pomocni.isporukeIzBaze()
        expect(isporuke).toHaveLength(pomocni.pocetneIsporuke.length)
      })
    
    test('Imamo 2 isporuke', async () => {
        const isporuke = await pomocni.isporukeIzBaze()
        expect(isporuke).toHaveLength(2)
    })
    
    test('Naziv proizvoda prve isporuke je Prvi testni proizvod', async () => {
        const isporuke = await pomocni.isporukeIzBaze()
        expect(isporuke[0].proizvod).toBe('Prvi testni proizvod')
    })

    test('Dohvat specificne poruke', async () => {
        const isporukePocetak = await pomocni.isporukeIzBaze()
        const trazenaIsporuka = isporukePocetak[0]
      
        const odgovor = await api
        .get(`/api/isporuke/${trazenaIsporuka.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
        const jsonIsporuka = JSON.parse(JSON.stringify(trazenaIsporuka))
        expect(odgovor.body).toEqual(jsonIsporuka)
      })
})


describe('Testovi za POST', () => {
    test('Dodavanje ispravne isporuke', async () => {
        const novaIsporuka = {
            proizvod: 'TestProizvod',
            kolicina: 10,
            sektor: 'TestSektor',
            status: true
        }
    
        await api
        .post('/api/isporuke')
        .send(novaIsporuka)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
        const isporukeNaKraju = await pomocni.isporukeIzBaze()
        expect(isporukeNaKraju).toHaveLength(pomocni.pocetneIsporuke.length + 1)
    
        const proizvodi = isporukeNaKraju.map(i => i.proizvod)
        expect(proizvodi).toContain('TestProizvod')
    })
    
    test('Dodavanje isporuke bez naziva proizvoda', async () => {
        const novaIsporuka = {
            kolicina: 10,
            sektor: 'TestSektor',
            status: true
        }
        await api 
        .post('/api/isporuke')
        .send(novaIsporuka)
        .expect(400)
    
        const isporukeNaKraju = await pomocni.isporukeIzBaze()
        expect(isporukeNaKraju).toHaveLength(pomocni.pocetneIsporuke.length)
    })
    
    test('Dodavanje isporuke s neispravnom kolicinom(<= 0)', async () => {
        const novaIsporuka = {
            kolicina: 0,
            sektor: 'TestSektor',
            status: true
        }
        await api 
        .post('/api/isporuke')
        .send(novaIsporuka)
        .expect(400)
    
        const isporuke = await pomocni.isporukeIzBaze()
        expect(isporuke).toHaveLength(pomocni.pocetneIsporuke.length)
    })

    test('Dodavanje isporuke bez tokena', async () => {
        const novaIsporuka = {
            kolicina: 10,
            sektor: 'TestSektor',
            status: true
        }
        await api 
        .post('/api/isporuke')
        .send(novaIsporuka)
        .expect(401)
    
        const isporukeNaKraju = await pomocni.isporukeIzBaze()
        expect(isporukeNaKraju).toHaveLength(pomocni.pocetneIsporuke.length)
    })
})

describe('Testovi za DELETE', () => {
    test('Ispravno brisanje isporuke', async () => {
        const isporukePocetak = await pomocni.isporukeIzBaze()
        const isporukaZaBrisanje = isporukePocetak[0]
      
        await api
          .delete(`/api/isporuke/${isporukaZaBrisanje.id}`)
          .expect(204)
      
        const isporukeKraj = await pomocni.isporukeIzBaze()
        expect(isporukeKraj).toHaveLength(isporukePocetak.length - 1)
      
        const proizvodi = isporukeKraj.map(i => i.proizvod)
        expect(proizvodi).not.toContain(isporukaZaBrisanje.proizvod)
      })
})


afterAll(() => {
    mongoose.connection.close()
})
