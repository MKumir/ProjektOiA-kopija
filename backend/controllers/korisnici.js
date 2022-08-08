const korisniciRouter = require('express').Router()
const Korisnik = require('../models/Korisnik')
const bcrypt = require('bcrypt')

korisniciRouter.get('/', async (req, res) => {
    const korisnici = await Korisnik.find({})
    .populate('isporuke', {proizvod: 1, kolicina: 1, sektor: 1}) //inner join

    res.json(korisnici)
})

korisniciRouter.post('/', async (req, res) => {
    const sadrzaj = req.body

    const runde = 10
    const passHash = await bcrypt.hash(sadrzaj.pass, runde)

    const korisnik = new Korisnik({
        ime: sadrzaj.ime,
        prezime: sadrzaj.prezime,
        uloga: sadrzaj.uloga,
        username: sadrzaj.username,
        passHash: passHash
    })

    const sprKorisnik = await korisnik.save()
    res.json(sprKorisnik)
})


module.exports = korisniciRouter
