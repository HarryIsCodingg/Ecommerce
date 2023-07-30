import Modal from "react-modal";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, setProductList} from "../../../core/redux-store/slices/userSlice";
import {Icon} from "@iconify/react";
import './SuggestionCarousel.css';
import UserService from "../../../core/services/UserService";

const SuggestionCarousel = () => {

    const [isModalOpen, setIsModalOpen] = useState(true);
    const {productList} = useSelector(selectCurrentUser);
    const [imageUrl, setImageUrl] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [suggestionList, setSuggestionList] = useState([]);
    const [suggestionName, setSuggestionName] = useState('');
    const [suggestionPrice, setSuggestionPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState(0);
    const [suggestionCategory, setSuggestionCategory] = useState('');
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [isProductAdded, setIsProductAdded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

        if(isDataFetched && suggestionList.length > 0)
        {
            const fetchImage = async () => {
                try {
                    const imageModule = await import(`../../../assets/images/${suggestionName}.png`);
                    setImageUrl(imageModule.default);
                } catch (error) {
                    console.error(`Error loading image: ../../../assets/images/${suggestionName.toLowerCase()}.png`);
                }
            };
            fetchImage();
            setIsProductAdded(false);
        }
    }, [currentIndex, suggestionName]);

    useEffect(() => {
        if (!isDataFetched) {
            const fetchSuggestionsList = async () => {
                const productNames = productList.map(product => product.name);
                const suggestionList = await UserService.getSuggestionsList(productNames);
                setSuggestionList(suggestionList);
            };

            fetchSuggestionsList();
            setIsDataFetched(true);
        }
    }, [isDataFetched, productList]);

    useEffect(() => {
        if(isDataFetched && suggestionList.length > 0) {
            setSuggestionName(suggestionList[currentIndex].name);
            setSuggestionPrice(suggestionList[currentIndex].pricePerPound);
            setSuggestionCategory(suggestionList[currentIndex].category);
            setProductQuantity(0);
        }
    }, [currentIndex, suggestionList])

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const overlayStyles = {
        backgroundColor: 'gainsboro',
        zIndex: 9999,
    };

    const handleBack = () => {
        if(currentIndex === 0){
            setCurrentIndex(suggestionList.length - 1);
        }else{
            setCurrentIndex(prevState => prevState - 1);
        }
    }

    const handleForward = () => {
        if(currentIndex === suggestionList.length -1){
            setCurrentIndex(0);
        }else{
            setCurrentIndex(prevState => prevState + 1);
        }
    }


    const deleteItem = () => {
        if(productQuantity > 0) {
            setProductQuantity(prevState => prevState - 1);
        }
    }

    const addItem = () => {
        setProductQuantity(prevState => prevState + 1);
    }

    const addToCart = () => {
        dispatch(setProductList({productList: [...productList,
                {name: suggestionName,quantity: productQuantity,category: suggestionCategory, pricePerPound: suggestionPrice}]}));

        setIsProductAdded(true);
    }

    return (
        <>
            {isDataFetched && suggestionList.length > 0  && <div>
                <Modal isOpen={isModalOpen} onRequestClose={closeModal} className='modal' ariaHideApp={false} style={{
                    overlay: overlayStyles}}>
                    <h4 style={{textAlign: 'center'}}>You might also want to add</h4>
                    <div className='suggestion-row'>
                        <Icon icon='ion:chevron-back' onClick={handleBack} className='icon' fontSize={24}/>
                        <img src={imageUrl} style={{display: 'block', height: '200px', width: '100%'}} alt='no image found'/>
                        <Icon icon='ion:chevron-forward' onClick={handleForward} className='icon' fontSize={24}/>
                    </div>
                    {!isProductAdded && <div className='suggestion-content-wrapper'>
                        <div className='suggestion-content'>
                            <h4>{suggestionName}</h4>
                            <h4>$ {suggestionPrice}</h4>
                        </div>
                        <div className='quantity-buttons-wrapper'>
                            <span onClick={deleteItem} className='quantity-button pointer'>-</span>
                            {productQuantity}
                            <span onClick={addItem} className='quantity-button pointer'>+</span>
                        </div>
                        <button disabled={productQuantity === 0} onClick={addToCart} className='add-button pointer'>Add
                            to cart
                        </button>
                    </div>}
                    {isProductAdded && <div className='success'>
                        <Icon icon='material-symbols:done' fontSize={24}/>
                        {productQuantity} pounds of {suggestionName} added successfully
                    </div>}
                </Modal>
            </div>}
        </>

    )
}

export default SuggestionCarousel;
