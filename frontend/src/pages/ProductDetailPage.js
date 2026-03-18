import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../features/products/productsApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!product) return;
    const image = product?.image || product?.images?.[0];
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image,
        qty: Number(qty),
      })
    );
  };

  if (isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (isError || !product)
    return <Alert severity="error">Product not found.</Alert>;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        {product.image || product.images?.[0] ? (
          <Box
            component="img"
            src={product.image || product.images?.[0] || ""}
            alt={product.name}
            onError={(e) => {
              e.target.src = "https://dummyimage.com/400x300/eeeeee/000000&text=Product+Image";
            }}
            sx={{
              width: '100%',
              maxHeight: 420,
              objectFit: 'cover',
              borderRadius: 2,
              bgcolor: 'grey.100',
            }}
          />
        ) : null}
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4">{product.name}</Typography>
        <Typography sx={{ mt: 1, fontWeight: 700, color: 'success.main' }}>
          ${product.price?.toFixed(2)}
        </Typography>
        {product.category && (
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {product.category}
          </Typography>
        )}
        <Typography sx={{ mt: 2 }}>{product.description}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
          <TextField
            label="Qty"
            type="number"
            size="small"
            inputProps={{ min: 1 }}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            sx={{ width: 120 }}
          />
          <Button variant="contained" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductDetailPage;

