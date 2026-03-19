import React, { useCallback, useState } from 'react';
import { useGetProductsQuery } from '../features/products/productsApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ProductCard from '../components/ProductCard';
import { useDebounce } from '../hooks/useDebounce';

const ProductListPage = () => {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const debouncedSearch = useDebounce(search, 500);

  const categories = Array.from(
    new Set((products || []).map((p) => p.category).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));



    const filtered = products
      .filter((p) => (category === 'all' ? true : p.category === category))
      .filter((p) =>
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );

  const handleAddToCart = useCallback( (product) => {
    const image = product?.image || product?.images?.[0];
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image,
        qty: 1,
      })
    );
  }, [dispatch]);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          mb: 2,
        }}
      >
        <Typography variant="h4">Products</Typography>
        <Box sx={{ display: 'flex', gap: 2, flex: 1, justifyContent: 'flex-end' }}>
          <TextField
            size="small"
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ minWidth: 180 }}
            fullWidth={isMobile}
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth={isMobile}
          />
        </Box>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {isError && <Alert severity="error">Failed to load products.</Alert>}

      <Grid container spacing={2}
      justifyContent="center"
      >
        {filtered.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}
          sx={{
            display: "flex",
            justifyContent: "center" // ✅ centers card
          }}
    
          
          
          >
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

      {!isLoading && filtered.length === 0 && (
        <Typography sx={{ mt: 2 }}>No products found.</Typography>
      )}
    </Box>
  );
};

export default ProductListPage;

