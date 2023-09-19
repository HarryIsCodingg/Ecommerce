
class AdminService {

    static async verifyLogin(credentials) {

        const response = await fetch('https://ecommerce-rest.onrender.com/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
        });

        return await response.json();
    }
}

export default AdminService;
