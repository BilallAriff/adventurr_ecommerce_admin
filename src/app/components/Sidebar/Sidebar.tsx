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
import { ColorPalete, styleFlexEverything } from "@/app/CommonStyles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Container from "../Container/Container";
import SidebarItem from "./SidebarItem/SidebarItem";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Box } from "@mui/material";

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  // const selectedSection = useAppSelector(
  //   (state) => state?.sidebarReducer?.selectedSection
  // );
  // const dispatch = useAppDispatch();

  const Scrollbar = (props: any) => {
    const { children, height = 300 } = props;

    const scrollbarStyling = {
      // width
      "::-webkit-scrollbar": {
        width: "6px",
      },

      // Track
      "::-webkit-scrollbar-track": {
        backgroundColor: "rgba(241, 241, 241, 0)",
      },

      // Track on hover
      "::-webkit-scrollbar-track:hover": {
        backgroundColor: "rgba(241, 241, 241, 1)",
        // background: "#f1f1f1",
      },
      // Handle
      "::-webkit-scrollbar-thumb": {
        borderRadius: 50,
        background: "rgba(0, 59, 147, 0.01)",
      },

      // Handle on hover
      "::-webkit-scrollbar-thumb:hover": {
        background: "rgba(0, 59, 147, 1)",
      },
    };
    return (
      <Box
        sx={{
          ...scrollbarStyling,
          height: height,
          overflowY: "scroll",
        }}
      >
        {children}
      </Box>
    );
  };

  return (
    <Box
      sx={{ height: "100%", backgroundColor: "#FFFFFF", borderRadius: "4px" }}
    >
      <Box
        sx={{
          ...styleFlexEverything,
          py: 1.5,
        }}
      >
        <Typography
          sx={{
            ...styleFlexEverything,
            color: ColorPalete.primary_light,
            fontWeight: "bold",
          }}
          variant="h5"
        >
          <DashboardIcon sx={{ fontSize: 45 }} />
          Dashboard
        </Typography>
      </Box>
      <Scrollbar height={420}>
        <List
          sx={{
            height: "100%",
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {data.map((item, index) => {
            return <SidebarItem key={index} item={item} />;
          })}

          {/* <ListItemButton
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
      </Collapse> */}
        </List>
      </Scrollbar>
    </Box>
  );
}

const data = [
  {
    parentName: "Product Management",
    subItems: [
      { name: "Products" },
      { name: "Product Images" },
      { name: "Product videos" },
      { name: "Categories" },
      { name: "Sub-categories" },
    ],
  },
  {
    parentName: "Inventory Managment",
    subItems: [
      {
        name: "Invetory",
      },
    ],
  },
  {
    parentName: "Order Management",
    subItems: [{ name: "Orders" }],
  },
  {
    parentName: "Customer Managment",
    subItems: [{ name: "Customers" }, { name: "Customer support" }],
  },
  {
    parentName: "Discount and Promotions",
    subItems: [{ name: "Coupons" }],
  },
  {
    parentName: "Analytics and Reports",
    subItems: [{ name: "Sales report" }, { name: "Customer analytics" }],
  },
  {
    parentName: "Content Managment",
    subItems: [{ name: "Manage Pages" }],
  },
  {
    parentName: "User managment",
    subItems: [{ name: "Users" }, { name: "User roles and permissions" }],
  },
  {
    parentName: "Settings",
    subItems: [
      { name: "General settings" },
      { name: "Payments" },
      { name: "shippings" },
      { name: "Tax settings" },
    ],
  },
];

// Discounts and Promotions
// Create Coupons
// Apply Discounts

// Analytics and Reports
// Sales Reports
// Customer Analytics

// Content Management
// Manage Pages

// User Management
// Admin Accounts

// Settings
// General Settings
// Payment and Shipping
// Tax Settings
