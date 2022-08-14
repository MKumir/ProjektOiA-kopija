import React, { useState, useEffect } from 'react'
import Isporuka from '../components/Isporuka'
import isporukeAkcije from '../services/isporuke'


const PrikazIsporuka = () => {

    const [isporuke, postaviIsporuke] = useState([])
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
        isporukeAkcije.dohvatiSve().then(res => {
            console.log(res.data)
            postaviIsporuke(res.data)})        
    }, [])

    

    return (
        <div>
            <button onClick={() => postaviIspis(!ispisSve)}>
            Prikaži { ispisSve ? "isporučene" : "sve"}
            </button>
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
                    <Isporuka  
                        key={i.id} 
                        isporuka={i}
                        promjenaStatusa={() => promjenaStatusaIsporuke(i.id)}
                        brisiIsporuku={() => brisiIsporuku(i.id)}
                    />
                )}
                </tbody>
            </table>
      </div>
    )

}

export default PrikazIsporuka;