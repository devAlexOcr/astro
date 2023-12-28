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

  function add() {
    console.log(card.slice(0, 49))
    card.slice(98).forEach((element) => {
      fetch('https://astro.alexandrepaucdetoc.fr/add',
        {
          method: 'POST',
          headers: 
          {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(element)
        }
      )
      .then(res => { 
        if(!res.ok) {
          throw new Error('Erreur HTTP : ${res.status');
        }
          return res.json();
        })
      .then(data => { console.log(data); } )
    })
    .catch(error => {console.error('Erreur lors de la requête POST :', error);
    });
  };

  return (

    <section>
      <h1>ASTRO</h1>
        <h2>Catalogue de Messier</h2>
        <div id="album_Messier">
          {
              card.map( objet => (
                <Card key={objet.id} objet={objet}></Card>
              ))
          }
        </div>
        <button onClick={add}>ADD</button>
    </section>
  )
}

export default App;
