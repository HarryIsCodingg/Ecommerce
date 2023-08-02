import {createSlice} from "@reduxjs/toolkit";

const categoryState = {
    categoryModalOpen : false,
    categories: [],
    isProductDeleted: false,
}

const categorySlice = createSlice({
    name: 'category',
    initialState: categoryState,
    reducers: {
        setOpenCategoryModal : state => {
            state.categoryModalOpen = true;
        },
        setCloseCategoryModal : state => {
            state.categoryModalOpen = false;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setIsProductDeleted: (state, action) => {
            state.isProductDeleted = action.payload;
        }
    }
})


export const {setOpenCategoryModal, setCloseCategoryModal, setCategories, setIsProductDeleted} = categorySlice.actions;
export const selectCategories = (state) => state.category.categories;
export const selectCategoryModalOpen = (state) => state.category.categoryModalOpen;
export const selectIsProductDeleted = (state) => state.category.isProductDeleted;
export default categorySlice.reducer;
