const mongoose = require('mongoose')

const isporukaSchema = new mongoose.Schema({
    proizvod: {
        type: String,
        minLength: 2,
        required: true
    },
    kolicina: {
        type: Number,
        min: 1
    },
    sektor: String,
    datum: Date,
    status: {
        type: Boolean,
        default: false
    }
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

module.exports = Isporuka