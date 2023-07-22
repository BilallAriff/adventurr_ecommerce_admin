import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import { userApi } from "./services/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { categoryApi } from "./services/categoryApi";
import categoryReducer from "./features/categories/categorySlice";
import { subCategoryApi } from "./services/subCategoryApi";

export const store = configureStore({
  reducer: {
    counterReducer,
    sidebarReducer,
    categoryReducer,
    // [userApi.reducerPath]: userApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  //   devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      // userApi.middleware,
      categoryApi.middleware,
      subCategoryApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
