

import './card.css';


function Card ({objet}) {



    return (
        <div id='card'>
            <h3>Messier N°{objet.IdMessier}</h3>
            <p>{objet.Type}</p>
            <img src='assets/images/scope.png' alt=''></img>
            <p>{objet.Name}</p>
            <p>{objet.Constellation}</p>
            <p>{objet.Periode}</p>
            
        </div>
    )
}

export default Card;