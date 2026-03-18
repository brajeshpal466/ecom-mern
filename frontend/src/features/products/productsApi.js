import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../app/axiosBaseQuery';

const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/api` }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: '/products', method: 'get' }),
    }),
    getProductById: builder.query({
      query: (id) => ({ url: `/products/${id}`, method: 'get' }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;

