import UserLoginButton from "../../components/login-buttons/user-login-button/UserLoginButton";
import AdminLoginButton from "../../components/login-buttons/admin-login-button/AdminLoginButton";
import { useSelector } from "react-redux";
import { selectFlow } from "../../core/redux-store/slices/flowSlice";
import './HomePage.css';
import LoginButtons from "../../components/login-buttons/LoginButtons";

const HomePage = () => {

    const flow = useSelector(selectFlow);

    return(
        <div className='home-page-wrapper'>
            <div className='form-wrapper'>
                <LoginButtons />
                <div className='form-card'>

                </div>
            </div>

        </div>
    )
}

export default HomePage;
