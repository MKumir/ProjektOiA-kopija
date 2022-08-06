import React, { useState, useEffect } from 'react'
import Isporuka from './components/Isporuka';
import isporukeAkcije from './services/isporuke'

const App = (props) => {

  const [isporuke, postaviIsporuke] = useState([])
  const [unosProizvoda, postaviUnosProizvoda] = useState("Unesi proizvod...")
  const [unosKolicine, postaviUnosKolicine] = useState(0)
  const [unosSektora, postaviUnosSektora] = useState("A")
  const [unosStatusa, postaviUnosStatusa] = useState(false)
  const [ispisSve, postaviIspis] = useState(true)

  const isporukeZaIspis = ispisSve
    ? isporuke
    : isporuke.filter(i => i.status === true)


  const promjenaStatusaIsporuke = (id) => {
    const isporuka = isporuke.find(i => i.id === id)
    const modIsporuka = {
      ...isporuka,
      status: !isporuka.status
    }

    isporukeAkcije.osvjezi(id, modIsporuka)
      .then(res => {
        console.log(res.data)
        postaviIsporuke(isporuke.map(i => i.id !== id ? i : res.data))
      })
  }

  
  const brisiIsporuku = (id) => {
    isporukeAkcije.brisi(id)
      .then(res => {
        console.log(res)
        postaviIsporuke(isporuke.filter(i => i.id !== id))
      })
  }

  useEffect( () => {
    isporukeAkcije.dohvatiSve()
    .then(res => {
      console.log(res.data)
      postaviIsporuke(res.data)})
  }, [])
 

  const novaIsporuka = (e) =>{
    e.preventDefault()
    const noviObjekt = {
      proizvod: unosProizvoda,
      kolicina: unosKolicine,
      sektor: unosSektora,
      status: unosStatusa
    }
    //postaviIsporuke(isporuke.concat(noviObjekt))
    // Pošalji AXIOS POST ZAHTJEV za spremanje
    // Prikaži novu poruku na sučelju
    //axios.post('http://localhost:3001/api/isporuke', noviObjekt)
    //.then( res => {
    //  postaviIsporuke(isporuke.concat(res.data))
    //})
    isporukeAkcije.stvori(noviObjekt)
    .then(res => {
      postaviIsporuke(isporuke.concat(res.data))
      postaviUnosProizvoda('Unesi proizvod...')
      postaviUnosKolicine(0)
      postaviUnosSektora('A')
      postaviUnosStatusa(false)
    })
  }

  

  const promjenaUnosaProizvoda = (e) => {
    //console.log(e.target.value)
    postaviUnosProizvoda(e.target.value)
  }
  const promjenaUnosaKolicine = (e) => {
    //console.log(e.target.value)
    postaviUnosKolicine(Number(e.target.value))
  }
  const promjenaUnosaSektora = (e) => {
    //console.log(e.target.value)
    postaviUnosSektora(e.target.value)
  }
  const promjenaUnosaStatusa = (e) => {
    //console.log(e.target.value)
    if (e.target.value) {
      postaviUnosStatusa(true)
    } else {
      postaviUnosStatusa(false)
    }
  }

  return (
    <div>
      <h1>Isporuke</h1>
      <div>
        <button onClick={() => postaviIspis(!ispisSve)}>
          Prikaži { ispisSve ? "isporučene" : "sve"}
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>PROIZVOD</th>
              <th>KOLICINA</th>
              <th>SEKTOR</th>
            </tr>
          </thead>
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
      <h2>Unesi Isporuku: </h2>
      <form onSubmit={novaIsporuka}>
          <div>Proizvod: <input value={unosProizvoda} onChange={promjenaUnosaProizvoda}/></div>
          <div>Kolicina: <input type="number" value={unosKolicine} onChange={promjenaUnosaKolicine}/></div>
          <div>Sektor: 
            <select value={unosSektora} onChange={promjenaUnosaSektora}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>
          </div>
          <div>Status: 
            <select value={unosStatusa} onChange={promjenaUnosaStatusa}>
              <option value={false}>Neisporuceno</option>
              <option value={true}>Isporuceno</option>
            </select>
          </div>
          <button type="submit">Spremi</button>
      </form>
    </div>
  );
}

export default App
