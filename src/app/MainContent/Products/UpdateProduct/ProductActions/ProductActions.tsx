import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useDeleteProductByIdMutation } from "@/redux/services/productApi";

export default function ProductActions() {
  const [deleteProductById, { isLoading: productDeleteLoading }] =
    useDeleteProductByIdMutation();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
        <MoreVertIcon />
      </Button>
      <Popover
        sx={{ border: "1px solid red" }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {/* <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ padding: 0.5 }}>
              <ListItemText sx={{ padding: 0.5 }} primary="Delete" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Edit" />
            </ListItemButton>
          </ListItem>
        </List> */}
        {/* <Button
          onClick={() => {
            deleteProductById(`${product?.id}`);
          }}
        >
          <DeleteForeverIcon />
        </Button>
        <Button
          onClick={() => {
            dispatch(SetSelectedProductToUpdate(product));
            // dispatch(SetProductUpdateModalState(true));
          }}
        >
          <EditIcon />
        </Button> */}
      </Popover>
    </div>
  );
}
