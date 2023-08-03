import { createSlice } from "@reduxjs/toolkit";

const userState = {
    fullName: undefined,
    emailAddress: undefined,
    credentials: {
        username: undefined,
        password: undefined,
    },
    hasCustomBasket: false,
    productList: [],
    isCustomBasketSelected: undefined,
    isLoggedIn: undefined,
    address : {
        street: undefined,
        city: undefined,
        postalCode: undefined,
    },
    paymentDetails : {
        cardNumber: undefined,
        cvv: undefined,
        expiryDate: undefined,
    },
    coupons: undefined,
    subTotalPrice: false,
    isCouponUsed: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        setUser: (state, action) => {
            state.credentials = {...action.payload.credentials}
            state.hasCustomBasket = action.payload.hasCustomBasket;
            state.productList = action.payload.productList;
            state.coupons = action.payload.coupons;
        },
        setCustomBasket: (state) => {
            state.isCustomBasketSelected = true;
        },
        removeBasket : (state) => {
            state.isCustomBasketSelected = undefined;
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
        },
        setName : (state, action) => {
            state.fullName = action.payload;
        },
        setEmail : (state, action) => {
            state.emailAddress = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        setPaymentDetails: (state, action) => {
            state.paymentDetails = action.payload;
        },
        setCoupons : (state, action) => {
            state.coupons = action.payload;
        },
        setSubtotalPrice : (state, action) => {
            state.subTotalPrice = action.payload;
        },
        setCouponUsed: state => {
            state.isCouponUsed = !state.isCouponUsed;
        }
    }
});

export default userSlice.reducer;
export const { setUser, setCustomBasket, setEmptyBasket,
    setProductList, setUserLogin, setUserLogout,
    setAddress, setEmail, setName,
    removeBasket, setCoupons, setPaymentDetails, setSubtotalPrice, setCouponUsed} = userSlice.actions;
export const selectCurrentUser = (state) => state.currentUser;
export const selectIsCustomBasketSelected = (state) => state.currentUser.isCustomBasketSelected;
export const selectIsUserLoggedIn = (state) => state.currentUser.isLoggedIn;

export const selectSubTotalPrice = (state) => state.currentUser.subTotalPrice;
export const selectIsCouponUsed = state => state.currentUser.isCouponUsed;
