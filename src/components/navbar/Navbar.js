import {NavLink} from 'react-router-dom';
import './NavBar.css';
import {Icon} from '@iconify/react';
import {useDispatch, useSelector} from "react-redux";
import {
    selectIsCustomBasketSelected,
    selectIsUserLoggedIn, setUser,
    setUserLogout
} from "../../core/redux-store/slices/userSlice";
import {openCartModal} from "../../core/redux-store/slices/basketModalSlice";
import logoImage from '../../assets/images/logo.png';
import {selectIsAdminLoggedIn, setAdmin} from "../../core/redux-store/slices/adminSlice";

const NavBar = () => {

    const basketSelected = useSelector(selectIsCustomBasketSelected);
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
    const isAdminLoggedIn = useSelector(selectIsAdminLoggedIn);

    const openModal = () => {
        dispatch(openCartModal());
    }

    const logout = () => {
        dispatch(setUser(undefined));
        dispatch(setUserLogout());
    }

    const logoutAdmin = () => {
        dispatch(setAdmin({}));
    }

    const imageStyle = {
        backgroundSize: 'fit',
        height: '50px',
        width: '100px',
    }

    return (
        <div>
            <div className='nav-bar'>
                <NavLink to='/' className='link font-white'>
                    <img src={logoImage} style={imageStyle} alt='no-image'/>
                </NavLink>
                <div className='navbar-link-wrapper'>
                    {isUserLoggedIn &&
                        <NavLink to='/' className='link font-white logout-button' onClick={logout}>
                            <Icon icon='tabler:logout' height={20}/> Logout
                        </NavLink>}
                    {isAdminLoggedIn && <NavLink to='/' className='link font-white logout-button' onClick={logoutAdmin}>
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
