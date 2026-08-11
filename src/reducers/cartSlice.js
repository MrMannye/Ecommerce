import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

/**
 * Limita un valor dentro de un rango [min, max].
 * @param {number} value - Valor a limitar.
 * @param {number} min - Límite mínimo permitido.
 * @param {number} max - Límite máximo permitido.
 * @returns {number} Valor ajustado dentro del rango.
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Slice de Redux para el carrito de compras.
 * - Agrega productos
 * - Ajusta cantidades
 * - Elimina artículos
 * - Vacía el carrito
 * También sincroniza el estado con localStorage.
 */
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        /**
         * Agrega un producto al carrito o actualiza su cantidad si ya existe.
         * La cantidad se limita al stock disponible.
         */
        addItem: {
            reducer: (state, action) => {
                const { product, quantity = 1 } = action.payload;
                const normalizedQuantity = clamp(quantity, 1, product.stock);
                const existingItem = state.items.find((item) => item.id === product.id);

                if (existingItem) {
                    existingItem.quantity = clamp(
                        existingItem.quantity + normalizedQuantity,
                        1,
                        product.stock
                    );
                    existingItem.stock = product.stock;
                    return;
                }
                state.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    stock: product.stock,
                    quantity: normalizedQuantity,
                });
                window.localStorage.setItem("cart", JSON.stringify(state.items));
            },
            prepare: (product, quantity = 1) => {
                return { payload: { product, quantity } };
            },
        },
        /**
         * Establece una cantidad específica para un artículo del carrito.
         * El valor se normaliza entre 1 y el stock disponible.
         */
        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => i.id === id);
            if (!item) return;
            item.quantity = clamp(quantity, 1, item.stock);
            window.localStorage.setItem("cart", JSON.stringify(state.items));
        },
        /**
         * Elimina un artículo del carrito por su ID.
         */
        removeItem(state, action) {
            state.items = state.items.filter((item) => item.id !== action.payload);
            window.localStorage.setItem("cart", JSON.stringify(state.items));
        },
        /**
         * Vacía todos los artículos del carrito.
         */
        clearCart(state) {
            state.items = [];
            window.localStorage.setItem("cart", JSON.stringify(state.items));
        },
    },
});

export const { addItem, removeItem, clearCart, setQuantity } = cartSlice.actions;

/**
 * Selector para obtener los artículos del carrito.
 * @param {Object} state - Estado global de Redux.
 * @returns {Array<Object>} Artículos del carrito.
 */
export const selectCartItems = (state) => state.cart.items;

/**
 * Selector para obtener el total de unidades en el carrito.
 * @param {Object} state - Estado global de Redux.
 * @returns {number} Cantidad total de productos.
 */
export const selectCartTotalItems = (state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

/**
 * Selector para obtener el precio total del carrito.
 * @param {Object} state - Estado global de Redux.
 * @returns {number} Suma del precio de todos los artículos.
 */
export const selectCartTotalPrice = (state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

/**
 * Selector para obtener la cantidad de un producto específico en el carrito.
 * @param {string|number} id - ID del producto.
 * @returns {function(Object): number} Función que recibe el estado y devuelve la cantidad.
 */
export const selectQuantityInCart = (id) => (state) =>
    state.cart.items.find((item) => item.id === id)?.quantity ?? 0;

export default cartSlice.reducer;