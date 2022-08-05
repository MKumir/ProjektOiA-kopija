import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const isporuke = [
    {
      id: 1,
      proizvod: 'Banane',
      kolicina: 5,
      datum: new Date(),
      sektor: 'A',
      status: true
    },
    {
      id: 2,
      proizvod: 'Kruske',
      kolicina: 10,
      datum: new Date(),
      sektor: 'B',
      status: true
    },
    {
        id: 3,
        proizvod: 'Jabuke',
        kolicina: 17,
        datum: new Date(),
        sektor: 'C',
        status: false
    }
]

ReactDOM.render(<App isporuke={isporuke}/>,document.getElementById('root'))
