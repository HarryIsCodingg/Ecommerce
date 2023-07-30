import './ConfirmationPage.css';

const ConfirmationPage = () => {
    return (
        <div className='confirmation-page-wrapper'>
            <div className='confirmation-content'>
                <h4>Your order is confirmed</h4>
                <h4>Order number is TK-{Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}</h4>
            </div>
        </div>
    )
}

export default ConfirmationPage;
