import React from "react";
import NaslovniDio from "../components/NaslovniDio";
import IsporukaUnosForma from "../components/IsporukaUnosForma";
import PrikazIsporuka from "../components/PrikazIsporuka";

const PocetnaPoslovoda = ({korisnik, odjava}) => {
    return (
        <div>
            <NaslovniDio korisnik={korisnik} odjava={odjava}/>
            <IsporukaUnosForma />
            <PrikazIsporuka />
          </div>
    )
}

export default PocetnaPoslovoda;