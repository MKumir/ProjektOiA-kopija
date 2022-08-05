import React, { useState } from 'react'
import Isporuka from './components/Isporuka';

const App = (props) => {

  const [isporuke, postaviIsporuke] = useState(props.isporuke)
  const [unosProizvoda, postaviUnosProizvoda] = useState("Unesi proizvod...")
  const [unosKolicine, postaviUnosKolicine] = useState("Unesi kolicinu...")
  const [unosSektora, postaviUnosSektora] = useState("Unesi sektor...")
  const [unosStatusa, postaviUnosStatusa] = useState(true)
  const [ispisSve, postaviIspis] = useState(true)

  const isporukeZaIspis = ispisSve
    ? isporuke
    : isporuke.filter(i => i.status === true)

  // const promjenaStatusaIsporuke = (id) => {
  //   const isporuka = isporuke.find(i => i.id === id)
  //   const modIsporuka = {
  //     ...isporuka,
  //     status: !isporuka.status
  //   }
    
  // }

  const novaIsporuka = (e) =>{
    e.preventDefault()
    const noviObjekt = {
      id: isporuke.length + 1,
      proizvod: unosProizvoda,
      kolicina: unosKolicine,
      datum: new Date().toISOString(),
      sektor: unosSektora,
      status: unosStatusa
    }
    postaviIsporuke(isporuke.concat(noviObjekt))
    postaviUnosProizvoda('')
    postaviUnosKolicine('')
    postaviUnosSektora('')
  }

  const promjenaUnosaProizvoda = (e) => {
    console.log(e.target.value)
    postaviUnosProizvoda(e.target.value)
  }
  const promjenaUnosaKolicine = (e) => {
    console.log(e.target.value)
    postaviUnosKolicine(e.target.value)
  }
  const promjenaUnosaSektora = (e) => {
    console.log(e.target.value)
    postaviUnosSektora(e.target.value)
  }
  const promjenaUnosaStatusa = (e) => {
    console.log(e.target.value)
    if (e.target.value === 'isporuceno') {
      postaviUnosStatusa(true)
    } else {
      postaviUnosStatusa(false)
    }
  }

  return (
    <div>
      <h1>Isporuke</h1>
      <div>
        <button onClick={ () => postaviIspis(!ispisSve)}>
          Prikaži { ispisSve ? "isporučene" : "sve"}
        </button>
      </div>
      <ul>
        {isporukeZaIspis.map(i =>
          <Isporuka key={i.id} isporuka={i} 
          
          />
        )}
      </ul>
      <h2>Unesi Isporuku: </h2>
      <form onSubmit={novaIsporuka}>
          <div>Proizvod: <input value={unosProizvoda} onChange={promjenaUnosaProizvoda}/></div>
          <div>Kolicina: <input value={unosKolicine} onChange={promjenaUnosaKolicine}/></div>
          <div>Sektor: <input value={unosSektora} onChange={promjenaUnosaSektora}/></div>
          <div>Status: 
            <select onChange={promjenaUnosaStatusa}>
              <option value="isporuceno">Isporuceno</option>
              <option value="neisporuceno">Neisporuceno</option>
            </select>
          </div>
          <button type="submit">Spremi</button>
      </form>
    </div>
  );
}

export default App
