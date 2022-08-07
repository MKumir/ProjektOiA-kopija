const Isporuka = require('../models/Isporuka')

const pocetneIsporuke = [
    {
        id: 1,
        proizvod: 'Prvi testni proizvod',
        kolicina: 10,
        sektor: 'A',
        datum: new Date(),
        status: true
    },
    {
        id: 2,
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

module.exports = {
    pocetneIsporuke, isporukeIzBaze
}