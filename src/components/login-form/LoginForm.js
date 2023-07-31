import './LoginForm.css';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectFlow} from "../../core/redux-store/slices/flowSlice";
import AdminService from "../../core/services/AdminService";
import UserService from "../../core/services/UserService";
import {setUser, setUserLogin} from "../../core/redux-store/slices/userSlice";
import {closeBasketModal, openBasketModal} from "../../core/redux-store/slices/basketModalSlice";
import {setAdmin} from "../../core/redux-store/slices/adminSlice";
import {useNavigate} from "react-router-dom";

const LoginForm =() => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameMissing, setIsUsernameMissing] = useState(false);
    const [isPasswordMissing, setIsPasswordMissing] = useState(false);
    const [showError, setShowError] = useState(false);
    const flow = useSelector(selectFlow);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setUsername(event.target.value);
        setIsUsernameMissing(false);
        setShowError(false);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setIsPasswordMissing(false);
        setShowError(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowError(false);
        dispatch(closeBasketModal());
        if(username === '' || password === ''){
            if(username === ''){setIsUsernameMissing(true);}
            if(password === ''){setIsPasswordMissing(true);}
        }
        else if(flow === 'admin'){
            const admin = await AdminService.verifyLogin({username: username, password: password});
            if(!!admin.credentials){
                SaveAdmin(admin);
                navigate('/admin/products');
            }else{
                setShowError(true);
            }
        }else if(flow === 'user'){
            const user= await UserService.verifyLogin({username: username, password: password});
            if(!!user.credentials){
                SaveUser(user);
            }else{
                setShowError(true);
            }
        }
    }

    const SaveUser = (user) => {
        dispatch(setUser(user));
        dispatch(openBasketModal());
        dispatch(setUserLogin());
    }

    const SaveAdmin = (admin) => {
        dispatch(setAdmin(admin));
    }

    return (
        <div className='login-form'>
            <form onSubmit={handleSubmit}>
                {showError && <div className='login-error'>Username or password incorrect</div>}
                <div className='form-row'>
                    <label htmlFor="name" style={{display:'block'}}>Username</label>
                    <input className='form-input' type="text" id="name" name="name" onChange={handleNameChange}/>
                    {isUsernameMissing && <div className='error'>Username required</div>}
                </div>
                <div className='form-row'>
                    <label htmlFor="password" style={{display: 'block'}}>Password</label>
                    <input className='form-input' type="password" id="password" name="password" onChange={handlePasswordChange}/>
                    {isPasswordMissing && <div className='error'>Password required</div>}
                </div>
                <button className='submit-button' type="submit">Submit</button>
            </form>
        </div>
    )

}
export default LoginForm;
