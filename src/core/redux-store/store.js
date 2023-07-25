import {configureStore} from "@reduxjs/toolkit";
import flowSliceReducers from './slices/flowSlice';

const store = configureStore({
    devTools: true,
    reducer: {
        applicationFlow: flowSliceReducers,
    }
})

export default store;
