import React from "react";
import './Isporuka.css'

const Isporuka = ({isporuka, promjenaStatusa, brisiIsporuku}) => {
    const oznaka = isporuka.status
    ? 'označi kao neisporučeno' : 'označi kao isporučeno'

    return (
        <tr className={isporuka.status ? 'isporuceno' : 'neisporuceno'}>
            <td>{isporuka.proizvod}</td>
            <td>{isporuka.kolicina}</td>
            <td>{isporuka.sektor}</td>
            <td><button onClick={promjenaStatusa}>{oznaka}</button></td>
            <td><button onClick={brisiIsporuku}>Brisi</button></td>
        </tr>
    )
}

export default Isporuka