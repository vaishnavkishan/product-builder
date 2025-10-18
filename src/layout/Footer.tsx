import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: "center",
        borderTop: "1px solid #ddd",
        mt: "auto",
      }}
    >
      <Typography variant="body2">
        Made 👨🏽‍💻 by Kishan Vaishnav
        {" • "}
        <Link
          href="https://github.com/vaishnavkishan"
          target="_blank"
          underline="hover"
          sx={{ ml: 1 }}
        >
          GitHub
        </Link>
        {" • "}
        <Link
          href="https://www.linkedin.com/in/kishan-vaishnav/"
          target="_blank"
          underline="hover"
          sx={{ ml: 1 }}
        >
          LinkedIn
        </Link>
      </Typography>
    </Box>
  );
}
