import './CheckoutPage.css';
import CheckoutSummary from "./CheckoutSummart/CheckoutSummary";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import {Icon} from "@iconify/react";
import {useDispatch, useSelector} from "react-redux";
import {selectStep, setPrevStep} from "../../core/redux-store/slices/checkoutStepSlice";


const CheckoutPage = () => {

    const activeStep = useSelector(selectStep);
    const dispatch = useDispatch();

    const handlePrevious = () => {
        dispatch(setPrevStep());
    }

    return (
        <div className='checkout-page-wrapper'>
            {activeStep === 2 && <button className='back-button pointer' onClick={handlePrevious}>
                <Icon icon='ion:chevron-back' fontSize={20}/> Back</button>
            }
            <CheckoutForm />
            <CheckoutSummary />
        </div>
    )
}

export default CheckoutPage;
