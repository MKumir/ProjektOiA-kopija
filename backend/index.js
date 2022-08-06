
let isporuke = [
    {
      id: 1,
      proizvod: 'Lubenice',
      kolicina: 5,
      sektor: 'A',
      datum: new Date(),
      status: true
    },
    {
      id: 2,
      proizvod: 'Kruske',
      kolicina: 10,
      sektor: 'B',
      datum: new Date(),
      status: true
    },
    {
        id: 3,
        proizvod: 'Jabuke',
        kolicina: 17,
        sektor: 'C',
        datum: new Date(),
        status: false
    }
]

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const Isporuka = require('./models/Isporuka')

const zathjevInfo = (req, res, next) => {
    console.log('Metoda: ', req.method)
    console.log('Putanja: ', req.path)
    console.log('Tijelo: ', req.body)
    console.log('---')
    next()
}
app.use(zathjevInfo)

app.get('/', (req, res) => {
    res.send('<h1>Pozdrav od Express servera!</h1>')
})

app.get('/api/isporuke', (req, res) => {
    Isporuka.find({}).then(rezultat =>{
        res.json(rezultat)
    })
})

app.get('/api/isporuke/:id', (req, res, next) => {
    Isporuka.findById(req.params.id)
    .then(rezultat => {
        if(rezultat){
            res.json(rezultat)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => {
        next(error)
    })
    // const id = Number(req.params.id)
    // const isporuka = isporuke.find(i => i.id === id)
    // if (isporuka){
    //     res.json(isporuka)
    // } else {
    //     res.status(404).end()
    // }
})

app.delete('/api/isporuke/:id', (req,res) => {
    Isporuka.findByIdAndRemove(req.params.id)
    .then(rezultat => {
        console.log("Podatak izbrisan")
        res.status(204).end()
    })
    .catch(err => next(err))

    // const id = Number(req.params.id)
    // console.log('Brisem isporuku sa ID: ', id)
    // isporuke = isporuke.filter(i => i.id !== id)
    // res.status(204).end()
})

app.post('/api/isporuke', (req, res) => {

    const podatak = req.body
    if(!podatak.proizvod || podatak.kolicina <=0 || !podatak.sektor){
        return res.status(400).json({
            error: 'Neispravni podaci isporuke'
        })
    }

    const novaIsporuka = new Isporuka({
        proizvod: podatak.proizvod,
        kolicina: podatak.kolicina,
        sektor: podatak.sektor,
        datum: new Date(),
        status: podatak.status || false
    })

    //isporuke = isporuke.concat(isporuka)
    novaIsporuka.save().then(rezultat => {
        res.json(rezultat)
    })
    
})

app.put('/api/isporuke/:id', (req, res) => {
    
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
    // const podatak = req.body
    // const id = Number(req.params.id)
    // console.log('Promjena vaznosti isporuke sa ID', id)
    // isporuke = isporuke.map(i => i.id !== id ? i : podatak)
    // console.log(isporuke)
    // res.json(podatak)
})

const generirajId = () => {
    const maxId = isporuke.length > 0
    ? Math.max(...isporuke.map(p => p.id))
    : 0
    return maxId + 1
}

const errorHandler = (err, req, res, next) => {
    console.log(err.message)

    if(err.name === 'CastError') {
        return res.status(400).send({error: 'Krivi format ID-a'})
    }
    next(err)
}

function zadnjiErrorHandler (err, req, res, next) {
    res.status(500).send('error', {error: err})
}

app.use(errorHandler)
app.use(zadnjiErrorHandler)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
})
