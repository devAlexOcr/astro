

import './card.css';


function Card ({objet}) {



    return (
        <div id='card'>
            <h3>Messier N°{objet.number}</h3>
            <p>{objet.type}</p>
            <img src='assets/images/scope.png' alt=''></img>
            <p>{objet.name}</p>
            <p>{objet.constellation}</p>
            <p>{objet.periode}</p>
            
        </div>
    )
}

export default Card;