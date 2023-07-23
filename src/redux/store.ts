import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import productReducer from "./features/product/productSlice";
import { userApi } from "./services/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { categoryApi } from "./services/categoryApi";
import categoryReducer from "./features/categories/categorySlice";
import { subCategoryApi } from "./services/subCategoryApi";
import { productApi } from "./services/productApi";

export const store = configureStore({
  reducer: {
    counterReducer,
    sidebarReducer,
    categoryReducer,
    productReducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  //   devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      // userApi.middleware,
      categoryApi.middleware,
      subCategoryApi.middleware,
      productApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
