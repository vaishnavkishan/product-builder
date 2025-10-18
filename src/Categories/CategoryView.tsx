import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import type { Category } from "../Store/CategoryStore";

interface Props {
  open: boolean;
  onClose: () => void;
  category: Category | null;
}

export default function CategoryView({ open, onClose, category }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Category</DialogTitle>
      <DialogContent>
        {category ? (
          <>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mr: 1 }}
              >
                Name:
              </Typography>
              <Typography variant="body1">{category.name}</Typography>
            </Box>
            {category.description && (
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mr: 1 }}
                >
                  Description:
                </Typography>
                <Typography variant="body1">{category.description}</Typography>
              </Box>
            )}
          </>
        ) : (
          <Typography>No category selected</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}
