import {useEffect, useState} from "react";
import ProductService from "../../core/services/ProductService";
import ProductCard from "./product-card/ProductCard";
import './ProductListAdmin.css';
import {useDispatch, useSelector} from "react-redux";
import {
    selectAllProducts,
    selectDeletedProduct,
    setAvailableProducts, setOpenAddProductModal
} from "../../core/redux-store/slices/productSlice";
import {Icon} from "@iconify/react";
import AddProductModal from "./add-product-modal/AddProductModal";

const ProductListAdmin = () => {

    const selectProducts = useSelector(selectAllProducts);
    const dispatch = useDispatch();
    const deletedProduct = useSelector(selectDeletedProduct);
    const [showDeletedMessage, setShowDeletedMessage] = useState(false);

    useEffect(  () => {
        const fetchProducts = async () => {

            const products = await ProductService.getAllProducts();
            dispatch(setAvailableProducts(products));
        }
        fetchProducts();
    },[dispatch]);

    useEffect(() => {
        setShowDeletedMessage(true);
        setTimeout(() => (
            setShowDeletedMessage(false)
        ), 2000)

    },[deletedProduct])

    const addProduct = () => {
        dispatch(setOpenAddProductModal());
    }

    return (
        <div className='product-list-wrapper'>
            <AddProductModal />
            <button onClick={addProduct} className='add-button pointer add'>Add product</button>
            {!!deletedProduct && showDeletedMessage && <div className='deleted-success'>
                <Icon icon='mdi:success-circle' fontSize={24}/>
                {deletedProduct} deleted successfully
            </div>}
            <div className='product-header'>
                <h4>Image</h4>
                <h4>Name</h4>
                <h4>Price/pound</h4>
                <h4>Delete</h4>
                <h4>Update</h4>
            </div>
            {selectProducts.map((product) => (
                <ProductCard {...product} key={product.name}/>
            ))}
        </div>
    )
}

export default ProductListAdmin;
