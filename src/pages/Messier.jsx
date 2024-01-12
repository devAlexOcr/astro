import { useEffect, useState} from 'react';

import Card from '../components/Messier/Card';

import './Messier.css'
import { Link } from 'react-router-dom';




function App({}) {

  const [card, setCard] = useState([]);
  const [option, setOption] = useState("All")
  
  function filtre() {
    const select = document.querySelector('select')
    setOption(select.value)
  };

  useEffect(() => {
    fetch('https://astro.alexandrepaucdetoc.fr/get',
      {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({option})
      }
    )
    .then(res => {
      if(!res.ok) {
        throw new Error(`Erreur HTTP : ${res.status}`);
      }
        return res.json();
    })
    .then(data => {
          setCard(data);
    })
    .catch(error => {
      console.error('Erreur lors de la requête GET : ', error)
    });
    
  }, [setCard, option])


  if(!card) {
    return <></>;
  };

  return (

    <section id='Messier'>
     
        <h2>Catalogue de Messier</h2>
          <select onChange={()=>filtre()} name="TypeMessier" id="type_select">
            <option value="All">--Sélectionner un type--</option>
            <option value="Galaxie">Galaxies</option>
            <option value="Nébuleuse">Nébuleuses</option>
            <option value="Nébuleuse Planétaire">Nébuleuses planétaires</option>
            <option value="Amas Globulaire">Amas globulaires</option>
            <option value="Amas Ouvert">Amas Ouverts</option>
          </select>

            <div id="album_Messier">
              { 
                  card.map( objet => (
                    <Link to={/messier/ + objet.IdMessier} key={objet.name}>
                    <Card key={objet.IdMessier} objet={objet}></Card>
                    </Link>
                  ))
              }
            </div>
        
    </section>
  )
}

export default App;