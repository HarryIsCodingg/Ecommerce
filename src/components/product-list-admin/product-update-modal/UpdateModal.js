import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import {
    selectProductUpdateModal,
    selectUpdatedProduct,
    setAvailableProducts,
    setCloseProductUpdateModal
} from "../../../core/redux-store/slices/productSlice";
import {Icon} from "@iconify/react";
import CategoryService from "../../../core/services/CategoryService";
import ProductService from "../../../core/services/ProductService";

const UpdateModal = () => {
    const [isModalOpen,setIsModalOpen] = useState(false);
    const productToUpdate = useSelector(selectUpdatedProduct);
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [pricePerPound, setPricePerPound] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [updateProductName, setUpdatedProductName] = useState('');
    const [updateProductQuantity, setUpdatedProductQuantity] = useState('');
    const [updatedProductPricePerPound, setUpdatedProductPricePerPound] = useState('');
    const [updateProductCategory, setUpdatedProductCategory] = useState('');
    const [updateImageUrl, setUpdatedImageUrl] = useState('');
    const showUpdateModal = useSelector(selectProductUpdateModal);
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    useEffect(()=> {
        setIsModalOpen(showUpdateModal);
    }, [showUpdateModal]);

    useEffect(() => {
        const getAllCategories = async () => {
            const allCategories = await CategoryService.getAllCategories();
            setCategories(allCategories);
        }

        getAllCategories();
    }, [])

    useEffect(() => {

        if(!!productToUpdate) {
            setProductName(productToUpdate.name);
            setQuantity(productToUpdate.quantity);
            setPricePerPound(productToUpdate.pricePerPound);
            setCategory(productToUpdate.category);
            setImageUrl(productToUpdate.imageUrl);
        }
    }, [productToUpdate])

    const closeModal = () => {
        setIsModalOpen(false);
        dispatch(setCloseProductUpdateModal());
    }

    const overlayStyles = {
        background: 'transparent',
        zIndex: 9999,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            name : updateProductName.length === 0 ? productName : updateProductName,
            quantity: updateProductQuantity.length === 0 ? quantity : updateProductQuantity,
            category: updateProductCategory.length === 0 ? category : updateProductCategory,
            pricePerPound: updatedProductPricePerPound.length === 0 ? pricePerPound : updatedProductPricePerPound,
            imageUrl: updateImageUrl.length === 0 ? imageUrl : updateImageUrl
        }

        const isProductUpdated = await ProductService.updateProduct(productToUpdate.name, updatedProduct);
        if(isProductUpdated){
            const allProducts = await ProductService.getAllProducts();
            dispatch(setAvailableProducts(allProducts));
            dispatch(setCloseProductUpdateModal());
            setIsSuccessModalOpen(true)
            setTimeout(() => (setIsSuccessModalOpen(false)), 2000);
        }
    }


    const closeModal2 = () => {
        setIsSuccessModalOpen(false);
    }

    const handleName = (event) => {
        setProductName('');
        setUpdatedProductName(event.target.value);
    }

    const handleQuantity = (event) => {
        setQuantity('');
        setUpdatedProductQuantity(event.target.value);
    }

    const handlePrice = (event) => {
        setPricePerPound('');
        setUpdatedProductPricePerPound(event.target.value);
    }

    const handleCategoryChange = (event) => {
        setUpdatedProductCategory(event.target.value);
    }

    const handleImageUrl = (event) => {
        setImageUrl('');
        setUpdatedImageUrl(event.target.value);
    }

    return (
        <div>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className='modal add-modal' ariaHideApp={false} style={{
                overlay: overlayStyles}}>
                <div style={{textAlign: 'right', padding: '4px', marginBottom: '4px'}}>
                    <Icon icon='carbon:close-filled' onClick={closeModal} fontSize={24} className='close-modal pointer'/>
                </div>

                <div className='login-form'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-row'>
                            <label htmlFor="name" style={{display:'block'}}>Product name</label>
                            <input className='form-input' type="text" id="name" name="name" onChange={handleName} value={updateProductName || productName}/>
                        </div>
                        <div className='form-row'>
                            <label htmlFor="price" style={{display: 'block'}}>Price per pound</label>
                            <input className='form-input' type="text" id="price" name="price" onChange={handlePrice} value={updatedProductPricePerPound || pricePerPound}/>
                        </div>
                        <div className='form-row'>
                            <label htmlFor="quantity" style={{display: 'block'}}>Quantity</label>
                            <input className='form-input' type="text" id="quantity" name="quantity" onChange={handleQuantity} value={updateProductQuantity || quantity}/>
                        </div>
                        <div className='form-row'>
                            <label htmlFor="imageUrl" style={{display: 'block'}}>ImageUrl</label>
                            <input className='form-input' type="text" id="imageUrl" name="imageUrl" onChange={handleImageUrl} value={updateImageUrl || imageUrl}/>
                        </div>
                        <div className='form-row'>
                            <label htmlFor="category" style={{display: 'block'}}>Category</label>
                            <select onChange={handleCategoryChange} value={updateProductCategory || category}>
                                {categories.map((category) => (
                                    <option key={category.name}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <button className='submit-button' type="submit">Update</button>
                    </form>
                </div>
            </Modal>
            <Modal isOpen={isSuccessModalOpen} onRequestClose={closeModal2} className='modal add-modal' ariaHideApp={false} style={{
                overlay: overlayStyles}}>
                <div className='add-success'>
                    <Icon icon='ep:success-filled' fontSize={24} />
                    Product updated successfully
                </div>
            </Modal>
        </div>
    )
}


export default UpdateModal;
