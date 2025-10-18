import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
} from "@mui/material";
import Logo from "../assets/logo-mark.svg";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchDialog from "./SearchDialog";

interface NavbarProps {
  onToggleDrawer: () => void;
}

export default function Navbar({ onToggleDrawer }: NavbarProps) {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSearchOpen(Boolean(event.target.value));
  };

  const handleProductClick = (productId: string) => {
    setSearchOpen(false);
    setQuery("");
    void navigate(`/products/${productId}`);
  };

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 0);
  }, [searchOpen]);

  return (
    <>
      <Box>
        <AppBar position="fixed" sx={{ zIndex: 1201 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onToggleDrawer}>
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box component="img" src={Logo} alt="VaiKi" sx={{ height: 36 }} />
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", sm: "block" }, ml: 1, mr: 1 }}
              >
                VaiKi Product Builder
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

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

        <SearchDialog
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          query={query}
          onQueryChange={handleSearch}
          onProductClick={handleProductClick}
          inputRef={inputRef}
        />
      </Box>
    </>
  );
}
