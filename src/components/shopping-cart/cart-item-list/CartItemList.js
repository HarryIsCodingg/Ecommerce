import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, setProductList} from "../../../core/redux-store/slices/userSlice";
import './CartItemList.css';
import {Icon} from "@iconify/react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {closeCartModal} from "../../../core/redux-store/slices/basketModalSlice";

const CartItemList = () => {

    const {productList} = useSelector(selectCurrentUser);
    const [selectedItems, setSelectedItems] = useState(productList);
    const dispatch = useDispatch();

    useEffect(()=> {
        setSelectedItems(productList);
    }, [productList]);

    const deleteItem = (item) => {
        setSelectedItems((prevItems) => prevItems.filter(selectedItem => selectedItem.name !== item));
        dispatch(setProductList({ productList: selectedItems.filter((selectedItem) => selectedItem.name !== item) }));
    }

    const CartItem = (props) => {
        return (
            <div className='cart-item'>
                <span>{props.name}</span>
                <span>{props.quantity}</span>
                <span>{props.price}</span>
                <Icon icon='typcn:delete-outline' className='delete-icon pointer' height={24} onClick={() => deleteItem(props.name)}/>
            </div>
        )
    }

    return (
        <div className='cart-item-list'>
            {selectedItems.length !==0 &&
                <>
                    <div className='cart-item-description'>
                        <h4>Name</h4>
                        <h4>Quantity</h4>
                        <h4>Price</h4>
                    </div>
                    {selectedItems.map(item => (
                        <CartItem {...item} key={item.name}/>
                    ))}
                    <Link to='user/checkout' className='link' style={{color: 'black'}}
                          onClick={() => dispatch(closeCartModal())}>
                        <div className='checkout-link pointer'>Checkout</div>
                    </Link>
                </>
            }
            {selectedItems.length === 0 &&
                <div className='empty-cart-wrapper'>
                    <div>Your cart is empty</div>
                    <Link to='user/products' className='link' style={{color: 'black'}}
                          onClick={() => dispatch(closeCartModal())}>
                        <div className='add-products-link pointer'>Add products</div>
                    </Link>
                </div>
            }
        </div>
    )


}

export default CartItemList;
