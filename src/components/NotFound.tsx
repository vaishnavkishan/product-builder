import { Card, Typography } from "@mui/material";

function NotFoundPage() {
  return (
    <Card sx={{ m: 4, p: 4 }}>
      <Typography variant="h2" color="secondary">
        404
      </Typography>
      <Typography variant="h3" color="primary.light">
        Oops! Page not found
      </Typography>
      <Typography variant="subtitle1">
        The page you are looking for doesn&apos;t exist or has been moved.
      </Typography>
    </Card>
  );
}

export default NotFoundPage;
