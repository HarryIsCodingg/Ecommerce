import Modal from "react-modal";
import {Icon} from "@iconify/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCategoryModalOpen,
    selectIsProductDeleted,
    setCategories,
    setCloseCategoryModal,
} from "../../../core/redux-store/slices/categorySlice";
import CategoryService from "../../../core/services/CategoryService";
import './CategoryModal.css';
import CategoryList from "./category-list/CategoryList";

const CategoryModal = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const selectModalOpen = useSelector(selectCategoryModalOpen);
    const dispatch = useDispatch();
    const [isCategoryMissing, setIsCategoryMissing] = useState(false);
    const [category, setCategory] = useState('');
    const isProductDeleted = useSelector(selectIsProductDeleted);
    const [isProductAdded, setIsProductAdded] = useState(false);

    useEffect(() => {
        setIsModalOpen(selectModalOpen);
    },[selectModalOpen])

    const overlayStyles = {
        background: 'transparent',
        zIndex: 9999,
    };

    const closeModal = () => {
        dispatch(setCloseCategoryModal());
    }

    const handleNameChange = (event) => {
        setCategory(event.target.value);
        setIsCategoryMissing(false);
    }
    const handleAddCategory = async () => {
        if(category.length === 0 ){
            setIsCategoryMissing(true);
        }else{
           const isCategoryAdded =  await CategoryService.addCategory(category);
           if(isCategoryAdded){
               setIsProductAdded(true);
               notificationWait();
               const categories = await CategoryService.getAllCategories();
               dispatch(setCategories(categories));
               setCategory('');
           }
        }
    }

    const notificationWait = () => {
        setTimeout(() => (
            setIsProductAdded(false)
        ),2000);
    }

    return (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} className='modal add-modal' ariaHideApp={false} style={{
            overlay: overlayStyles}}>
            <div style={{textAlign: 'right', padding: '4px', marginBottom: '4px'}}>
                <Icon icon='carbon:close-filled' onClick={closeModal} fontSize={24} className='close-modal pointer'/>
            </div>
            {isProductDeleted  && <div className='success' style={{marginBottom: '24px', marginTop: '24px'}}>
                <Icon icon='ep:success-filled' fontSize={24}/>Product deleted successfully</div>}
            {isProductAdded  && <div className='success' style={{marginBottom: '24px', marginTop: '24px'}}>
                <Icon icon='ep:success-filled' fontSize={24}/>Product added successfully</div>}
            <div className='add-category-wrapper'>
                <label htmlFor="name" style={{display:'block', marginBottom: '8px'}}>Category name</label>
                <div className='button-wrapper'>
                    <input className='form_input' type="text" id="name" name="name" onChange={handleNameChange} value={category}/>
                    <div className='add-category-button pointer' onClick={handleAddCategory}>Add Category</div>
                </div>
                {isCategoryMissing && <div className='error'>Category required</div>}
            </div>
            <CategoryList />
        </Modal>
    )
}

export default CategoryModal;
