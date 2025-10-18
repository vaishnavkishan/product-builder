import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import type { Product } from "../Types/types";
import { useAppSelector } from "../Store/persistent";
import type { Category } from "../Store/CategoryStore";

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSave?: (product: Product) => void; // optional if readonly
  product?: Product;
}

export default function ProductDialog({
  open,
  onClose,
  onSave,
  product,
}: ProductDialogProps) {
  const categories = useAppSelector((s) => s.store.categoryState.categories);

  const [currentProduct, setCurrentProduct] = useState<
    Omit<Product, "id"> & { id?: string }
  >({
    name: "",
    categoryId: "",
    price: 0,
    id: undefined,
  });

  useEffect(() => {
    if (product) {
      setCurrentProduct(product);
    } else {
      setCurrentProduct({
        id: undefined,
        name: "",
        categoryId: "",
        price: 0,
      });
    }
  }, [product, open]);

  const handleChange = (
    field: keyof Omit<Product, "id">,
    value: string | number
  ) => {
    setCurrentProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!onSave) return;
    // Simple validation: prevent save when required fields missing
    if (
      !currentProduct.name ||
      !currentProduct.categoryId ||
      currentProduct.price < 0
    ) {
      // noop; UI shows helper text / disabled button
      return;
    }
    onSave(currentProduct as Product);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product ? "Edit Product" : "Create Product"}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="Product Name"
          value={currentProduct.name}
          onChange={(e) => handleChange("name", e.target.value)}
          fullWidth
          error={!currentProduct.name}
          helperText={
            !currentProduct.name ? "Product name is required" : undefined
          }
        />
        <TextField
          select
          label="Category"
          value={currentProduct.categoryId}
          onChange={(e) => handleChange("categoryId", e.target.value)}
          fullWidth
          SelectProps={{}}
          error={!currentProduct.categoryId}
          helperText={
            !currentProduct.categoryId ? "Please select a category" : undefined
          }
        >
          {categories.map((cat: Category) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Price"
          type="number"
          value={currentProduct.price}
          onChange={(e) => handleChange("price", Number(e.target.value))}
          fullWidth
          error={currentProduct.price < 0}
          helperText={
            currentProduct.price < 0 ? "Price must be 0 or greater" : undefined
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={
            !currentProduct.name ||
            !currentProduct.categoryId ||
            currentProduct.price < 0
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
