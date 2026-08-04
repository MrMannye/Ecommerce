import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";
import uiReducer from "./reducers/uiSlice";
import { productsApi } from "./reducers/productsApi";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        ui: uiReducer,
        [productsApi.reducerPath]: productsApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
});