import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Avatar,
} from "@mui/material";
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
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo + App Name */}
        <Typography variant="h6" sx={{ flexGrow: 0, mr: 2 }}>
          🛒 MyStore
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            bgcolor: "rgba(255,255,255,0.15)",
            borderRadius: 1,
            px: 1,
            maxWidth: 400,
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder="Search…"
            sx={{ ml: 1, flex: 1, color: "inherit" }}
          />
        </Box>

        {/* Profile/Login */}
        <IconButton color="inherit" sx={{ ml: 2 }}>
          <Avatar alt="User" src="" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
