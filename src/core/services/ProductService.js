
class ProductService {

    static async getAllProducts() {

        const result = await fetch('http://localhost:8080/products/list');

        return await result.json();
    }

    static async deleteProduct(productName){

        const result = await fetch(`http://localhost:8080/products/delete?productName=${productName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

       return result.ok;
    }
}

export default ProductService;
