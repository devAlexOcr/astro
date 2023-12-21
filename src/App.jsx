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
    <>
      <h1>ASTRO</h1>
      {
          card.map( objet => (
            <Card objet={objet}></Card>
          ))
      }

    </>
  )
}

export default App
