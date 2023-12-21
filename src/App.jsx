import Card from './components/Card';


import './App.css'
import { useEffect, useState } from 'react';



function App() {

  const [card, setCard] = useState([]);

  useEffect(() => {
    fetch('Messier.json',
      {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
      }
    )
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      setCard(data);
    })
  }, [setCard])

  if(!card) {
    return <></>;
  };

  return (
    <section>
      <h1>ASTRO</h1>
        <h2>Catalogue de Messier</h2>
        <div id="album_Messier">
          {
              card.map( objet => (
                <Card key={objet.number} objet={objet}></Card>
              ))
          }
        </div>
    </section>
  )
}

export default App
