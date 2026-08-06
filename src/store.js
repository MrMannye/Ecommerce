import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";
import uiReducer from "./reducers/uiSlice";
import { productsApi } from "./reducers/productsApi"

let preloadedState = {
    cart: {
        items: JSON.parse(window.localStorage.getItem("cart")) || [],
    },
};

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        ui: uiReducer,
        [productsApi.reducerPath]: productsApi.reducer,

    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
});