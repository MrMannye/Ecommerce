import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: {
            reducer: (state, action) => {
                const { product, quantity = 1 } = action.payload;
                state.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    stock: product.stock,
                    quantity: clamp(quantity, 1, product.stock),
                });
            },
            prepare: (product, quantity) => {
                return { payload: { product, quantity } };
            },
        },
        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => i.id === id);
            if (!item) return;
            item.quantity = clamp(quantity, 1, item.stock);
        },
        removeItem(state, action) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearCart, setQuantity } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotalItems = (state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotalPrice = (state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

export const selectQuantityInCart = (id) => (state) =>
    state.cart.items.find((item) => item.id === id)?.quantity ?? 0;

export default cartSlice.reducer;