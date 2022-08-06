const mongoose = require('mongoose')

const user = process.env.ATLAS_USER
const password = process.env.ATLAS_PASS
const dbname = 'isporuke-api'
const url = `mongodb+srv://${user}:${password}@cluster0.xbqgsl2.mongodb.net/${dbname}?retryWrites=true&w=majority`
 
const isporukaSchema = new mongoose.Schema({
    proizvod: String,
    kolicina: Number,
    sektor: String,
    datum: Date,
    status: Boolean
})

isporukaSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = doc._id.toString()
        delete ret._id
        delete ret.__v
        return ret
    }
})

const Isporuka = mongoose.model('Isporuka', isporukaSchema, 'isporuke')

console.log('Spajamo se na bazu')

mongoose.connect(url)
    .then(res => {
        console.log('Spojeni smo na bazu')
    })
    .catch(err => {
        console.log('Greška pri spajanju', err.message)
    })

module.exports = Isporuka