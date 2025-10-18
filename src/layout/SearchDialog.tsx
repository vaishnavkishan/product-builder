import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Launch, ProductionQuantityLimits } from "@mui/icons-material";
import React, { useCallback, useMemo } from "react";
import { useAppSelector } from "../Store/persistent";
import { debounce } from "lodash";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProductClick: (id: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function SearchDialog({
  open,
  onClose,
  query,
  onQueryChange,
  onProductClick,
  inputRef,
}: SearchDialogProps) {
  const products = useAppSelector(
    (state) => state.store.productState.products || []
  );
  const [filteredProducts, setFilteredProducts] = React.useState(products);

  const search = useCallback(
    (query: string) => {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    },
    [products]
  );

  const debouncedSearch = useMemo(() => debounce(search, 300), [search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onQueryChange(e);
    debouncedSearch(value);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Search Results</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            inputRef={inputRef}
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search products..."
            value={query}
            onChange={handleSearch}
          />
        </Box>

        {query ? (
          filteredProducts.length > 0 ? (
            <List>
              {filteredProducts.map((product) => (
                <ListItemButton
                  key={product.id}
                  onClick={() => onProductClick(product.id)}
                >
                  <ListItemIcon>
                    <Launch />
                  </ListItemIcon>
                  <ListItemText
                    primary={product.name}
                    secondary={`₹${product.price}`}
                  />
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Box sx={{ py: 2, textAlign: "center" }}>
              <ProductionQuantityLimits
                sx={{ fontSize: 48, color: "text.disabled" }}
              />
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                No products found matching "{query}"
              </Typography>
            </Box>
          )
        ) : (
          <Box sx={{ py: 2, textAlign: "center" }}>
            <Typography color="text.secondary">
              Start typing to search products
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
