import './ConfirmationPage.css';
import {useSelector} from "react-redux";
import {selectSubTotalPrice} from "../../core/redux-store/slices/userSlice";


const ConfirmationPage = () => {

    const selectPrice = useSelector(selectSubTotalPrice);

    return (
        <div className='confirmation-page-wrapper'>
            <div className='confirmation-content'>
                <h4>Your order is confirmed</h4>
                <h4>Order number is TK-{Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}</h4>
            </div>
            {selectPrice>=100 && <div className='coupon-added'>
                <div className='image-wrapper'></div>
                <h4>Congratulation, you have <br/>received a 5$ coupon</h4>
            </div>}
        </div>
    )
}

export default ConfirmationPage;
