import {NavLink} from 'react-router-dom';
import './NavBar.css';
import {Icon} from '@iconify/react';
import {useDispatch, useSelector} from "react-redux";
import {
    selectIsCustomBasketSelected,
    selectIsUserLoggedIn,
    setUserLogout
} from "../../core/redux-store/slices/userSlice";
import {openCartModal} from "../../core/redux-store/slices/basketModalSlice";

const NavBar = () => {

    const basketSelected = useSelector(selectIsCustomBasketSelected);
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

    const openModal = () => {
        dispatch(openCartModal());
    }

    const logout = () => {
        dispatch(setUserLogout());
    }

    return (
        <div>
            <div className='nav-bar'>
                <NavLink to='/' className='link font-white'>Logo</NavLink>
                <div className='navbar-link-wrapper'>
                    <NavLink to='/' className='link font-white'>Home</NavLink>
                    {isUserLoggedIn &&
                        <NavLink to='/' className='link font-white logout-button' onClick={logout}>
                            <Icon icon='tabler:logout' height={20}/> Logout
                        </NavLink>}
                    {basketSelected !== undefined &&
                        <Icon icon='mdi:cart-outline' className='cart-icon' height={24} color='orange' onClick={openModal}/>}
                </div>
            </div>
        </div>
    )
}

export default NavBar;
