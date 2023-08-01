
class CategoryService {

    static async getAllCategories() {

        const result = await fetch('http://localhost:8080/category/list');

        return await result.json();
    }
}

export default CategoryService;
