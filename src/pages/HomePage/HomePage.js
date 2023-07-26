import './HomePage.css';
import LoginButtons from "../../components/login-buttons/LoginButtons";
import LoginForm from "../../components/login-form/LoginForm";

const HomePage = () => {

    return(
        <div className='home-page-wrapper'>
            <div className='form-wrapper'>
                <LoginButtons />
                <div className='login-form'>
                    <LoginForm />
                </div>
            </div>

        </div>
    )
}

export default HomePage;
