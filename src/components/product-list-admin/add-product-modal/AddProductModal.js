import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import './AddProductModal.css';
import {selectOpenAddProductModal, setAvailableProducts, setCloseAddProductModal} from "../../../core/redux-store/slices/productSlice";
import {Icon} from "@iconify/react";
import CategoryService from "../../../core/services/CategoryService";
import ProductService from "../../../core/services/ProductService";
import {selectCategories} from "../../../core/redux-store/slices/categorySlice";

const AddProductModal = () => {
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [pricePerPound, setPricePerPound] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isImageUrlMissing, setIsImageUrlMissing] = useState(false);
    const [isProductNameMissing, setIsProductNameMissing] = useState(false);
    const [isQuantityMissing, setIsQuantityMissing] = useState(false);
    const [isPricePerPoundMissing, setIsPricePerPoundMissing] = useState(false);
    const [isCategoryMissing, setIsCategoryMissing] = useState(false);
    const showAddModal = useSelector(selectOpenAddProductModal);
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const allCategories = useSelector(selectCategories);

    useEffect(()=> {
        setIsModalOpen(showAddModal);
    }, [showAddModal]);

    useEffect(() => {
        const getAllCategories = async () => {
            const allCategories = await CategoryService.getAllCategories();
            setCategories(allCategories);
        }

        getAllCategories();
    }, [allCategories])

    const closeModal = () => {
        setIsModalOpen(false);
        dispatch(setCloseAddProductModal());
    }

    const overlayStyles = {
        background: 'transparent',
        zIndex: 9999,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nameLength = productName.length;
        const priceLength = pricePerPound.length;
        const quantityLength = quantity.length;
        const categoryLength = category.length;
        const imageUrlLength = imageUrl.length;

        if(nameLength === 0 || priceLength === 0 || quantityLength === 0 || categoryLength === 0 || imageUrlLength === 0){
            if(nameLength === 0){setIsProductNameMissing(true);}
            if(quantityLength === 0){setIsQuantityMissing(true);}
            if(priceLength === 0){setIsPricePerPoundMissing(true);}
            if(categoryLength === 0){setIsCategoryMissing(true);}
            if(categoryLength === 0){setIsCategoryMissing(true);}
            if(imageUrlLength === 0){setIsImageUrlMissing(true);}
        }else{
            const product ={
                name: productName,
                quantity: quantity,
                category: category,
                imageUrl: imageUrl,
                pricePerPound: pricePerPound,
            }
            const isProductSaved = await ProductService.addProduct(product);
            if(isProductSaved){
                const allProducts = await ProductService.getAllProducts();
                dispatch(setAvailableProducts(allProducts));
                dispatch(setCloseAddProductModal());
                setIsSuccessModalOpen(true)
                setTimeout(() => (setIsSuccessModalOpen(false)), 2000);
                setCategory('');
            }
        }
    }

    const closeModal2 = () => {
        setIsSuccessModalOpen(false);
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

    const handleImageUrl = (event) => {
        setImageUrl(event.target.value);
        setIsImageUrlMissing(false);
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
                            <input className='form-input' type="text" id="price" name="price" onChange={handlePrice}/>
                            {isPricePerPoundMissing && <div className='error'>Price required</div>}
                        </div>
                        <div className='form-row'>
                            <label htmlFor="quantity" style={{display: 'block'}}>Quantity</label>
                            <input className='form-input' type="text" id="quantity" name="quantity" onChange={handleQuantity}/>
                            {isQuantityMissing && <div className='error'>Quantity required</div>}
                        </div>
                        <div className='form-row'>
                            <label htmlFor="imageUrl" style={{display: 'block'}}>ImageUrl</label>
                            <input className='form-input' type="text" id="imageUrl" name="imageUrl" onChange={handleImageUrl}/>
                            {isImageUrlMissing && <div className='error'>Image url required</div>}
                        </div>
                        <div className='form-row'>
                            <label htmlFor="category" style={{display: 'block'}}>Category</label>
                            <select onChange={handleCategoryChange} value={category}>
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.name}>{category.name}</option>
                                ))}
                            </select>
                            {isCategoryMissing && <div className='error'>Category required</div>}
                        </div>
                        <button className='submit-button' type="submit">Add</button>
                    </form>
                </div>
            </Modal>
            <Modal isOpen={isSuccessModalOpen} onRequestClose={closeModal2} className='modal add-modal' ariaHideApp={false} style={{
                overlay: overlayStyles}}>
                <div className='add-success'>
                    <Icon icon='ep:success-filled' fontSize={24} />
                    Product added successfully
                </div>
            </Modal>
        </div>
    )
}


export default AddProductModal;
