import React, {useState, useEffect} from "react";
import isporukeAkcije from '../services/isporuke'
import proizvodiAkcije from '../services/proizvodi'

const IsporukaUnosForma = (props) => {
    const [isporuke, postaviIsporuke] = useState([])
    const [proizvodi, postaviProizvode] = useState([])
    const [unosProizvoda, postaviUnosProizvoda] = useState("")
    const [visible, setVisible] = useState(false)
    const [unosKolicine, postaviUnosKolicine] = useState(0)
    const [unosSektora, postaviUnosSektora] = useState("A")
    const [unosStatusa, postaviUnosStatusa] = useState(false)

    const filtriranaLista = proizvodi.filter((el) => {
        //ako nema inputa returnaj null
        if (unosProizvoda === '') {
            return 'null';
        }
        //returnaj proizvod ciji naziv sadrzi input
        
        return el.naziv.toLowerCase().includes(unosProizvoda)
        
    })
    
    const promjenaUnosaProizvoda = (e) => {
        postaviUnosProizvoda(e.target.value)
        console.log(e.target.value)
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
    const promjenaVidljivostiPr = () => {
        setVisible(true)
    }

    const novaIsporuka = (e) =>{
        e.preventDefault()
        const noviObjekt = {
        proizvod: unosProizvoda,
        kolicina: unosKolicine,
        sektor: unosSektora,
        status: unosStatusa
        }
        if(!(unosProizvoda === '' || unosKolicine <= 1)){
            window.location.reload(null)
        }
        isporukeAkcije.stvori(noviObjekt).then(res => {
        postaviIsporuke(isporuke.concat(res.data))
        })
        postaviUnosProizvoda('')
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
            <div>Proizvod: 
                <input 
                    type="search" 
                    placeholder="Unesi proizvod..." 
                    value={unosProizvoda}  
                    onChange={promjenaUnosaProizvoda}
                    onClick={promjenaVidljivostiPr}
                    />
            </div>
            <ul>
            {filtriranaLista.map((pr) => (
                <button style={{display: visible ? 'inline-block': 'none'}} key={pr.naziv} className="prButton" value={pr.naziv} onClick={promjenaUnosaProizvoda}>{pr.naziv}</button>
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
