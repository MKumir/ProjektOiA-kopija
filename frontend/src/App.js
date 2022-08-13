import React, { useState, useEffect } from 'react'
import LoginForma from './components/LoginForma';
import isporukeAkcije from './services/isporuke'
import loginAkcije from './services/login'
import PocetnaPoslovoda from './views/PocetnaPoslovoda';


const App = (props) => {

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

  useEffect( () => {
    const logiraniKorisnikJSON = window.localStorage.getItem('prijavljeniKorisnik')
    if (logiraniKorisnikJSON) {
      const korisnik = JSON.parse(logiraniKorisnikJSON)
      postaviKorisnika(korisnik)
      isporukeAkcije.postaviToken(korisnik.token)
    }
  }, [])


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

  const odjavaKorisnika = () => {
    window.localStorage.clear()
    postaviKorisnika(null)
    window.location.reload(0)
  }


  return (
    <div>
      {korisnik === null
        ? ( 
            <div>
              <h1>Prijava</h1>
              {loginForma()}
            </div>
          )
        : (
            <PocetnaPoslovoda korisnik={korisnik} odjava={odjavaKorisnika}/>
          )
      }
    </div>
  );
}



export default App

