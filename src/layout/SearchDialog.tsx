import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  ListItem,
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
import { List as FixedSizeList, type RowComponentProps } from "react-window";
import type { Product } from "../Types/types";

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

  const debouncedSearch = useMemo(() => debounce(search, 100), [search]);

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
            renderList(filteredProducts, onProductClick)
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
function renderList(products: Product[], onProductClick: (id: string) => void) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        bgcolor: "background.paper",
      }}
    >
      <FixedSizeList
        rowComponent={RowComponent}
        rowCount={products.length}
        rowHeight={60} // <-- big enough for icon + text
        rowProps={{ products, onProductClick }}
      />
    </Box>
  );
}

function RowComponent({
  index,
  style,
  products,
  onProductClick,
}: RowComponentProps<{
  products: Product[];
  onProductClick: (id: string) => void;
}>) {
  console.log(products, products[index]);
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton onClick={() => onProductClick(products[index].id)}>
        <ListItemIcon>
          <Launch />
        </ListItemIcon>
        <ListItemText
          primary={products[index].name}
          secondary={products[index].price}
        />
      </ListItemButton>
    </ListItem>
  );
}
