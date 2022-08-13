import React, {useState, useEffect} from "react";
import isporukeAkcije from '../services/isporuke'
import proizvodiAkcije from '../services/proizvodi'

const IsporukaUnosForma = (props) => {
    const [isporuke, postaviIsporuke] = useState([])
    const [proizvodi, postaviProizvode] = useState([])
    const [unosProizvoda, postaviUnosProizvoda] = useState("Unesi proizvod...")
    const [unosKolicine, postaviUnosKolicine] = useState(0)
    const [unosSektora, postaviUnosSektora] = useState("A")
    const [unosStatusa, postaviUnosStatusa] = useState(false)

    const filtriranaLista = proizvodi.filter((el) => {
        //ako nema inputa returnaj original
        if (unosProizvoda === '') {
            return el;
        }
        //returnaj proizvod ciji naziv sadrzi input
        else {
            return el.naziv.toLowerCase().includes(unosProizvoda)
        }
        
    })

    const promjenaUnosaProizvoda = (e) => {
        postaviUnosProizvoda(e.target.value)
    }
    const promjenaUnosaKolicine = (e) => {
        postaviUnosKolicine(Number(e.target.value))
    }
    const promjenaUnosaSektora = (e) => {
        postaviUnosSektora(e.target.value)
    }
    const promjenaUnosaStatusa = (e) => {
        postaviUnosStatusa(e.target.value)
    }

    const novaIsporuka = (e) =>{
        e.preventDefault()
        const noviObjekt = {
        proizvod: unosProizvoda,
        kolicina: unosKolicine,
        sektor: unosSektora,
        status: unosStatusa
        }
        isporukeAkcije.stvori(noviObjekt).then(res => {
        postaviIsporuke(isporuke.concat(res.data))
        })
        window.location.reload(0)
        postaviUnosProizvoda('Unesi proizvod...')
        postaviUnosKolicine(0)
        postaviUnosSektora('A')
        postaviUnosStatusa(false)
    }

    useEffect( () => {
        proizvodiAkcije.dohvatiSve().then(res => {
            console.log(res.data)
            postaviProizvode(res.data)})
    }, [])


    return (
    <div className='isporukaFormaDiv'>
        <h2>Unesi Isporuku:</h2>
        <form onSubmit={novaIsporuka}>
            <div>Proizvod: <input type="search" value={unosProizvoda} onChange={promjenaUnosaProizvoda}/></div>
            <ul>
            {filtriranaLista.map((pr) => (
                <button key={pr.naziv} className="prButton" value={pr.naziv} onClick={promjenaUnosaProizvoda}>{pr.naziv}</button>
            ))}
            </ul>
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
    )
}

export default IsporukaUnosForma;
