import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from '../features/cart/cartSlice';
import { useCreateOrderMutation } from '../features/orders/ordersApi';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CartItemCard from '../components/CartItemCard';
import CartItemRow from '../components/CartItemRow';

const CartPage = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handlePlaceOrder = async () => {
    if (!items.length) return;
    try {
      const orderPayload = {
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          qty: item.qty,
          price: item.price,
        })),
        total: subtotal,
      };
      await createOrder(orderPayload).unwrap();
      dispatch(clearCart());
      navigate('/orders');
    } catch (e) {
      // Handled by isError
    }
  };

  const handleQtyChange = (item, nextQty) => {
    dispatch(
      updateQuantity({
        productId: item.productId,
        qty: Number(nextQty),
      })
    );
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.productId));
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Cart
      </Typography>

      {items.length === 0 && (
        <Alert severity="info">Your cart is empty.</Alert>
      )}

      {items.length > 0 && (
        <>
          {isMobile ? (
            <Stack spacing={2}>
              {items.map((item) => (
                <CartItemCard
                  key={item.productId}
                  item={item}
                  onQtyChange={handleQtyChange}
                  onRemove={handleRemove}
                />
              ))}
            </Stack>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <CartItemRow
                      key={item.productId}
                      item={item}
                      onQtyChange={handleQtyChange}
                      onRemove={handleRemove}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Typography>
              <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', sm: 'center' }}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              {isError && (
                <Alert severity="error">
                  Failed to place order. Please try again.
                </Alert>
              )}
              <Button
                variant="contained"
                onClick={handlePlaceOrder}
                disabled={isLoading}
                fullWidth={isMobile}
              >
                {isLoading ? 'Placing Order...' : 'Place Order'}
              </Button>
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;

