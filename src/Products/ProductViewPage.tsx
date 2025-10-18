import { Button, Container, Paper } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../Store/persistent";
import ProductView from "./ProductView";
import ArrowBack from "@mui/icons-material/ArrowBack";

export default function ProductViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useAppSelector((s) =>
    s.store.productState.products.find((p) => p.id === id)
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => {
          void navigate("/products");
        }}
        sx={{ mb: 2 }}
      >
        Back to Products
      </Button>
      <Paper sx={{ p: 3 }}>
        <ProductView product={product} />
      </Paper>
    </Container>
  );
}
