import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../app/axiosBaseQuery';

const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/api` }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({ url: '/orders', method: 'get' }),
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation({
      query: (order) => ({ url: '/orders', method: 'post', data: order }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = ordersApi;

