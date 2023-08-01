
class AdminService {

    static async verifyLogin(credentials) {

        const response = await fetch('http://localhost:8080/admin/login', {
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
