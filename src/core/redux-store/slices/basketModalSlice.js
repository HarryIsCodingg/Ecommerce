import { createSlice } from "@reduxjs/toolkit";

const showModalState = {
    showModal: false,
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
        }
    }
});

export default basketModalSlice.reducer;
export const { openBasketModal, closeBasketModal } = basketModalSlice.actions;
export const selectShowBasketModal = (state) => state.showBasketModal.showModal;
