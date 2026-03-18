import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function CartItemRow({ item, onQtyChange, onRemove }) {
  return (
    <TableRow>
      <TableCell>{item.name}</TableCell>
      <TableCell>${item.price.toFixed(2)}</TableCell>
      <TableCell>
        <TextField
          type="number"
          size="small"
          inputProps={{ min: 1 }}
          value={item.qty}
          onChange={(e) => onQtyChange?.(item, Number(e.target.value))}
          sx={{ width: 110 }}
        />
      </TableCell>
      <TableCell>${(item.price * item.qty).toFixed(2)}</TableCell>
      <TableCell align="right">
        <Button color="error" onClick={() => onRemove?.(item)}>
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
}

