import { createSlice } from "@reduxjs/toolkit";

const userState = {
    credentials: {
        username: undefined,
        password: undefined,
    },
    hasCustomBasket: false,
    productList: [],
    isCustomBasketSelected: undefined,
    isLoggedIn: undefined,
}

const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        setUser: (state, action) => {
            state.credentials = {...action.payload.credentials}
            state.hasCustomBasket = action.payload.hasCustomBasket;
            state.productList = action.payload.productList;
        },
        setCustomBasket: (state) => {
            state.isCustomBasketSelected = true;
        },
        setEmptyBasket: (state) => {
            state.isCustomBasketSelected = false;
            state.productList = [];
        },
        setProductList: (state, action) => {
            state.productList = action.payload.productList;
        },
        setUserLogin: (state) => {
            state.isLoggedIn = true;
        },
        setUserLogout : (state) => {
            state.isLoggedIn = false;
        }
    }
});

export default userSlice.reducer;
export const { setUser, setCustomBasket, setEmptyBasket,
    setProductList, setUserLogin, setUserLogout } = userSlice.actions;
export const selectCurrentUser = (state) => state.currentUser;
export const selectIsCustomBasketSelected = (state) => state.currentUser.isCustomBasketSelected;
export const selectIsUserLoggedIn = (state) => state.currentUser.isLoggedIn;

