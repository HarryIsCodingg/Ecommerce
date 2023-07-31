import { createSlice } from "@reduxjs/toolkit";

const productState = {
    availableProducts: [],
    deletedProduct: undefined,
    openAddProductModal: false,
}

const productSlice = createSlice({
    name: 'products',
    initialState: productState,
    reducers: {
        setAvailableProducts: (state, action) => {
            state.availableProducts = action.payload;
        },
        setProductDeleted: (state, action) => {
            state.deletedProduct = action.payload;
        },
        setOpenAddProductModal: (state) => {
            state.openAddProductModal = true;
        },
        setCloseAddProductModal: (state) => {
            state.openAddProductModal = false;
        },
    }
});

export default productSlice.reducer;
export const { setAvailableProducts, setProductDeleted, setCloseAddProductModal, setOpenAddProductModal } = productSlice.actions;
export const selectAllProducts = (state) => state.products.availableProducts;
export const selectDeletedProduct = (state) => state.products.deletedProduct;
export const selectOpenAddProductModal = (state) => state.products.openAddProductModal;
