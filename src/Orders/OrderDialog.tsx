/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import type { Order, Product } from "../Types/types";
import {
  Controller,
  useForm,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import { useEffect } from "react";
import ProductView from "../Products/ProductView";

interface OrderDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (order: Order) => void;
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
  // const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  // () => getProductFromId(order?.productId)

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Order>({});

  // --- dynamically watch productId field value
  const productId = useWatch({ control, name: "productId" });

  // --- compute selectedProduct from productId
  const selectedProduct = products.find((p) => p.id === productId);

  const onSubmit: SubmitHandler<Order> = (data) => {
    onSave(data);
    onClose();
  };
  // ✅ Update defaults once products or order data is available
  useEffect(() => {
    if (products?.length) {
      console.log("Resetting form with order data:", order);
      reset({
        productId: order?.productId ?? products[0].id,
        quantity: order?.quantity ?? 1,
        client: order?.client ?? "",
        country: order?.country ?? "India",
      });
    }
  }, [products, order, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {readOnly ? "View Order" : order ? "Edit Order" : "Create Order"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} pt={1}>
          {/* Left: Form */}
          <Grid
            container
            size={{ xs: 12, md: 6 }}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            spacing={8}
          >
            <form id="orderForm" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="productId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        label="Product"
                        fullWidth
                        disabled={readOnly}
                        {...field} // ✅ this connects value + onChange + ref
                      >
                        {products.map((p) => (
                          <MenuItem key={p.id} value={p.id}>
                            {p.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="quantity"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Quantity"
                        type="number"
                        fullWidth
                        disabled={readOnly}
                        error={!!errors.quantity}
                        {...field} // ✅ essential
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="client"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Client"
                        fullWidth
                        disabled={readOnly}
                        error={!!errors.client}
                        {...field} // ✅ essential
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        label="Country"
                        fullWidth
                        disabled={readOnly}
                        {...field} // ✅ essential
                      >
                        {countries.map((c) => (
                          <MenuItem key={c} value={c}>
                            {c}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>

          {/* Right: Product Info size={{xs:12, md:6}} */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="h6" color="secondary" mb={1}>
                Product Info
              </Typography>

              {selectedProduct && <ProductView product={selectedProduct} />}
              {!selectedProduct && (
                <Typography variant="body2" color="text.secondary">
                  Select a product to view its details.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {!readOnly && (
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            form="orderForm"
          >
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
