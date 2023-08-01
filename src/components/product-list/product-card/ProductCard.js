import '../../../assets/images/apple.png';
import './ProductCard.css';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, setProductList} from "../../../core/redux-store/slices/userSlice";

const ProductCard = (props) => {

    const [imageUrl, setImageUrl] = useState('');
    const [productQuantity, setProductQuantity] = useState(0);
    const {productList} = useSelector(selectCurrentUser);
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
        checkIfProductInCart();
    }, [props.name, productList]);

    const imageStyle = {
        backgroundImage: `url(${imageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '100px',
        width: '200px',
    };

    const deleteItem = () => {
        if(productQuantity > 0) {
            setProductQuantity(prevState => prevState - 1);

            if(!!productList) {
                const filteredList = productList.filter(product => product.name !== props.name);
                dispatch(setProductList({productList: [...filteredList,{...props, quantity: productQuantity-1}]}));
            }else {
                dispatch(setProductList({productList: [...productList, {...props, quantity: productQuantity-1}]}));
            }
        }
    }

    const addItem = () => {
        setProductQuantity(prevState => prevState + 1);

        if(!!productList) {
            const filteredList = productList.filter(product => product.name !== props.name);
            dispatch(setProductList({productList: [...filteredList,{...props, quantity: productQuantity+1}]}));
        }else {
            dispatch(setProductList({productList: [...productList, {...props, quantity: productQuantity+1}]}));
        }
    }

    const checkIfProductInCart = () => {
        if(!!productList) {
            const product = productList.find((product) => product.name.toLowerCase() === props.name.toLowerCase());
            if (!!product) {
                setProductQuantity(+product.quantity);
            }else{
                setProductQuantity(0);
            }
        }
    }

    return (
        <div className='product-card-wrapper'>
            <div style={imageStyle} className='product-image'></div>
            <span>{props.name}</span>
            <span>{props.pricePerPound}</span>
            <div className='product-quantity-change-buttons'>
                <span onClick={deleteItem} className='quantity-button pointer'>-</span>
                {productQuantity}
                <span onClick={addItem} className='quantity-button pointer'>+</span>
            </div>
        </div>
    )
}

export default ProductCard;
