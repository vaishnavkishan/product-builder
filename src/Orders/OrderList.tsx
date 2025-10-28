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
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Delete,
  Edit,
  MoreVert,
  RemoveRedEye,
  Visibility,
} from "@mui/icons-material";
import OrderDialog from "./OrderDialog";
import { addOrders, removeOrders, updateOrders } from "../Store/GlobalStore";
import type { Order } from "../Types/types";
import { useAppDispatch, useAppSelector } from "../Store/persistent";
import { Guid } from "guid-typescript";

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

  // readOnly mode removed; view-only uses ViewProductDialog
  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(
    null
  );

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
      order.id = Guid.create().toString();
      dispatch(addOrders([order])); // add new order
    }
    setDialogOpen(false);
  };

  const handleDelete = (order: Order) => {
    dispatch(removeOrders([order.id]));
  };

  const handleOpenActions = (
    event: React.MouseEvent<HTMLElement>,
    order: Order
  ) => {
    setSelectedOrder(order);
    setActionsAnchorEl(event.currentTarget);
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
                  <TableCell>{product?.name ?? "Unknown"}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.country}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: { xs: "none", sm: "inline-flex" } }}>
                      <IconButton
                        sx={{ color: (theme) => theme.palette.primary.main }}
                        onClick={() => handleOpenDialog(order, false)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenView(order)}
                        sx={{ color: (theme) => theme.palette.info.light }}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        sx={{ color: (theme) => theme.palette.error.light }}
                        onClick={() => handleDelete(order)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                    {/* compact actions for xs: one button opens menu */}
                    <Box sx={{ display: { xs: "inline-flex", sm: "none" } }}>
                      <IconButton
                        aria-label="more"
                        aria-controls={
                          actionsAnchorEl ? "actions-menu" : undefined
                        }
                        aria-haspopup="true"
                        onClick={(e) => handleOpenActions(e, order)}
                      >
                        <MoreVert />
                      </IconButton>
                    </Box>
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
          onSave={(data) => {
            console.log("saving:", data);
          }}
        />
      )}
      {/* Actions menu for xs screens */}
      <Menu
        id="actions-menu"
        anchorEl={actionsAnchorEl}
        open={Boolean(actionsAnchorEl)}
        onClose={() => setActionsAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            bgcolor: "background.default",
            color: "text.primary",
            // slightly higher elevation so it sits above table paper
            boxShadow: (theme) => theme.shadows[8],
            minWidth: 140,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            if (selectedOrder) handleOpenDialog(selectedOrder);
            setActionsAnchorEl(null);
          }}
          sx={{ color: (theme) => theme.palette.primary.main }}
        >
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedOrder) handleOpenDialog(selectedOrder, true);
            setActionsAnchorEl(null);
          }}
          sx={{ color: (theme) => theme.palette.info.light }}
        >
          <RemoveRedEye sx={{ mr: 1 }} /> Quick View
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedOrder) handleDelete(selectedOrder);
            setActionsAnchorEl(null);
          }}
          sx={{ color: (theme) => theme.palette.error.light }}
        >
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}
