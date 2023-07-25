import UserLoginButton from "./user-login-button/UserLoginButton";
import AdminLoginButton from "./admin-login-button/AdminLoginButton";
import './LoginButtons.css';

const LoginButtons = () => {
    return (
        <div className='buttons-row'>
            <UserLoginButton />
            <AdminLoginButton />
        </div>
    )
}

export default LoginButtons;
