
class UserService {

    static async verifyLogin(credentials) {

        const result = await fetch('https://ecommerce-rest.onrender.com/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
        });

        return await result.json();
    }

    static async getSuggestionsList(productListNames) {

        const result = await fetch('https://ecommerce-rest.onrender.com/user/suggestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productListNames),
        });

        return await result.json();
    }

    static async updateCoupons(coupons, name) {

        const result = await fetch(`https://ecommerce-rest.onrender.com/user/coupons/update?coupons=${coupons}&username=${name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return await result.json();
    }
}

export default UserService;
