import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SetSelectedSection } from "@/redux/features/sidebar/sidebarSlice";
import { Typography } from "@mui/material";
import ThemeContainer from "../ThemeContainer/ThemeContainer";

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const selectedSection = useAppSelector(
    (state) => state?.sidebarReducer?.selectedSection
  );
  const dispatch = useAppDispatch();

  return (
    <ThemeContainer>
      {/* <Box>
        <Typography color="#">Dashboard</Typography>
      </Box> */}
      <List
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Typography mb={1} variant="h5">
              Dashboard
            </Typography>
          </ListSubheader>
        }
      >
        <ListItemButton
          onClick={() => dispatch(SetSelectedSection("categories"))}
        >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItemButton>
        <ListItemButton
          onClick={() => dispatch(SetSelectedSection("sub_categories"))}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Sub-Categories" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            handleClick();
            //   dispatch(SetSelectedSection("sub_categories"));
          }}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => dispatch(SetSelectedSection("products"))}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => dispatch(SetSelectedSection("stocks"))}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Stocks" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => dispatch(SetSelectedSection("product_images"))}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Product Images" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => dispatch(SetSelectedSection("product_videos"))}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Product Videos" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </ThemeContainer>
  );
}
