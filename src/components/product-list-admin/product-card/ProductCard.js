import '../../../assets/images/apple.png';

import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Icon} from "@iconify/react";
import ProductService from "../../../core/services/ProductService";
import {
    setAvailableProducts,
    setOpenProductUpdateModal,
    setProductDeleted, setProductToUpdate
} from "../../../core/redux-store/slices/productSlice";

const ProductCard = (props) => {

    const [imageUrl, setImageUrl] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageModule = await import(`../../../assets/images/${props.name}.png`);
                setImageUrl(imageModule.default);
            } catch (error) {
                const imageModule = await import(`../../../assets/images/no-image.png`);
                setImageUrl(imageModule.default);
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
            const products = await ProductService.getAllProducts();
            dispatch(setAvailableProducts(products));
            dispatch(setProductDeleted(props.name));
        }
    }

    const updateProduct = () => {
        dispatch(setProductToUpdate({...props}));
        dispatch(setOpenProductUpdateModal());
    }


    return (
        <div className='product-card-wrapper'>
            <div style={imageStyle} className='product-image'></div>
            <span>{props.name}</span>
            <span>{props.pricePerPound}</span>
            <span>{props.quantity}</span>
            <Icon icon='typcn:delete-outline' fontSize={24} className='delete-icon pointer' onClick={deleteProduct}/>
            <Icon icon='uil:edit' fontSize={24} className='delete-icon pointer' onClick={updateProduct}/>
        </div>
    )
}

export default ProductCard;
