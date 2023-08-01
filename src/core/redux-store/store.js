import {configureStore} from "@reduxjs/toolkit";
import flowSliceReducers from './slices/flowSlice';
import currentUserReducer from './slices/userSlice';
import showBasketModalReducer from './slices/basketModalSlice';
import availableProductReducer from './slices/productSlice';
import checkoutStepReducer from './slices/checkoutStepSlice';
import adminReducer from './slices/adminSlice';

const store = configureStore({
    devTools: true,
    reducer: {
        applicationFlow: flowSliceReducers,
        currentUser: currentUserReducer,
        showBasketModal : showBasketModalReducer,
        products: availableProductReducer,
        checkoutStep: checkoutStepReducer,
        currentAdmin: adminReducer,
    }
})

export default store;
