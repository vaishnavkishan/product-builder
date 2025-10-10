import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ProductView from "./ProductView";
import type { Product } from "../Types/types";

interface ViewProductDialogProps {
  open: boolean;
  onClose: () => void;
  product?: Product;
}

export default function ViewProductDialog({
  open,
  onClose,
  product,
}: ViewProductDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>View Product</DialogTitle>
      <DialogContent>
        <ProductView product={product} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
