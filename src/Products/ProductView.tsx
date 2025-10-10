import { Box, Typography } from "@mui/material";
import type { Product } from "../Types/types";

interface ProductViewProps {
  product?: Product;
  compact?: boolean; // optional, smaller layout if needed
}

export default function ProductView({
  product,
  compact = false,
}: ProductViewProps) {
  if (!product) {
    return (
      <Box>
        <Typography variant="body2">No product selected</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{}}>
      <Typography variant={compact ? "subtitle2" : "h6"} gutterBottom>
        {product.name}
      </Typography>
      <Typography variant="body2">
        <strong>Category:</strong> {product.category}
      </Typography>
      <Typography variant="body2">
        <strong>Price:</strong>{" "}
        <span style={{ fontFamily: "Eczar, serif" }}>₹{product.price}</span>
      </Typography>
    </Box>
  );
}
