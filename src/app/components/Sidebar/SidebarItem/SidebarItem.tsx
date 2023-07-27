import { LowerCaseString, ToCamelCase } from "@/app/UtilityFunctions";
import { SetSelectedSection } from "@/redux/features/sidebar/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  List,
} from "@mui/material";
import React from "react";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { ColorPalete } from "@/app/CommonStyles";

const SidebarItem = (props: any) => {
  const { item } = props;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const selectedSection = useAppSelector(
    (state) => state?.sidebarReducer?.selectedSection
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <ListItemButton
        sx={{ py: 0.2 }}
        onClick={() => {
          handleClick();
        }}
      >
        <ListItemIcon sx={{ minWidth: 35 }}>
          {item?.parentIcon ? (
            item?.parentIcon
          ) : (
            <FiberManualRecordIcon
              sx={{ fontSize: 15, color: ColorPalete.primary }}
            />
          )}
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            fontSize: 15,
            fontWeight: "bold",
            color: "primary",
          }}
          primary={item?.parentName}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item?.subItems?.map((subItem: any, index: number) => {
            return (
              <ListItemButton
                key={index}
                sx={{ pl: 3.3, py: 0.1 }}
                onClick={() => {
                  dispatch(SetSelectedSection(ToCamelCase(subItem?.name)));
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      ToCamelCase(subItem?.name) === selectedSection
                        ? ColorPalete.primary_light
                        : "primary",
                    minWidth: 20,
                  }}
                >
                  {subItem?.icon ? (
                    subItem?.icon
                  ) : (
                    <FiberManualRecordIcon
                      sx={{
                        fontSize: 14,
                      }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: 14,
                    color:
                      ToCamelCase(subItem?.name) === selectedSection
                        ? ColorPalete.primary_light
                        : "primary",
                    fontWeight:
                      ToCamelCase(subItem?.name) === selectedSection
                        ? "bold"
                        : "",
                  }}
                  primary={subItem?.name}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

export default SidebarItem;
