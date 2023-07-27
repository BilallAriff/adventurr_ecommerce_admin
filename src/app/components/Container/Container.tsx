import { Box } from "@mui/material";
import React, { FC, ReactNode } from "react";

const Container = (props: any) => {
  const { children, sx } = props;
  return (
    <Box
      sx={{
        paddingLeft: {
          md: 0.5,
        },
        borderRadius: "4px",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
