import { useState } from "react";
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
import OrderDialog from "./OrderDialog";
import { addOrders, updateOrders } from "../Store/GlobalStore";
import type { Order } from "../Types/types";
import { useAppDispatch, useAppSelector } from "../Store/persistent";

export default function OrderList() {
  const orders = useAppSelector((s) => s.store.globalState.orders);
  const products = useAppSelector((s) => s.store.productState.products);
  const dispatch = useAppDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    undefined
  );
  const [readOnly, setReadOnly] = useState(false);

  const handleOpenDialog = (order?: Order, readonly = false) => {
    setSelectedOrder(order);
    setReadOnly(readonly);
    setDialogOpen(true);
  };

  const handleOpenView = (order: Order) => {
    setSelectedOrder(order);
    setViewOpen(true);
  };

  const handleSaveOrder = (order: Order) => {
    if (order.id) {
      dispatch(updateOrders([order])); // update existing order
    } else {
      dispatch(addOrders([order])); // add new order
    }
    setDialogOpen(false);
  };

  return (
    <Box>
      {/* Header */}
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

      {/* Orders Table */}
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
                  <TableCell>{product?.name ?? "Unknown"}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.country}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpenDialog(order, false)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleOpenView(order)}>
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create / Edit Order Dialog */}
      <OrderDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveOrder}
        order={selectedOrder}
        readOnly={readOnly}
        products={products}
      />

      {/* View Order Dialog */}
      {selectedOrder && (
        <OrderDialog
          open={viewOpen}
          onClose={() => setViewOpen(false)}
          order={selectedOrder}
          readOnly={true}
          products={products}
        />
      )}
    </Box>
  );
}
