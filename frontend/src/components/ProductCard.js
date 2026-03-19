import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function ProductCard({ product, onAddToCart }) {
  const image = product?.image || product?.images?.[0];
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/products/${product._id || product.id}`);
  };

  return (
    <Card
      onClick={handleNavigate}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        minWidth: 250,       // ✅ ensures minimum width
        maxWidth: 320,       // ✅ keeps consistent size
        width: '100%',       // ✅ responsive
        transition: '0.3s',
        '&:hover': { boxShadow: 6 }
      }}
    >
      {image && (
        <CardMedia
          component="img"
          height="160"
          image={image}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
          onError={(e) => {
            e.target.src =
              "https://dummyimage.com/400x300/eeeeee/000000&text=Product+Image";
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" noWrap>
          {product.name}
        </Typography>

        <Typography
          sx={{ mt: 1, fontWeight: 600, color: 'success.main' }}
        >
          ${product.price?.toFixed(2)}
        </Typography>

        {product.category && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            {product.category}
          </Typography>
        )}
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={(e) => {
            e.stopPropagation(); // prevent card click
            onAddToCart?.(product);
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
}
