import React, { useState, useEffect } from 'react'
import Isporuka from './components/Isporuka';
import LoginForma from './components/LoginForma';
import IsporukaForma from './components/IsporukaForma';
import isporukeAkcije from './services/isporuke'
import loginAkcije from './services/login'

const App = (props) => {

  const [isporuke, postaviIsporuke] = useState([])
  const [ispisSve, postaviIspis] = useState(true)
  const [username, postaviUsername] = useState('')
  const [pass, postaviPass] = useState('')
  const [korisnik, postaviKorisnika] = useState(null)

  const userLogin = async (e) => {
    e.preventDefault()
    try {
        const korisnik = await loginAkcije.prijava({
        username, 
        pass
      })
      window.localStorage.setItem('prijavljeniKorisnik', JSON.stringify(korisnik))
      isporukeAkcije.postaviToken(korisnik.token)
      postaviKorisnika(korisnik)
      postaviUsername('')
      postaviPass('')
      console.log(korisnik)
    } catch (exception) {
      alert('Neispravni podaci')
    }
  }

  const isporukeZaIspis = ispisSve
    ? isporuke
    : isporuke.filter(i => i.status === true)


  const promjenaStatusaIsporuke = (id) => {
    const isporuka = isporuke.find(i => i.id === id)
    const modIsporuka = {
      ...isporuka,
      status: !isporuka.status
    }

    isporukeAkcije.osvjezi(id, modIsporuka).then(res => {
      console.log(res.data)
      postaviIsporuke(isporuke.map(i => i.id !== id ? i : res.data))
    })
  }

  
  const brisiIsporuku = (id) => {
    isporukeAkcije.brisi(id).then(res => {
      console.log(res)
      postaviIsporuke(isporuke.filter(i => i.id !== id))
    })
  }

  useEffect( () => {
    isporukeAkcije.dohvatiSve().then(res => postaviIsporuke(res.data))
  }, [])

  useEffect( () => {
    const logiraniKorisnikJSON = window.localStorage.getItem('prijavljeniKorisnik')
    if (logiraniKorisnikJSON) {
      const korisnik = JSON.parse(logiraniKorisnikJSON)
      postaviKorisnika(korisnik)
      isporukeAkcije.postaviToken(korisnik.token)
    }
  }, [])
 

  const novaIsporuka = (noviObjekt) =>{
    isporukeAkcije.stvori(noviObjekt).then(res => {
      postaviIsporuke(isporuke.concat(res.data))
    })
  }

  const loginForma = () => {
    return (
      <LoginForma
        username={username}
        pass={pass}
        postaviUsername={({ target }) => postaviUsername(target.value)}
        postaviPass={({ target }) => postaviPass(target.value)}
        userLogin={userLogin}
      />
    )
  }

  const isporukaForma = () => {
    return (
      <IsporukaForma 
        spremiIsporuku={novaIsporuka}
      />
    )
  }

  const odjavaKorisnika = () => {
    window.localStorage.clear()
    postaviKorisnika(null)
  }


  return (
    <div>
      <h1>Isporuke</h1>
      {korisnik === null
        ? loginForma()
        : (
          <div>
            <p>Uloga: {korisnik.uloga}</p>
            <p>Prijavljeni ste kao: {korisnik.ime} {korisnik.prezime}</p>
            <button onClick={() => odjavaKorisnika()}>Odjavi se</button>
            {isporukaForma()}
          </div>
          )
      }

      <div>
        <button onClick={() => postaviIspis(!ispisSve)}>
          Prikaži { ispisSve ? "isporučene" : "sve"}
        </button>
      </div>
      <div>
        <table>
            <tr>
              <th>PROIZVOD</th>
              <th>KOLICINA</th>
              <th>SEKTOR</th>
            </tr>
          <tbody>
            {isporukeZaIspis.map(i =>
              <Isporuka key={i.id} isporuka={i}
                promjenaStatusa={() => promjenaStatusaIsporuke(i.id)}
                brisiIsporuku={() => brisiIsporuku(i.id)}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App
