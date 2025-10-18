import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import Logo from "../assets/logo-mark.svg";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Launch,
  ProductionQuantityLimits,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../Store/persistent";

interface NavbarProps {
  onToggleDrawer: () => void;
}

export default function Navbar({ onToggleDrawer }: NavbarProps) {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.store.productState.products);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSearchOpen(Boolean(event.target.value));
  };

  const handleProductClick = (productId: string) => {
    setSearchOpen(false);
    setQuery("");
    void navigate(`/products/${productId}`);
  };

  return (
    <>
      <Box>
        <AppBar position="fixed" sx={{ zIndex: 1201 }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onToggleDrawer}
              sx={{}}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo (visible on xs) + App Name (hide on xs) */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="img"
                src={Logo}
                alt="VaiKi"
                sx={{
                  height: 36,
                  display: { xs: "inline-block", sm: "inline-block" },
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  flexGrow: 0,
                  display: { xs: "none", sm: "block" },
                  ml: 1,
                  mr: 1,
                }}
              >
                VaiKi Product Builder
              </Typography>
            </Box>

            {/* spacer pushes the following items to the right */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Search Bar (full on sm+, icon-only on xs) - at the rightmost side */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                bgcolor: "rgba(255,255,255,0.15)",
                borderRadius: 1,
                px: 1,
                maxWidth: 400,
                ml: 2,
              }}
            >
              <SearchIcon />
              <InputBase
                placeholder="Search…"
                sx={{ ml: 1, flex: 1, color: "inherit" }}
                value={query}
                onChange={handleSearch}
              />
            </Box>

            {/* Search icon button for xs screens */}
            <IconButton
              color="inherit"
              aria-label="open search"
              sx={{ display: { xs: "inline-flex", sm: "none" }, ml: 1 }}
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Search Results Dialog */}
        <Dialog
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Search Results</DialogTitle>
          <DialogContent>
            {query ? (
              filteredProducts.length > 0 ? (
                <List>
                  {filteredProducts.map((product) => (
                    <ListItemButton
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
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
      </Box>
    </>
  );
}
