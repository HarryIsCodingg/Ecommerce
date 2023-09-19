
class ProductService {

    static async getAllProducts() {

        const result = await fetch('https://ecommerce-rest.onrender.com/products/list');

        return await result.json();
    }

    static async deleteProduct(productName){

        const result = await fetch(`https://ecommerce-rest.onrender.com/products/delete?productName=${productName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

       return result.ok;
    }

    static async addProduct(product){
        const result = await fetch('https://ecommerce-rest.onrender.com/products/save', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product),
        });

        return await result.json();
    }

    static async updateProduct(productToUpdate, newProduct){
        const result = await fetch(`https://ecommerce-rest.onrender.com/products/update?productToUpdate=${productToUpdate}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct),
        });

        return await result.json();
    }
}

export default ProductService;
