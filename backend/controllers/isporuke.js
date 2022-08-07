const isporukeRouter = require('express').Router()
const Isporuka = require('../models/Isporuka')

isporukeRouter.get('/', (req, res) => {
    Isporuka.find({}).then(rezultat =>{
        res.json(rezultat)
    })
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

isporukeRouter.post('/', (req, res, next) => {
    const podatak = req.body

    // if(!podatak.proizvod || podatak.kolicina <=0 || !podatak.sektor){
    //     return res.status(400).json({
    //         error: 'Neispravni podaci isporuke'
    //     })
    // }

    const novaIsporuka = new Isporuka({
        proizvod: podatak.proizvod,
        kolicina: podatak.kolicina,
        sektor: podatak.sektor,
        datum: new Date(),
        status: podatak.status || false
    })

    //isporuke = isporuke.concat(isporuka)
    novaIsporuka.save()
    .then(spremljenaIsporuka => {
        res.json(spremljenaIsporuka)
    })
    .catch(err => next(err))
    
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