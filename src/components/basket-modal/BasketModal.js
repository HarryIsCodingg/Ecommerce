import React, {useEffect, useState} from 'react';
import './BasketModal.css';
import Modal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import {selectShowBasketModal} from "../../core/redux-store/slices/basketModalSlice";
import {setCustomBasket, setEmptyBasket} from "../../core/redux-store/slices/userSlice";
import {Link} from "react-router-dom";

const BasketModal = () => {
    const [isModalOpen,setIsModalOpen] = useState(false);
    const showBasketModal = useSelector(selectShowBasketModal);
    const dispatch = useDispatch();

    useEffect(()=> {
        setIsModalOpen(showBasketModal);
    }, [showBasketModal]);

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const overlayStyles = {
        backgroundColor: 'gainsboro',
        zIndex: 9999,
    };

    const selectCustomBasket = () => {
        dispatch(setCustomBasket());
        setIsModalOpen(false);
    }

    const selectEmptyBasket = () => {
        dispatch(setEmptyBasket());
        setIsModalOpen(false);
    }

    return (
        <div>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className='modal' ariaHideApp={false} style={{
                overlay: overlayStyles}}>
                <h3 style={{textAlign: 'center'}}>Please select custom basket or empty basket</h3>
                <div className='basket-row'>
                    <Link to='user/products' className='link'>
                        <div onClick={selectCustomBasket} className='custom basket'>
                            <div className='custom-basket-image'></div>
                            <div className='basket-description'>Custom Basket</div>
                        </div>
                    </Link>
                    <Link to='user/products' className='link'>
                        <div onClick={selectEmptyBasket} className='empty basket'>
                            <div className='empty-basket-image'></div>
                            <div className='basket-description'>Empty Basket</div>
                        </div>
                    </Link>
                </div>
            </Modal>
        </div>
    )
}


export default BasketModal;
