import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SidebarState = {
  selectedSection: string;
};

const initialState = {
  selectedSection: "categories",
} as SidebarState;

export const counter = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    SetSelectedSection: (state, action: PayloadAction<string>) => {
      state.selectedSection = action.payload;
    },
  },
});

export const { SetSelectedSection } = counter.actions;
export default counter.reducer;
