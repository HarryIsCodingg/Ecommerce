import './HomePage.css';
import LoginButtons from "../../components/login-buttons/LoginButtons";
import LoginForm from "../../components/login-form/LoginForm";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../core/redux-store/slices/userSlice";
import BasketModal from "../../components/basket-modal/BasketModal";

const HomePage = () => {

    const currentUser = useSelector(selectCurrentUser);

    return(
        <div className='home-page-wrapper'>
            {!!currentUser.credentials && <BasketModal />}
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
