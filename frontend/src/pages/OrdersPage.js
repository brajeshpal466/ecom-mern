import React from 'react';
import { useGetOrdersQuery } from '../features/orders/ordersApi';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import OrderCard from '../components/OrderCard';

const OrdersPage = () => {
  const { data: orders = [], isLoading, isError } = useGetOrdersQuery();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Orders
      </Typography>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {isError && <Alert severity="error">Failed to load orders.</Alert>}
      {!isLoading && !orders.length && (
        <Alert severity="info">No orders yet.</Alert>
      )}
      <Stack spacing={2} sx={{ mt: 2 }}>
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </Stack>
    </Box>
  );
};

export default OrdersPage;

