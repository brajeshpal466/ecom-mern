import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

export default function CartItemCard({ item, onQtyChange, onRemove }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Typography variant="h6">{item.name}</Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="text.secondary">Price</Typography>
          <Typography>${item.price.toFixed(2)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography color="text.secondary">Qty</Typography>
          <TextField
            type="number"
            size="small"
            inputProps={{ min: 1 }}
            value={item.qty}
            onChange={(e) => onQtyChange?.(item, Number(e.target.value))}
            sx={{ width: 120 }}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="text.secondary">Total</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            ${(item.price * item.qty).toFixed(2)}
          </Typography>
        </Stack>
        <Divider />
        <Button color="error" onClick={() => onRemove?.(item)} sx={{ alignSelf: 'flex-start' }}>
          Remove
        </Button>
      </Stack>
    </Paper>
  );
}

