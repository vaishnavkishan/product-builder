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
import ProductDialog from "./ProductDialog";
import type { Product } from "../Types/types";
import ViewProductDialog from "./ViewProductDialog";

const dummyProducts: Product[] = [
  { id: 1, name: "Laptop", category: "Electronics", price: 70000 },
  { id: 2, name: "T-Shirt", category: "Clothing", price: 999 },
  { id: 3, name: "Coffee Mug", category: "Kitchen", price: 299 },
];

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [readOnly, setReadOnly] = useState(false);

  const handleOpenDialog = (product?: Product, readonly = false) => {
    setSelectedProduct(product);
    setReadOnly(readonly);
    setDialogOpen(true);
  };

  const handleSaveProduct = (product: Product) => {
    if (product.id) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
      setProducts([...products, { ...product, id }]);
    }
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
          Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Create Product
        </Button>
      </Box>

      {/* Product Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Price (₹)</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell
                  align="right"
                  sx={{ fontFamily: "Eczar, serif", fontWeight: 300 }}
                >
                  {product.price}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpenDialog(product, false)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => setReadOnly(true)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ProductDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
        readOnly={readOnly}
      />
      <ViewProductDialog
        open={readOnly}
        onClose={() => setReadOnly(false)}
        product={selectedProduct}
      />
    </Box>
  );
}
