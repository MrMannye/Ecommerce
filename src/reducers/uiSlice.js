import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: "",
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        openCart(state) {
            state.isCartOpen = true;
        },
        closeCart(state) {
            state.isCartOpen = false;
        },
        toggleCart(state) {
            state.isCartOpen = !state.isCartOpen;
        },
    },
});

export const { setSearchTerm, openCart, closeCart, toggleCart } = uiSlice.actions;

export const selectSearchTerm = (state) => state.ui.searchTerm;
export const selectIsCartOpen = (state) => state.ui.isCartOpen;

export default uiSlice.reducer;