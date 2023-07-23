import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ProductState = {
  productUpdateModalState: boolean;
  selectedProductToUpdate: any;
};

const initialState = {
  productUpdateModalState: false,
  selectedProductToUpdate: undefined,
};

export const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    SetProductUpdateModalState: (state, action: PayloadAction<boolean>) => {
      state.productUpdateModalState = action.payload;
    },
    SetSelectedProductToUpdate: (state, action: PayloadAction<any>) => {
      console.log("from dispatch ", action.payload);
      state.selectedProductToUpdate = action.payload;
    },
  },
});

export const { SetProductUpdateModalState, SetSelectedProductToUpdate } =
  product.actions;
export default product.reducer;
