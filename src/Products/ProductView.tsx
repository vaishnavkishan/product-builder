import { Box, Typography } from "@mui/material";
import type { Product } from "../Types/types";
import { useAppSelector } from "../Store/persistent";
import { selectCategoryNameById } from "../Store/CategoryStore";

interface ProductViewProps {
  product?: Product;
  compact?: boolean; // optional, smaller layout if needed
}

export default function ProductView({
  product,
  compact = false,
}: ProductViewProps) {
  // call selector unconditionally (safe to pass undefined)
  const selectedCategoryName = useAppSelector(
    selectCategoryNameById(product?.categoryId)
  );

  if (!product) {
    return (
      <Box>
        <Typography variant="body2">No product selected</Typography>
      </Box>
    );
  }

  const categoryName = selectedCategoryName;
  return (
    <Box sx={{}}>
      <Typography variant={compact ? "subtitle2" : "h6"} gutterBottom>
        {product.name}
      </Typography>
      <Typography variant="body2">
        <strong>Category:</strong> {categoryName}
      </Typography>
      <Typography variant="body2">
        <strong>Price:</strong>{" "}
        <span style={{ fontFamily: "Eczar, serif" }}>₹{product.price}</span>
      </Typography>
    </Box>
  );
}
