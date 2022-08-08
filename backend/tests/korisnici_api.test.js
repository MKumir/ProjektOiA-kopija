const bcrypt = require('bcrypt')
const Korisnik = require('../models/Korisnik')
const pomocni = require('./dohvatTestPodataka')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('Kada imamo samo jednog korisnika u bazi', () => {
    beforeEach(async () => {
        await Korisnik.deleteMany({})

        const passHash = await bcrypt.hash('oarwa', 10)
        const korisnik = new Korisnik({
            ime: 'Marko',
            prezime: 'Kumir',
            uloga: 'admin',
            username: 'mkumir1',
            passHash: passHash
        })
        await korisnik.save()
    })

    test('Stvaranje novog korisnika', async () => {
        const pocetniKorisnici = await pomocni.korisniciIzBaze()

        const korisnik = {
            ime: 'Pero',
            prezime: 'Peric',
            uloga: 'radnik',
            username: 'pperic',
            pass: 'tajna'
        }

        await api 
        .post('/api/korisnici')
        .send(korisnik)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const korisniciKraj = await pomocni.korisniciIzBaze()
        expect(korisniciKraj).toHaveLength(pocetniKorisnici.length + 1)

        const korImena = korisniciKraj.map(k => k.username)
        expect(korImena).toContain(korisnik.username)
    })


    afterAll(async () => {
        await mongoose.connection.close()
    })
})
