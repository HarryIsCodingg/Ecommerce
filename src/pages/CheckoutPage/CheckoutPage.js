import './CheckoutPage.css';
import CheckoutSummary from "./CheckoutSummart/CheckoutSummary";
import CheckoutForm from "./CheckoutForm/CheckoutForm";


const CheckoutPage = () => {
    return (
        <div className='checkout-page-wrapper'>
            <CheckoutForm />
            <CheckoutSummary />
        </div>
    )
}

export default CheckoutPage;
