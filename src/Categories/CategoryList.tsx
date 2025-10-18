import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import { Edit, Delete, Visibility, MoreVert } from "@mui/icons-material";
import {
  useAppSelector,
  useAppDispatch,
  type RootState,
} from "../Store/persistent";
import {
  addCategories,
  removeCategories,
  updateCategories,
  type Category,
} from "../Store/CategoryStore";

import { Guid } from "guid-typescript";
import CategoryView from "./CategoryView";

export default function CategoryList() {
  const categories: Category[] = useAppSelector(
    (s: RootState) => s.store.categoryState.categories
  );
  const dispatch = useAppDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const openCreate = () => {
    setSelected(null);
    setName("");
    setDialogOpen(true);
  };

  const openEdit = (cat: Category) => {
    setSelected(cat);
    setName(cat.name ?? "");
    setDialogOpen(true);
  };

  const save = () => {
    if (selected?.id) {
      dispatch(updateCategories([{ ...selected, name }]));
    } else {
      dispatch(addCategories([{ id: Guid.create().toString(), name }]));
    }
    setDialogOpen(false);
  };

  const handleDelete = (cat: Category) => dispatch(removeCategories([cat.id]));

  const handleOpenActions = (
    event: React.MouseEvent<HTMLElement>,
    cat: Category
  ) => {
    setSelected(cat);
    setActionsAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Categories</Typography>
        <Button variant="contained" onClick={openCreate}>
          Create Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((c: Category) => (
              <TableRow key={c.id}>
                <TableCell>{c.name}</TableCell>
                <TableCell align="center">
                  {/* Full action buttons visible on sm+ */}
                  <Box sx={{ display: { xs: "none", sm: "inline-flex" } }}>
                    <IconButton onClick={() => openEdit(c)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelected(c);
                        setViewOpen(true);
                      }}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(c)}>
                      <Delete />
                    </IconButton>
                  </Box>

                  {/* Compact actions for xs: one button opens menu */}
                  <Box sx={{ display: { xs: "inline-flex", sm: "none" } }}>
                    <IconButton
                      aria-label="more"
                      aria-controls={
                        actionsAnchorEl ? "actions-menu" : undefined
                      }
                      aria-haspopup="true"
                      onClick={(e) => handleOpenActions(e, c)}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          {selected ? "Edit Category" : "Create Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            fullWidth
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={save} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <CategoryView
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        category={selected}
      />

      {/* Actions menu for xs screens */}
      <Menu
        id="actions-menu"
        anchorEl={actionsAnchorEl}
        open={Boolean(actionsAnchorEl)}
        onClose={() => setActionsAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            bgcolor: "background.default",
            color: "text.primary",
            boxShadow: (theme) => theme.shadows[8],
            minWidth: 140,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            if (selected) openEdit(selected);
            setActionsAnchorEl(null);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selected) {
              setViewOpen(true);
            }
            setActionsAnchorEl(null);
          }}
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selected) handleDelete(selected);
            setActionsAnchorEl(null);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}
