import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";
import type { Order, Product } from "../Types/types";
import OrderDialog from "./OrderDialog";

export default function OrderList() {
  const [products] = useState<Product[]>([]);

  const [orders, setOrders] = useState<Order[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    undefined
  );
  const [readOnly, setReadOnly] = useState(false);

  const handleOpenDialog = (order?: Order, readonly = false) => {
    setSelectedOrder(order);
    setReadOnly(readonly);
    setDialogOpen(true);
  };

  const handleSaveOrder = (order: Order) => {
    if (order.id) {
      setOrders((prev) => prev.map((o) => (o.id === order.id ? order : o)));
    } else {
      const id = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;
      setOrders([...orders, { ...order, id }]);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Orders
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Create Order
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Country</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const product = products.find((p) => p.id === order.productId);
              return (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{product?.name || "Unknown"}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.country}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpenDialog(order, false)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDialog(order, true)}>
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <OrderDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveOrder}
        order={selectedOrder}
        readOnly={readOnly}
        products={products}
      />
    </Box>
  );
}
