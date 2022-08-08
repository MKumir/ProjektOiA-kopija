const isporukeRouter = require('express').Router()
const Isporuka = require('../models/Isporuka')
const Korisnik = require('../models/Korisnik')

isporukeRouter.get('/', async (req, res) => {
    const isporuke = await Isporuka.find({})
    .populate('korisnik', { ime: 1, prezime: 1, uloga: 1})

    res.json(isporuke)
})

isporukeRouter.get('/:id', (req, res, next) => {
    Isporuka.findById(req.params.id)
    .then(isporuka => {
        if(isporuka){
            res.json(isporuka)
        } else {
            res.status(404).end()
        }
    })
    .catch(err => next(err))
})

isporukeRouter.delete('/:id', (req,res) => {
    Isporuka.findByIdAndRemove(req.params.id)
    .then(rezultat => {
        //console.log("Podatak izbrisan")
        res.status(204).end()
    })
    .catch(err => next(err))
})

isporukeRouter.post('/', async (req, res, next) => {
    const podatak = req.body
    const korisnik = await Korisnik.findById(podatak.korisnikId)

    const isporuka = new Isporuka({
        proizvod: podatak.proizvod,
        kolicina: podatak.kolicina,
        sektor: podatak.sektor,
        datum: new Date(),
        status: podatak.status || false,
        korisnik: korisnik._id
    })


    const spremljenaIsporuka = await isporuka.save()
    korisnik.isporuke = korisnik.isporuke.concat(spremljenaIsporuka._id)
    await korisnik.save()

    res.json(spremljenaIsporuka)
    
})

isporukeRouter.put('/:id', (req, res) => {
    
    const podatak = req.body
    const id = req.params.id

    const isporuka = {
        proizvod: podatak.proizvod,
        kolicina: podatak.kolicina,
        sektor: podatak.sektor,
        status: podatak.status
    }

    Isporuka.findByIdAndUpdate(id, isporuka, {new: true})
    .then( novaIsporuka => {
        res.json(novaIsporuka)
    })
    .catch(err => next(err))
})


module.exports = isporukeRouter