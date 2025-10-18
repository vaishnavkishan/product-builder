import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import useDeviceType from "../hooks/useDeviceType";
import { Inventory2, Category, ShoppingCart } from "@mui/icons-material";
import { drawerWidth } from "../constants";
import { Link as RouterLink } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onNavigate?: () => void;
  onClose?: () => void;
}

export default function Sidebar({ open, onNavigate, onClose }: SidebarProps) {
  const { isMobile } = useDeviceType();

  const sidebarItems = [
    { text: "Products", icon: <Inventory2 />, path: "/products" },
    { text: "Categories", icon: <Category />, path: "/categories" },
    { text: "Orders", icon: <ShoppingCart />, path: "/orders" },
  ];
  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={open}
      onClose={onClose}
      sx={{
        width: { sm: drawerWidth },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {sidebarItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              onClick={onNavigate}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
