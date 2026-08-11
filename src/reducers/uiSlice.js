import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: "",
    isCartOpen: false,
};

/**
 * Slice de Redux para el estado de la interfaz de usuario.
 * Controla el término de búsqueda y el estado del carrito desplegable.
 */
const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        /**
         * Actualiza el término de búsqueda en la UI.
         */
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        /**
         * Abre el carrito desplegable.
         */
        openCart(state) {
            state.isCartOpen = true;
        },
        /**
         * Cierra el carrito desplegable.
         */
        closeCart(state) {
            state.isCartOpen = false;
        },
        /**
         * Alterna el estado abierto/cerrado del carrito.
         */
        toggleCart(state) {
            state.isCartOpen = !state.isCartOpen;
        },
    },
});

export const { setSearchTerm, openCart, closeCart, toggleCart } = uiSlice.actions;

/**
 * Selector para obtener el término de búsqueda actual.
 * @param {Object} state - Estado global de Redux.
 * @returns {string} Término que el usuario ha escrito.
 */
export const selectSearchTerm = (state) => state.ui.searchTerm;

/**
 * Selector para obtener si el carrito desplegable está abierto.
 * @param {Object} state - Estado global de Redux.
 * @returns {boolean} true si el carrito está visible.
 */
export const selectIsCartOpen = (state) => state.ui.isCartOpen;

export default uiSlice.reducer;