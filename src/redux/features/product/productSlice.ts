import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ProductState = {
  productUpdateModalState: boolean;
  selectedProductToUpdate: any;
  productFormModalState: boolean;
};

const initialState: ProductState = {
  productUpdateModalState: false,
  selectedProductToUpdate: undefined,
  productFormModalState: false,
};

export const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    SetProductFormModalState: (state, action: PayloadAction<boolean>) => {
      state.productFormModalState = action.payload;
    },
    SetSelectedProductToUpdate: (state, action: PayloadAction<any>) => {
      console.log("from dispatch ", action.payload);
      state.selectedProductToUpdate = action.payload;
    },
  },
});

export const { SetProductFormModalState, SetSelectedProductToUpdate } =
  product.actions;
export default product.reducer;
