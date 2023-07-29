import './CheckoutSummary.css';
import {useSelector} from "react-redux";
import {selectCoupons, selectCurrentUser} from "../../../core/redux-store/slices/userSlice";
import {useEffect, useState} from "react";

const CheckoutSummary = () => {

    const {productList, coupons} = useSelector(selectCurrentUser);
    const [subtotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const [isCouponApplied, setIsCouponApplied] = useState(false);

    useEffect(() => {
        const sbtotal = productList.reduce((total, item) => {
            return total + +item.quantity * +item.pricePerPound;
        }, 0);

        setSubTotal(sbtotal);
        setTax(+(.15 * sbtotal).toFixed(2));
        setTotal(sbtotal + +(.15 * sbtotal).toFixed(2));
    }, [])

    useEffect(() => {
        const total = subtotal + +(.15 * subtotal).toFixed(2) - 5;
        if(total >= 0){
            setTotal(total);
        }else{
            setTotal(0);
        }
    }, [isCouponApplied])

    return (
        <div className='checkout-summary'>
            <h3 style={{textAlign: 'center', marginBottom: '28px'}}>Summary</h3>
            <div className='summary-items-wrapper'>
                {productList.map((item) => (
                    <div className='summary-row'>
                        <span>{item.name}</span>
                        <span>$ {+item.quantity * +item.pricePerPound}</span>
                    </div>
                ))}
                <div className='price-row'>
                    <h4>Subtotal</h4>
                    <span>$ {subtotal}</span>
                </div>
                <div className='price-row' style={{borderBottom: '1px solid black', paddingBottom: '16px'}}>
                    <h4>Tax</h4>
                    <span>$ {tax}</span>
                </div>
                <div className='price-row'>
                    <h4>Total</h4>
                    <span>$ {total}</span>
                </div>
            </div>

            {coupons !== 0 && <div className='discount'>
                <input type="checkbox" checked={isCouponApplied}/>
                <span>Apply 5 $ coupon</span>
            </div>}
        </div>
    )
}

export default CheckoutSummary;
