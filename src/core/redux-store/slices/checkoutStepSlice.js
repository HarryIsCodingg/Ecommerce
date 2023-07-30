import { createSlice } from "@reduxjs/toolkit";

const checkoutStepState = {
    activeStep:1,
};

const checkoutStepSlice = createSlice({
    name: 'checkoutStep',
    initialState: checkoutStepState,
    reducers: {
      setNextStep: (state) => {
          state.activeStep = state.activeStep + 1;
      },
      setPrevStep: (state) => {
          state.activeStep = state.activeStep - 1;
      }
    }
});

export default checkoutStepSlice.reducer;
export const { setNextStep, setPrevStep } = checkoutStepSlice.actions;
export const selectStep = (state) => state.checkoutStep.activeStep;
