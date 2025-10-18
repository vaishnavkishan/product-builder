import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import type { Order, Product } from "../Types/types";
import ProductView from "../Products/ProductView";

interface OrderDialogProps {
  open: boolean;
  onClose: () => void;
  onSave?: (order: Order) => void;
  order?: Order;
  readOnly?: boolean;
  products: Product[];
}

const countries = ["India", "USA", "UK", "Germany", "France"];

export default function OrderDialog({
  open,
  onClose,
  onSave,
  order,
  readOnly = false,
  products,
}: OrderDialogProps) {
  const [currentOrder, setCurrentOrder] = useState<
    Omit<Order, "id"> & { id?: string }
  >({
    productId: "0",
    quantity: 1,
    client: "",
    country: "",
    id: undefined,
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );

  useEffect(() => {
    if (order) {
      setCurrentOrder(order);
      const prod = products.find((p) => p.id === order.productId);
      setSelectedProduct(prod);
    } else {
      setCurrentOrder({ productId: "0", quantity: 1, client: "", country: "" });
      setSelectedProduct(undefined);
    }
  }, [order, products, open]);

  const handleChange = (
    field: keyof Omit<Order, "id">,
    value: string | number
  ) => {
    setCurrentOrder((prev) => ({ ...prev, [field]: value }));
    if (field === "productId") {
      const prod = products.find((p) => p.id === String(value));
      setSelectedProduct(prod);
    }
  };

  const handleSave = () => {
    if (!onSave) return;
    if (
      !currentOrder.productId ||
      !currentOrder.client ||
      !currentOrder.country ||
      currentOrder.quantity <= 0
    )
      return; // basic validation
    onSave(currentOrder as Order);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {readOnly ? "View Order" : order ? "Edit Order" : "Create Order"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Left: Form */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              select
              label="Product"
              value={currentOrder.productId}
              onChange={(e) =>
                handleChange("productId", Number(e.target.value))
              }
              fullWidth
              SelectProps={{ disabled: readOnly }}
            >
              {products.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Quantity"
              type="number"
              value={currentOrder.quantity}
              onChange={(e) => handleChange("quantity", Number(e.target.value))}
              slotProps={{ input: { readOnly } }}
              fullWidth
              disabled={readOnly}
            />
            <TextField
              label="Client"
              value={currentOrder.client}
              onChange={(e) => handleChange("client", e.target.value)}
              fullWidth
              slotProps={{ input: { readOnly } }}
              disabled={readOnly}
            />
            <TextField
              select
              label="Country"
              value={currentOrder.country}
              onChange={(e) => handleChange("country", e.target.value)}
              fullWidth
              SelectProps={{ disabled: readOnly }}
            >
              {countries.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Right: Product Info size={{xs:12, md:6}} */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="h6" mb={1}>
                Product Info
              </Typography>
              <ProductView product={selectedProduct} />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {!readOnly && (
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
