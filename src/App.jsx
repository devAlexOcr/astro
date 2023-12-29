import Card from './components/Card';

import './App.css'
import { useEffect, useState } from 'react';



function App() {

  const [card, setCard] = useState([]);
  
  useEffect(() => {
    fetch('https://astro.alexandrepaucdetoc.fr/get',
      {
        method: 'GET',
        headers : {
            'Content-Type': 'application/json',
        }
      }
    )
    .then(res => {
      if(!res.ok) {
        throw new Error('Erreur HTTP : ${res.status}');
      }
        return res.json();
    })
    .then(data => {
          setCard(data);
    })
    .catch(error => {
      console.error('Erreur lors de la requête GET : ', error)
    });
    
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
                <Card key={objet.IdMessier} objet={objet}></Card>
              ))
          }
        </div>
        
    </section>
  )
}

export default App;
