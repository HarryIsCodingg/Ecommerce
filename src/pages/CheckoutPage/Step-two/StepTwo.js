import {useState} from "react";
import {useDispatch} from "react-redux";
import {setNextStep} from "../../../core/redux-store/slices/checkoutStepSlice";
import {Icon} from "@iconify/react";

const StepTwo = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [isEmailMissing, setIsEmailMissing] = useState(false);
    const [isCardNumberMissing, setIsCardNumberMissing] = useState(false);
    const [isCardExpiryMissing, setIsCardExpiryMissing] = useState(false);
    const [isCardCVVMissing, setIsCardCVVMissing] = useState(false);
    const dispatch = useDispatch();

    const handleEmail = (event) => {
        setEmailAddress(event.target.value);
        setIsEmailMissing(false);
    }

    const handleCardNumber = (event) => {
        setCardNumber(event.target.value);
        setIsCardNumberMissing(false);
    }

    const handleCardExpiry = (event) => {
        setCardExpiry(event.target.value);
        setIsCardExpiryMissing(false);
    }

    const handleCardCVV = (event) => {
        setCardCVV(event.target.value);
        setIsCardCVVMissing(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailLength = emailAddress.length;
        const cardNumberLength = cardNumber.length;
        const cardCVVLength = cardCVV.length;
        const cardExpiryLength = cardExpiry.length;

        if(emailLength === 0 || cardNumberLength === 0 || cardCVVLength === 0 || cardExpiryLength === 0){
            if(emailLength === 0){setIsEmailMissing(true);}
            if(cardNumberLength === 0){setIsCardNumberMissing(true);}
            if(cardCVVLength === 0){setIsCardCVVMissing(true);}
            if(cardExpiryLength === 0){setIsCardExpiryMissing(true);}
        }else{
            dispatch(setNextStep());
        }
    }

    return (
        <div>
            <div className='step-description'>
                <Icon icon='tabler:circle-number-1' fontSize={20} color='black'/>
                <h4>Personal Information</h4>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form-row'>
                    <label htmlFor="email" style={{display:'block'}} className='required-field'>Email Address</label>
                    <input className='form-input' type="email" id="email" name="email" onChange={handleEmail}/>
                    {isEmailMissing && <div className='error'>Email required</div>}
                </div>
                <div className='form-row'>
                    <label htmlFor="cardNumber" style={{display: 'block'}} className='required-field'>Card Number</label>
                    <input className='form-input' type="text" id="street" name="street" onChange={handleCardNumber} placeholder='XXXX XXXX XXXX XXXX'/>
                    {isCardNumberMissing && <div className='error'>Card Number required</div>}
                </div>
                <div className='form-row'>
                    <label htmlFor="cvv" style={{display: 'block'}} className='required-field'>CVV</label>
                    <input className='form-input' type="text" id="cvv" name="cvv" onChange={handleCardCVV} placeholder='XXX'/>
                    {isCardCVVMissing && <div className='error'>CVV required</div>}
                </div>
                <div className='form-row'>
                    <label htmlFor="expiry" style={{display: 'block'}} className='required-field'>Expiry Date</label>
                    <input className='form-input' type="text" id="expiry" name="expiry" onChange={handleCardExpiry}/>
                    {isCardExpiryMissing && <div className='error'>Expiry date required</div>}
                </div>
                <button className='submit-button' type="submit">Checkout</button>
            </form>
        </div>
    )
}

export default StepTwo;
