import React from "react";
import { Box, PropTypes } from "@mui/material";

const ThemeContainer = (props: any) => {
  const { children } = props;
  return <Box>{children}</Box>;
};

export default ThemeContainer;
