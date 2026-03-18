import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function OrderCard({ order }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ color: 'text.secondary', fontSize: 14 }}
      >
        <span>Order ID: {order._id}</span>
        <span>
          {order.createdAt && new Date(order.createdAt).toLocaleString()}
        </span>
      </Stack>
      <Box component="ul" sx={{ mt: 1, mb: 1 }}>
        {order.items?.map((item, idx) => (
          <li key={idx}>
            {item.name} x {item.qty} @ ${item.price.toFixed(2)}
          </li>
        ))}
      </Box>
      <Typography sx={{ fontWeight: 700 }}>
        Total: ${order.total?.toFixed(2)}
      </Typography>
    </Paper>
  );
}

