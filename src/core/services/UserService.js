
class UserService {

    static async verifyLogin(credentials) {

        const response = await fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
        }).then((res) => {
            return res.json();
        })
        const data = await response;
        console.log(data);
    }
}

export default UserService;
