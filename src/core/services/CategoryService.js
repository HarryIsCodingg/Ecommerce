
class CategoryService {

    static async getAllCategories() {

        const result = await fetch('https://ecommerce-rest.onrender.com/category/list');

        return await result.json();
    }

    static async addCategory(category){

        const result = await fetch('https://ecommerce-rest.onrender.com/category/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });

        return await result.json();
    }

    static async deleteCategory(category){

        const result = await fetch(`https://ecommerce-rest.onrender.com/category/delete?name=${category}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await result.json();
    }
}

export default CategoryService;
