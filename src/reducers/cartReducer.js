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
    },
});


export default cartSlice.reducer;