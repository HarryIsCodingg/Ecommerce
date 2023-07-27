import { createSlice } from "@reduxjs/toolkit";

const showModalState = {
    showModal: false,
    showCartModal: false,
};

const basketModalSlice = createSlice({
    name: 'showBasketModal',
    initialState: showModalState,
    reducers: {
        openBasketModal : (state) => {
            state.showModal = true;
        },
        closeBasketModal : (state) => {
            state.showModal = false;
        },
        openCartModal : (state) => {
            state.showCartModal = true;
        },
        closeCartModal : (state) => {
            state.showCartModal = false;
        }
    }
});

export default basketModalSlice.reducer;
export const { openBasketModal, closeBasketModal, openCartModal, closeCartModal } = basketModalSlice.actions;
export const selectShowBasketModal = (state) => state.showBasketModal.showModal;
export const selectShowCartModal = state => state.showBasketModal.showCartModal;
