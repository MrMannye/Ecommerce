import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";
import uiReducer from "./reducers/uiSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        ui: uiReducer,
    },
});