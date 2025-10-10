import React from "react";
import { Box } from "@mui/material";
import { drawerWidth } from "../constants";

interface MainProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
}

export default function Main({ children, sidebarOpen }: MainProps) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        mt: "64px", // space for AppBar
        ml: sidebarOpen ? `${drawerWidth}px` : 0,
        transition: "margin 0.3s ease",
      }}
    >
      {children}
    </Box>
  );
}
