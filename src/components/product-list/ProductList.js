import {useEffect, useState} from "react";
import ProductService from "../../core/services/ProductService";
import ProductCard from "./product-card/ProductCard";
import './ProductList.css';

const ProductList = () => {

    const [allProducts, setAllProducts] = useState([]);

    useEffect(  () => {
        const fetchProducts = async () => {

            const products = await ProductService.getAllProducts();
            setAllProducts(products);
        }
        fetchProducts();
    },[]);

    return (
        <div className='product-list-wrapper'>
            <div className='product-header'>
                <h4>Image</h4>
                <h4>Name</h4>
                <h4>Price/pound</h4>
                <h4>Weight in pounds</h4>
            </div>
            {allProducts.map((product) => (
                <ProductCard {...product} key={product.name}/>
            ))}
        </div>
    )
}

export default ProductList;
