import React, {useState} from "react";

const IsporukaForma = (props) => {
    const [unosProizvoda, postaviUnosProizvoda] = useState("Unesi proizvod...")
    const [unosKolicine, postaviUnosKolicine] = useState(0)
    const [unosSektora, postaviUnosSektora] = useState("A")
    const [unosStatusa, postaviUnosStatusa] = useState(false)

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
        props.spremiIsporuku({
        proizvod: unosProizvoda,
        kolicina: unosKolicine,
        sektor: unosSektora,
        status: unosStatusa
    })
        // isporukeAkcije.stvori(noviObjekt)
        // .then(res => {
        //   postaviIsporuke(isporuke.concat(res.data))
        // }) --> u glavnoj komponenti app
        postaviUnosProizvoda('Unesi proizvod...')
        postaviUnosKolicine(0)
        postaviUnosSektora('A')
        postaviUnosStatusa(false)
    }

    return (
    <div className='isporukaFormaDiv'>
        <h2>Unesi Isporuku:</h2>
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
    )
}

export default IsporukaForma;
