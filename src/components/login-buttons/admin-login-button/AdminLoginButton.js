import {useDispatch, useSelector} from "react-redux";
import {selectFlow, setAdminFlow} from "../../../core/redux-store/slices/flowSlice";
import './AdminLoginButton.css';

const AdminLoginButton = () => {

    const dispatch = useDispatch();
    const flow = useSelector(selectFlow);

    const handleClick = () => {
        dispatch(setAdminFlow());
    }
    return (
        <div className={`admin-login-button pointer 
            ${flow === 'admin' && 'selected-button'}`} onClick={handleClick}>Admin</div>
    )
}

export default AdminLoginButton;
