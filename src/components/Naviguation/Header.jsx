import { Link } from 'react-router-dom';

import './Header.css'


function Header() {



    return (

        <section id='header'>
            <div id='nav_bar'>
                <Link to='/'>Home</Link>
                <div id='navigation'>
                    <Link to='/messier'>Messier</Link>
                    <Link to='/login'>LogIn</Link>
                </div>
            </div>
        </section>
    )
}


export default Header;