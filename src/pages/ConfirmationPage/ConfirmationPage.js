import './ConfirmationPage.css';
import {useSelector} from "react-redux";
import {selectCurrentUser, selectSubTotalPrice} from "../../core/redux-store/slices/userSlice";
import {useEffect} from "react";
import UserService from "../../core/services/UserService";

const ConfirmationPage = () => {

    const selectPrice = useSelector(selectSubTotalPrice);
    const {coupons, isCouponUsed, credentials} = useSelector(selectCurrentUser);

    useEffect(() => {
        if((selectPrice >= 100 || isCouponUsed) && !(selectPrice>=100 && isCouponUsed)){
            if(selectPrice >= 100) {
                UserService.updateCoupons(coupons + 1, credentials.username);
            }else{
                UserService.updateCoupons(coupons, credentials.username);
            }
        }
    }, []);

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
