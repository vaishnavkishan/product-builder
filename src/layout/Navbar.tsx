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

interface NavbarProps {
  onToggleDrawer: () => void;
}

export default function Navbar({ onToggleDrawer }: NavbarProps) {
  return (
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
          />
        </Box>

        {/* Search icon button for xs screens (rightmost on xs) */}
        <IconButton
          color="inherit"
          aria-label="open search"
          sx={{ display: { xs: "inline-flex", sm: "none" }, ml: 1 }}
        >
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
