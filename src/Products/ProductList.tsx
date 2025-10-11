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
import { Delete, Edit, Visibility } from "@mui/icons-material";
import ProductDialog from "./ProductDialog";
import ViewProductDialog from "./ViewProductDialog";
import type { Product } from "../Types/types";
import {
  addProducts,
  removeProducts,
  updateProducts,
} from "../Store/GlobalStore";
import {
  useAppDispatch,
  useAppSelector,
  type RootState,
} from "../Store/persistent";
import { Guid } from "guid-typescript";

export default function ProductList() {
  const products = useAppSelector((state: RootState) => state.global.products);
  const dispatch = useAppDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [readOnly, setReadOnly] = useState(false);

  const handleOpenDialog = (product?: Product, readonly = false) => {
    setSelectedProduct(product);
    setReadOnly(readonly);
    setDialogOpen(true);
  };

  const handleDelete = (product: Product) => {
    dispatch(removeProducts([product.id]));
  };
  const handleOpenView = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSaveProduct = (product: Product) => {
    if (product.id) {
      dispatch(updateProducts([product])); // update existing product
    } else {
      product.id = Guid.create().toString();
      dispatch(addProducts([product])); // add new product
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
                  <IconButton onClick={() => handleOpenView(product)}>
                    <Visibility />
                  </IconButton>

                  <IconButton onClick={() => handleDelete(product)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit / Create Dialog */}
      <ProductDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
        readOnly={readOnly}
      />

      {/* View Dialog */}
      <ViewProductDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        product={selectedProduct}
      />
    </Box>
  );
}
