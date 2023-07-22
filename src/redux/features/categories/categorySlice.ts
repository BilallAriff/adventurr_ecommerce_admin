import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  selectedCategoryToUpdate: null,
  updateCategoryModal: false,
};

export const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    SetSelectedCategoryToUpdate: (state, action: any) => {
      state.selectedCategoryToUpdate = action.payload;
    },
    SetUpdateCategoryModal: (state, { payload }) => {
      state.updateCategoryModal = payload;
    },
  },
});

export const { SetSelectedCategoryToUpdate, SetUpdateCategoryModal } =
  category.actions;

export default category.reducer;
