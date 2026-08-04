import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { normalizeProduct } from "./normalizeData";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ limit = 20, skip = 0 } = {}) => `/products?limit=${limit}&skip=${skip}`,
            transformResponse: (response) => ({
                items: response.products.map(normalizeProduct),
                total: response.total,
            }),
        }),

        searchProducts: builder.query({
            query: (term) => `/products/search?q=${encodeURIComponent(term)}&limit=100`,
            transformResponse: (response) => ({
                items: response.products.map(normalizeProduct),
                total: response.total,
            }),
        }),

        // Detalle de un producto puntual.
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
            transformResponse: (response) => normalizeProduct(response),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useSearchProductsQuery,
    useGetProductByIdQuery,
} = productsApi;
