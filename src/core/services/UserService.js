
class UserService {

    static async verifyLogin(credentials) {

        const result = await fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
        });

        return await result.json();
    }
}

export default UserService;
