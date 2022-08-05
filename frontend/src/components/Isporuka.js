import React from "react";
import './Isporuka.css'

const Isporuka = ({isporuka, promjenaStatusa, brisiIsporuku}) => {
    const oznaka = isporuka.status
    ? 'označi kao neisporučeno' : 'označi kao isporučeno'

    return (
        <li>
            <span className={isporuka.status ? 'isporuceno' : 'neisporuceno'}>{isporuka.proizvod}: {isporuka.kolicina}, {isporuka.sektor} </span>
            <button onClick={promjenaStatusa}>{oznaka}</button>
            <button onClick={brisiIsporuku}>Brisi</button>
        </li>
    )
}

export default Isporuka