import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import './AddProductModal.css';
import {selectOpenAddProductModal, setCloseAddProductModal} from "../../../core/redux-store/slices/productSlice";
import {Icon} from "@iconify/react";

const BasketModal = () => {
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState();
    const [pricePerPound, setPricePerPound] = useState('');
    const [category, setCategory] = useState('');
    const [isProductNameMissing, setIsProductNameMissing] = useState(false);
    const [isQuantityMissing, setIsQuantityMissing] = useState(false);
    const [isPricePerPoundMissing, setIsPricePerPoundMissing] = useState(false);
    const [isCategoryMissing, setIsCategoryMissing] = useState(false);
    const showAddModal = useSelector(selectOpenAddProductModal);
    const dispatch = useDispatch();

    useEffect(()=> {
        setIsModalOpen(showAddModal);
    }, [showAddModal]);

    const closeModal = () => {
        setIsModalOpen(false);
        dispatch(setCloseAddProductModal());
    }

    const overlayStyles = {
        background: 'transparent',
        zIndex: 9999,
    };

    const handleSubmit = () => {

    }

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
        setIsProductNameMissing(false);
    }

    const handleQuantity = (event) => {
        setQuantity(event.target.value);
        setIsQuantityMissing(false);
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setIsCategoryMissing(false);
    }

    const handlePrice = (event) => {
        setPricePerPound(event.target.value);
        setIsPricePerPoundMissing(false);
    }


    return (
        <div>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className='modal add-modal' ariaHideApp={false} style={{
                overlay: overlayStyles}}>
                <div style={{textAlign: 'right', padding: '4px', marginBottom: '4px'}}>
                    <Icon icon='carbon:close-filled' onClick={closeModal} fontSize={24} className='close-modal pointer'/>
                </div>
                <h3 style={{textAlign: 'center'}}>Please fill the required information</h3>
                <div className='login-form'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-row'>
                            <label htmlFor="name" style={{display:'block'}}>Product name</label>
                            <input className='form-input' type="text" id="name" name="name" onChange={handleProductNameChange}/>
                            {isProductNameMissing && <div className='error'>Product name required</div>}
                        </div>
                        <div className='form-row'>
                            <label htmlFor="price" style={{display: 'block'}}>Price per pound</label>
                            <input className='form-input' type="text" id="password" name="price" onChange={handlePrice}/>
                            {isPricePerPoundMissing && <div className='error'>Price required</div>}
                        </div>
                        <div className='form-row'>
                            <label htmlFor="quantity" style={{display: 'block'}}>Quantity</label>
                            <input className='form-input' type="text" id="password" name="quantity" onChange={handlePrice}/>
                            {isQuantityMissing && <div className='error'>Quantity required</div>}
                        </div>
                        <div className='form-row'>
                            <label htmlFor="category" style={{display: 'block'}}>Category</label>
                            <select>

                            </select>
                            {isCategoryMissing && <div className='error'>Category required</div>}
                        </div>
                        <button className='submit-button' type="submit">Add</button>
                    </form>
                </div>

            </Modal>
        </div>
    )
}


export default BasketModal;
