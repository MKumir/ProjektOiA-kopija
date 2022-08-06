
let isporuke = [
    {
      id: 1,
      proizvod: 'Lubenice',
      kolicina: 5,
      datum: new Date(),
      sektor: 'A',
      status: true
    },
    {
      id: 2,
      proizvod: 'Kruske',
      kolicina: 10,
      datum: new Date(),
      sektor: 'B',
      status: true
    },
    {
        id: 3,
        proizvod: 'Jabuke',
        kolicina: 17,
        datum: new Date(),
        sektor: 'C',
        status: false
    }
]

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())


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
    res.json(isporuke)
})


app.get('/api/isporuke/:id', (req, res) => {
    const id = Number(req.params.id)
    const isporuka = isporuke.find(i => i.id === id)
    if (isporuka){
        res.json(isporuka)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/isporuke/:id', (req,res) => {
    const id = Number(req.params.id)
    console.log('Brisem isporuku sa ID: ', id)
    isporuke = isporuke.filter(i => i.id !== id)
    res.status(204).end()
})

app.post('/api/isporuke', (req, res) => {

    const podatak = req.body
    if(!podatak.proizvod || !podatak.kolicina){
        return res.status(400).json({
            error: 'Nedostaje sadrzaj isporuke'
        })
    }

    const isporuka = {
        proizvod: podatak.proizvod,
        kolicina: Number(podatak.kolicina),
        datum: new Date(),
        sektor: podatak.sektor,
        status: podatak.status || false,
        id: generirajId()
    }

    isporuke = isporuke.concat(isporuka)
    res.json(isporuka)
})

app.put('/api/isporuke/:id', (req, res) => {
    
    const podatak = req.body
    const id = Number(req.params.id)
    console.log('Promjena vaznosti isporuke sa ID', id)
    isporuke = isporuke.map(i => i.id !== id ? i : podatak)
    console.log(isporuke)
    res.json(podatak)
})

const generirajId = () => {
    const maxId = isporuke.length > 0
    ? Math.max(...isporuke.map(p => p.id))
    : 0
    return maxId + 1
}

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
})
