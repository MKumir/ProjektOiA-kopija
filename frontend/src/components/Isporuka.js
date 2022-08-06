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
            <button onClick={promjenaStatusa}>{oznaka}</button>
            <button onClick={brisiIsporuku}>Brisi</button>
        </tr>
    )
}

export default Isporuka