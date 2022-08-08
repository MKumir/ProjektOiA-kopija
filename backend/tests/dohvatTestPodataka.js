const Isporuka = require('../models/Isporuka')
const Korisnik = require('../models/Korisnik')

const pocetneIsporuke = [
    {
        proizvod: 'Prvi testni proizvod',
        kolicina: 10,
        sektor: 'A',
        datum: new Date(),
        status: true
    },
    {
        proizvod: 'Drugi testni proizvod',
        kolicina: 20,
        sektor: 'B',
        datum: new Date(),
        status: false
    }
]

const isporukeIzBaze = async () => {
    const isporuke = await Isporuka.find({})
    return isporuke.map(i => i.toJSON())
}

const korisniciIzBaze = async () => {
    const korisnici = await Korisnik.find({})
    return korisnici.map(k => k.toJSON())
}

module.exports = {
    pocetneIsporuke, isporukeIzBaze, korisniciIzBaze
}