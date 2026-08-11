import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { normalizeProduct } from "./normalizeData";

/**
 * API de productos configurada con RTK Query.
 * Define endpoints para listar productos, buscar por término y obtener detalles por ID.
 */
export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    endpoints: (builder) => ({
        /**
         * Obtiene una lista paginada de productos.
         */
        getProducts: builder.query({
            query: ({ limit = 20, skip = 0 } = {}) => `/products?limit=${limit}&skip=${skip}`,
            transformResponse: (response) => ({
                items: response.products.map(normalizeProduct),
                total: response.total,
            }),
        }),

        /**
         * Busca productos por un término y normaliza los resultados.
         */
        searchProducts: builder.query({
            query: (term) => `/products/search?q=${encodeURIComponent(term)}&limit=100`,
            transformResponse: (response) => ({
                items: response.products.map(normalizeProduct),
                total: response.total,
            }),
        }),

        /**
         * Obtiene los datos de un producto específico por ID.
         */
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
