import { Link } from 'react-router-dom';

import './Home.css';

function Home () {




    return (
        <>
        <h1 id='Titre'>StellarPics</h1>
         <div>
            <Link to='/messier'><h2>Messier</h2></Link>
         </div>
         <div>
            <Link to='/login'><h2>Login</h2></Link>
         </div>
        </>
    )
}


export default Home;