// Loader.tsx
import { Box, CircularProgress, Typography } from "@mui/material";
import Logo from "../assets/logo-mark.svg";

export default function Loader() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#121212",
      }}
    >
      {/* Application logo */}
      <img
        src={Logo}
        alt="VaiKi Product Builder Logo"
        width={120}
        height={120}
      />
      <Typography variant="h6" sx={{ mt: 2, color: "gray" }}>
        Loading...
      </Typography>
      <CircularProgress sx={{ mt: 3 }} />
    </Box>
  );
}
