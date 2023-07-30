import './CheckoutForm.css';
import {useSelector} from "react-redux";
import {selectStep} from "../../../core/redux-store/slices/checkoutStepSlice";
import StepOne from "../Step-one/StepOne";
import StepTwo from "../Step-two/StepTwo";

const CheckoutForm =() => {

    const activeStep = useSelector(selectStep);

    return (
        <div className='checkout-form'>
            {activeStep === 1 && <StepOne />}
            {activeStep === 2 && <StepTwo />}
        </div>
    )

}
export default CheckoutForm;
