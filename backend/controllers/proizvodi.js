const proizvodiRouter = require('express').Router()
const Isporuka = require('../models/Isporuka')
const Proizvod = require('../models/Proizvod')
const jwt = require('jsonwebtoken')

const dohvatiToken = (req) => {
    const auth = req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer')) {
        return auth.substring(7)
    }
    return null
}

proizvodiRouter.get('/', async (req, res) => {
    const proizvodi = await Proizvod.find({})
    .populate('isporuke', {proizvod: 1, kolicina: 1, sektor: 1})
    
    res.json(proizvodi)
})

proizvodiRouter.post('/', async (req, res, next) => {
    const podatak = req.body
    const token = dohvatiToken(req)

    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id){
        return res.status(401).json({error: "Neispravni token"})
    }

    const proizvod = new Proizvod({
        naziv: podatak.naziv,
        kategorija: podatak.kategorija
    })

    const spremljeniProizvod = await proizvod.save()
    res.json(spremljeniProizvod)
})


module.exports = proizvodiRouter
