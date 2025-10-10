import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <CssBaseline />
      <Navbar onToggleDrawer={toggleDrawer} />
      <Sidebar open={open} />
      <Main sidebarOpen={open}>{children}</Main>
      <Footer />
    </Box>
  );
}
