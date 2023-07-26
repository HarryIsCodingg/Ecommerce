import './LoginForm.css';
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectFlow} from "../../core/redux-store/slices/flowSlice";
import AdminService from "../../core/services/AdminService";
import UserService from "../../core/services/UserService";

const LoginForm =() => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameMissing, setIsUsernameMissing] = useState(false);
    const [isPasswordMissing, setIsPasswordMissing] = useState(false);
    const [showError, setShowError] = useState(false);
    const flow = useSelector(selectFlow);

    const handleNameChange = (event) => {
        setUsername(event.target.value);
        setIsUsernameMissing(false);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setIsPasswordMissing(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(username === '' || password === ''){
            if(username === ''){setIsUsernameMissing(true)}
            if(password === ''){setIsPasswordMissing(true)}
        }
        else if(flow === 'admin'){
            AdminService.verifyLogin({username: username, password: password})
        }else if(flow === 'user'){
            UserService.verifyLogin({username: username, password: password})
        }
    }

    return (
        <div className='login-form'>
            <form onSubmit={handleSubmit}>
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
