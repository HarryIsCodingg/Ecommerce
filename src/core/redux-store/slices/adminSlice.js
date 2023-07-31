import { createSlice } from "@reduxjs/toolkit";

const adminState = {
    credentials: {
        username: undefined,
        password: undefined,
    }
}

const adminSlice = createSlice({
    name: 'admin',
    initialState: adminState,
    reducers: {
        setAdmin: (state, action) => {
            state.credentials = action.payload;
        }
    }
});

export default adminSlice.reducer;
export const { setAdmin} = adminSlice.actions;

