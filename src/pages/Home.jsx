import { Link } from 'react-router-dom';

import './Home.css';

function Home () {




    return (
        <>
         <h1>ASTRO</h1>
         <div>
            <Link to='/messier'><h2>Messier</h2></Link>
         </div>
         <did>
            <Link to='/login'><h2>Login</h2></Link>
         </did>
        </>
    )
}


export default Home;