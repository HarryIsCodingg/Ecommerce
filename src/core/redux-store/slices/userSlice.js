import { createSlice } from "@reduxjs/toolkit";

const userState = {
    credentials: {
        username: undefined,
        password: undefined,
    },
    hasCustomBasket: false,
    productList: undefined,
}

const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        setUser: (state, action) => {
            state.credentials = {...action.payload.credentials}
            state.hasCustomBasket = action.payload.hasCustomBasket;
            state.productList = action.payload.productList;
        }
    }
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
export const selectCurrentUser = (state) => state.currentUser;
