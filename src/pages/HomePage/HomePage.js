import './HomePage.css';
import LoginButtons from "../../components/login-buttons/LoginButtons";
import LoginForm from "../../components/login-form/LoginForm";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../core/redux-store/slices/userSlice";
import BasketModal from "../../components/basket-modal/BasketModal";
import {useState} from "react";
import DebugMode from "../../components/debug-mode/DebugMode";

const HomePage = () => {

    const currentUser = useSelector(selectCurrentUser);
    const [debugMode, setDebugMode] = useState(false);

    const handleDebug = () => {
        setDebugMode(prevState => !prevState);
    }

    return(
        <div className='home-page-wrapper'>
            {!!currentUser.credentials && <BasketModal />}
            <div className='form-wrapper'>
                <LoginButtons />
                <div className='login-form'>
                    <LoginForm />
                </div>
            </div>
            <div onClick={handleDebug} className='debug-mode'>
                <div style={{background: 'orange', padding: '8px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px'}}>Debug</div>
                {debugMode &&
                    <>
                        <DebugMode />
                    </>
                }
            </div>

        </div>
    )
}

export default HomePage;
