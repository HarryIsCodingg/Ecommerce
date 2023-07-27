import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import {closeCartModal, selectShowCartModal} from "../../core/redux-store/slices/basketModalSlice";
import CartItemList from "./cart-item-list/CartItemList";

const BasketModal = () => {
    const [isModalOpen,setIsModalOpen] = useState(false);
    const showCartModal = useSelector(selectShowCartModal);
    const dispatch = useDispatch();

    useEffect(()=> {
        setIsModalOpen(showCartModal);
    }, [showCartModal]);

    const closeModal = () => {
        dispatch(closeCartModal());
        setIsModalOpen(false);
    }

    const overlayStyles = {
        backgroundColor: 'gainsboro',
        zIndex: 9999,
    };


    return (
        <div>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className='modal' ariaHideApp={false} style={{
                overlay: overlayStyles}}>
                <CartItemList />
            </Modal>
        </div>
    )
}


export default BasketModal;
