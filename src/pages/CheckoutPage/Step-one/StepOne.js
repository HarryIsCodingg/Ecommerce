import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setNextStep} from "../../../core/redux-store/slices/checkoutStepSlice";
import {Icon} from "@iconify/react";
import {selectCurrentUser, setAddress, setName} from "../../../core/redux-store/slices/userSlice";

const StepOne = () => {
    const [fullName, setFullName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [isPostalCodeMissing, setIsPostalCodeMissing] = useState(false);
    const [isCityMissing, setIsCityMissing] = useState(false);
    const [isFullNameMissing, setIsFullNameMissing] = useState(false);
    const [isStreetAddressMissing, setIsStreetAddressMissing] = useState(false);
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const activeUser = useSelector(selectCurrentUser);

    useEffect(() => {
        setFullName(activeUser.fullName || '');
        setStreetAddress(activeUser.address.street || '');
        setCity(activeUser.address.city || '');
        setPostalCode(activeUser.address.postalCode || '');
    },[activeUser])

    const handleNameChange = (event) => {
        setFullName(event.target.value);
        setIsFullNameMissing(false);
        setShowError(false);
    }

    const handleStreetAddress = (event) => {
        setStreetAddress(event.target.value);
        setIsStreetAddressMissing(false);
        setShowError(false);
    }

    const handleCityChange = (event) => {
        setCity(event.target.value);
        setIsCityMissing(false);
        setShowError(false);
    }

    const handlePostalCode = (event) => {
        setPostalCode(event.target.value);
        setIsPostalCodeMissing(false);
        setShowError(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullNameLength = fullName.length;
        const streetAddressLength = streetAddress.length;
        const cityLength = city.length;
        const postalCodeLength = postalCode.length;

        if(fullNameLength === 0 || streetAddressLength === 0 || cityLength === 0 || postalCodeLength === 0){
            if(fullNameLength === 0){setIsFullNameMissing(true);}
            if(streetAddressLength === 0){setIsStreetAddressMissing(true);}
            if(cityLength === 0){setIsCityMissing(true);}
            if(postalCodeLength === 0){setIsPostalCodeMissing(true);}
        }else{
            dispatch(setNextStep());
        }
        dispatch(setName(fullName));
        dispatch(setAddress({street: streetAddress, city: city, postalCode: postalCode}));
        setShowError(false);
    }

    return (
        <>
            <div className='step-description'>
                <Icon icon='tabler:circle-number-1' fontSize={20} color='black'/>
                <h4>Personal Information</h4>
            </div>
            <form onSubmit={handleSubmit}>

                {showError && <div className='login-error'>Username or password incorrect</div>}
                <div className='form-row'>
                    <label htmlFor="name" style={{display:'block'}} className='required-field'>Full name</label>
                    <input className='form-input' type="text" id="name" name="name" onChange={handleNameChange} value={fullName}/>
                    {isFullNameMissing && <div className='error'>Full name required</div>}
                </div>
                <div className='form-row'>
                    <label htmlFor="street" style={{display: 'block'}} className='required-field'>Street Address</label>
                    <input className='form-input' type="text" id="street" name="street" onChange={handleStreetAddress} value={streetAddress}/>
                    {isStreetAddressMissing && <div className='error'>Password required</div>}
                </div>
                <div className='form-row'>
                    <label htmlFor="city" style={{display: 'block'}} className='required-field'>City</label>
                    <input className='form-input' type="text" id="street" name="city" onChange={handleCityChange} value={city}/>
                    {isCityMissing && <div className='error'>City required</div>}
                </div>
                <div className='form-row'>
                    <label htmlFor="postalcode" style={{display: 'block'}} className='required-field'>Postal Code</label>
                    <input className='form-input' type="text" id="street" name="street" onChange={handlePostalCode} value={postalCode}/>
                    {isPostalCodeMissing && <div className='error'>Postal code required</div>}
                </div>
                <button className='submit-button' type="submit">Next : Payment</button>
            </form>
        </>
    )
}

export default StepOne;
