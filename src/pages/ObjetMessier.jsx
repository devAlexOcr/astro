import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './objetMessier.css';

function ObjetMessier() {

    const [objet, setObjet] =useState();
        const ImageTemoin = {backgroundImage: `url('${objet ? objet.ImageTemoin : ''}')`} 
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://astro.alexandrepaucdetoc.fr/get',
          {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"option": "All"})
          }
        )
        .then(res => {
          if(!res.ok) {
            throw new Error(`Erreur HTTP : ${res.status}`);
          }
            return res.json();
        })
        .then(data => {
      
            const foundObjet = data.find(objetFind => objetFind.IdMessier === parseInt(params.id, 10) )
            foundObjet ? setObjet(foundObjet) : "";
             
        })
        .catch(error => {
          console.error('Erreur lors de la requête GET : ', error)
        });
        
    }, [params.id, navigate])

        
    if(!objet ) {
        return null;
    }

    return (

        <section id='ObjetMessier'>
        <h2>{objet.Name}</h2>
        <div id='boxImage'>
            <div id='ImageTemoin' style={ImageTemoin}></div>
            <div id='ImageUser'><input type='file'></input></div>
        </div>
        </section>
    )
}


export default ObjetMessier;