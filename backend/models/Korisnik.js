const mongoose = require('mongoose')

const korisnikSchema = new mongoose.Schema({
    ime: String,
    prezime: String,
    uloga: String,
    username: String,
    passHash: String,
    isporuke : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Isporuka'
        }
    ]
})

korisnikSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        // Lozinka se ne bi trebala prikazati
        delete ret.passHash
        return ret
    }
})

const Korisnik = mongoose.model('Korisnik', korisnikSchema, 'korisnici')

module.exports = Korisnik
