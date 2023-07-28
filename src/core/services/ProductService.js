
class ProductService {

    static async getAllProducts() {

        const result = await fetch('http://localhost:8080/products/list');

        return await result.json();
    }
}

export default ProductService;
