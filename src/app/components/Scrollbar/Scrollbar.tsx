import React from "react";
import { Box } from "@mui/material";

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

export default Scrollbar;
