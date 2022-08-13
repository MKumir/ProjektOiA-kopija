import axios from 'axios'

const osnovniUrl = 'http://localhost:3001/api/proizvodi'

let token = null
const postaviToken = noviToken => {
    token = `bearer ${noviToken}`
}

const dohvatiSve = () => {
    return axios.get(osnovniUrl)
}

const stvori = async (noviObjekt) => {
    // DODAJ TOKEN
    const config = {
        headers: {Authorization: token}
    }    

    const odgovor = await axios.post(osnovniUrl, noviObjekt, config)
    return odgovor
}

const proizvodiAkcije = {
    dohvatiSve,
    stvori,
    postaviToken
}

export default proizvodiAkcije;
