import {useDispatch, useSelector} from "react-redux";
import {selectFlow, setUserFlow} from "../../../core/redux-store/slices/flowSlice";
import './UserLoginButton.css';

const UserLoginButton = () => {

    const dispatch = useDispatch();
    const flow = useSelector(selectFlow);

    const handleClick = () => {
        dispatch(setUserFlow());
    }
    return (
        <div className={`user-login-button pointer ${flow === 'user' && 'selected-button'}`} onClick={handleClick}>User</div>
    )
}

export default UserLoginButton;
