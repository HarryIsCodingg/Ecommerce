import { createSlice } from "@reduxjs/toolkit";

const productState = {
    availableProducts: [],
}

const productSlice = createSlice({
    name: 'products',
    initialState: productState,
    reducers: {
        setAvailableProducts: (state, action) => {
            state.availableProducts = action.payload;
        }
    }
});

export default productSlice.reducer;
export const { setAvailableProducts } = productSlice.actions;
export const selectAllProducts = (state) => state.products.availableProducts;
