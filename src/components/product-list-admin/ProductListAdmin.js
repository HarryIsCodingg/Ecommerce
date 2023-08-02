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
import UpdateModal from "./product-update-modal/UpdateModal";
import CategoryModal from "./category-modal/CategoryModal";
import {setOpenCategoryModal} from "../../core/redux-store/slices/categorySlice";

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
        ), 3000)

    },[deletedProduct])

    const addProduct = () => {
        dispatch(setOpenAddProductModal());
    }

    const addCategory = () => {
        dispatch(setOpenCategoryModal());
    }

    return (
        <div className='product-list-wrapper'>
            <AddProductModal />
            <UpdateModal />
            <CategoryModal />
            <button onClick={addProduct} className='add-button pointer add'>Add product</button>
            <button onClick={addCategory} className='add-category pointer'>Add category</button>
            {!!deletedProduct && showDeletedMessage && <div className='deleted-success'>
                <Icon icon='mdi:success-circle' fontSize={24}/>
                {deletedProduct} deleted successfully
            </div>}
            <div className='products-header width'>
                <h4>Image</h4>
                <h4>Name</h4>
                <h4>Price/pound</h4>
                <h4>Quantity</h4>
            </div>
            {selectProducts.map((product) => (
                <ProductCard {...product} key={product.name}/>
            ))}
        </div>
    )
}

export default ProductListAdmin;
