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
import { Delete, Edit, Visibility, MoreVert } from "@mui/icons-material";
import ProductDialog from "./ProductDialog";
import ViewProductDialog from "./ViewProductDialog";
import type { Product } from "../Types/types";
import {
  useAppDispatch,
  useAppSelector,
  type RootState,
} from "../Store/persistent";
import { Guid } from "guid-typescript";
import {
  addProducts,
  removeProducts,
  updateProducts,
} from "../Store/ProductStore";

export default function ProductList() {
  const products = useAppSelector(
    (state: RootState) => state.store.productState.products
  );
  const dispatch = useAppDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [readOnly, setReadOnly] = useState(false);
  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(
    null
  );

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
    setViewOpen(true);
  };

  const handleOpenActions = (
    event: React.MouseEvent<HTMLElement>,
    product: Product
  ) => {
    setSelectedProduct(product);
    setActionsAnchorEl(event.currentTarget);
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
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Price (₹)</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell
                  align="right"
                  sx={{ fontFamily: "Eczar, serif", fontWeight: 300 }}
                >
                  {product.price}
                </TableCell>
                <TableCell align="center">
                  {/* full action buttons visible on sm+ */}
                  <Box sx={{ display: { xs: "none", sm: "inline-flex" } }}>
                    <IconButton
                      onClick={() => handleOpenDialog(product, false)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleOpenView(product)}>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(product)}>
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
                      onClick={(e) => handleOpenActions(e, product)}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>
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
            if (selectedProduct) handleOpenDialog(selectedProduct, false);
            setActionsAnchorEl(null);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedProduct) handleOpenView(selectedProduct);
            setActionsAnchorEl(null);
          }}
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedProduct) handleDelete(selectedProduct);
            setActionsAnchorEl(null);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}
