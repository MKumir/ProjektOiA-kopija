const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const isporukeRouter = require('./controllers/isporuke')
const korisniciRouter = require('./controllers/korisnici')
const loginRouter = require('./controllers/login')
const proizvodiRouter = require('./controllers/proizvodi')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('Spajam se na', config.DB_URI)

mongoose.connect(config.DB_URI)
.then(res => {
    logger.info('Spojeni smo na bazu')
})
.catch(err => {
    logger.greska('Greška pri spajanju', err.message)
})

app.use(cors())
app.use(express.json())
app.use(middleware.zathjevInfo)

app.get('/', (req, res) => {
     res.send('<h1>Pozdrav od Express servera!</h1>')
})

app.use('/api/isporuke', isporukeRouter)
app.use('/api/korisnici', korisniciRouter)
app.use('/api/login', loginRouter)
app.use('/api/proizvodi', proizvodiRouter)

app.use(middleware.nepoznataRuta)
app.use(middleware.errorHandler)

module.exports = app

