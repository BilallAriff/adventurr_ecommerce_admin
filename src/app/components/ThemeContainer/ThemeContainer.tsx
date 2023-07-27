import React from "react";
import { Box, PropTypes } from "@mui/material";

const ThemeContainer = (props: any) => {
  const { children } = props;
  return <Box sx={{ border: "1px solid orange" }}>{children}</Box>;
};

export default ThemeContainer;
