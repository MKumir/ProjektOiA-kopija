const isporukeRouter = require('express').Router()
const Isporuka = require('../models/Isporuka')

isporukeRouter.get('/', async (req, res) => {
    const isporuke = await Isporuka.find({})
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

    const isporuka = new Isporuka({
        proizvod: podatak.proizvod,
        kolicina: podatak.kolicina,
        sektor: podatak.sektor,
        datum: new Date(),
        status: podatak.status || false
    })

    const spremljenaIsporuka = await isporuka.save()
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