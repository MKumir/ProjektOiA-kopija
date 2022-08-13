import axios from 'axios'

const osnovniUrl = 'http://localhost:3001/api/isporuke'

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

const osvjezi = async (id, noviObjekt) => {
    // DODAJ TOKEN
    const config = {
        headers: {Authorization: token}
    } 
    const odgovor = await axios.put(`${osnovniUrl}/${id}`, noviObjekt, config)
    return odgovor
}

const brisi = (id) => {
    const config = {
        headers: {Authorization: token}
    }
    return axios.delete(`${osnovniUrl}/${id}`, config)
}

const isporukeAkcije = {
    dohvatiSve,
    stvori,
    osvjezi,
    brisi,
    postaviToken
}

export default isporukeAkcije;

