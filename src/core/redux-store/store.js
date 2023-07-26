import {configureStore} from "@reduxjs/toolkit";
import flowSliceReducers from './slices/flowSlice';
import currentUserReducer from './slices/userSlice';
import showBasketModalReducer from './slices/basketModalSlice';

const store = configureStore({
    devTools: true,
    reducer: {
        applicationFlow: flowSliceReducers,
        currentUser: currentUserReducer,
        showBasketModal : showBasketModalReducer,
    }
})

export default store;
