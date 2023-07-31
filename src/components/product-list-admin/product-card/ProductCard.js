import '../../../assets/images/apple.png';

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, setProductList} from "../../../core/redux-store/slices/userSlice";
import {Icon} from "@iconify/react";
import ProductService from "../../../core/services/ProductService";
import {
    selectAllProducts,
    setAvailableProducts,
    setProductDeleted
} from "../../../core/redux-store/slices/productSlice";

const ProductCard = (props) => {

    const [imageUrl, setImageUrl] = useState('');
    const [productQuantity, setProductQuantity] = useState(0);
    const dispatch = useDispatch();
    const [isProductDeleted, setIsProductDeleted] = useState(false);
    const getAllProducts = useSelector(selectAllProducts);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageModule = await import(`../../../assets/images/${props.name}.png`);
                setImageUrl(imageModule.default);
            } catch (error) {
                console.error(`Error loading image: ${error}`);
            }
        };

        fetchImage();
    }, []);

    const imageStyle = {
        backgroundImage: `url(${imageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '100px',
        width: '200px',
    };

    const deleteProduct = async () => {
        const isResponseOk = await ProductService.deleteProduct(props.name);
        if(isResponseOk){
            setIsProductDeleted(true);
            const products = await ProductService.getAllProducts();
            dispatch(setAvailableProducts(products));
            dispatch(setProductDeleted(props.name));
        }
    }

    const updateProduct = () => {

    }


    return (
        <div className='product-card-wrapper'>
            <div style={imageStyle} className='product-image'></div>
            <span>{props.name}</span>
            <span>{props.pricePerPound}</span>
            <Icon icon='typcn:delete-outline' fontSize={24} className='delete-icon pointer' onClick={deleteProduct}/>
            <Icon icon='uil:edit' fontSize={24} className='delete-icon pointer' onClick={updateProduct}/>
        </div>
    )
}

export default ProductCard;
