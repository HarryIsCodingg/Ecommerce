
class CategoryService {

    static async getAllCategories() {

        const result = await fetch('http://localhost:8080/category/list');

        return await result.json();
    }

    static async addCategory(category){

        const result = await fetch('http://localhost:8080/category/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });

        return await result.json();
    }

    static async deleteCategory(category){

        const result = await fetch(`http://localhost:8080/category/delete?name=${category}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await result.json();
    }
}

export default CategoryService;
