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
            state.credentials = {...action.payload.credentials}
        }
    }
});

export default adminSlice.reducer;
export const { setAdmin} = adminSlice.actions;
export const selectIsAdminLoggedIn = state => state.currentAdmin.credentials.username;

