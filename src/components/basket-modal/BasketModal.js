import React, {useEffect, useState} from 'react';
import './BasketModal.css';
import Modal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import {selectShowBasketModal} from "../../core/redux-store/slices/basketModalSlice";

const BasketModal = () => {
    const [isModalOpen,setIsModalOpen] = useState(false);
    const showBasketModal = useSelector(selectShowBasketModal);
    const dispatch = useDispatch();

    useEffect(()=> {
        setIsModalOpen(showBasketModal);
    }, [showBasketModal])
    const closeModal = () => {
        setIsModalOpen(false);
    }

    const overlayStyles = {
        backgroundColor: 'gainsboro',
        zIndex: 9999,
    };

    const selectCustomBasket = () => {

    }

    const selectEmptyBasket = () => {

    }

    return (
        <div>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className='modal' ariaHideApp={false} style={{
                overlay: overlayStyles}}>
                <h3 style={{textAlign: 'center'}}>Please select custom basket or empty basket</h3>
                <div className='basket-row'>
                    <div onClick={selectCustomBasket} className='custom basket'>
                        <div className='custom-basket-image'/>
                            <div className='basket-description'>Custom Basket</div>
                        </div>
                    <div onClick={selectEmptyBasket} className='empty basket'>
                        <div className='empty-basket-image'/>
                            <div className='basket-description'>Empty Basket</div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}


export default BasketModal;
