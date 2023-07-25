import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {

    return (
        <div>
            <div className='nav-bar'>
                <NavLink to='/' className='link font-white'>Logo</NavLink>
                <div className='navbar-link-wrapper'>
                    <NavLink to='/' className='link font-white'>Home</NavLink>
                </div>
            </div>
        </div>
    )
}

export default NavBar;
