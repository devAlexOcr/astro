

import './card.css';


function Card ({objet}) {

    const styleImage = { backgroundImage: `url('${objet.ImageTemoin}')` }
    
    return (
        <div id='card'>
            <h3>Messier N°{objet.IdMessier}</h3>
            <p>{objet.Type}</p>
            <div id='imageCard' style={styleImage} ></div>
            <p>{objet.Name}</p>
            <p>{objet.Constellation}</p>
            <p>{objet.Periode}</p>
            
        </div>
    )
}

export default Card;