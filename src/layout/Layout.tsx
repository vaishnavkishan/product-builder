import React, { useMemo, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import useDeviceType from "../hooks/useDeviceType";

export default function Layout() {
  const { isDesktop } = useDeviceType();

  // default open on desktop, closed on mobile/tablet
  const defaultOpen = useMemo(() => (isDesktop ? true : false), [isDesktop]);

  const [open, setOpen] = useState<boolean>(defaultOpen);

  const toggleDrawer = () => setOpen((s) => !s);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <CssBaseline />
      <Navbar onToggleDrawer={toggleDrawer} />
      <Sidebar open={open} />
      <Main sidebarOpen={open}>
        <Outlet />
      </Main>
      <Footer />
    </Box>
  );
}
