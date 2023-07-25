import { createSlice } from "@reduxjs/toolkit";

const flowState = {
    flow: 'user',
}

const flowSlice = createSlice({
    name: 'loginButtons',
    initialState: flowState,
    reducers: {
        setAdminFlow: (state) => {
            state.flow = 'admin';
        },
        setUserFlow: (state) => {
            state.flow = 'user';
        }
    }
});

export default flowSlice.reducer;
export const { setAdminFlow, setUserFlow } = flowSlice.actions;
export const selectFlow = (state) => state.applicationFlow.flow;
