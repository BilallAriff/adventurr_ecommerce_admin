import React from "react";
import { Box, Typography, TextField as MuiTextField } from "@mui/material";
import { styleFlexEverything } from "@/app/CommonStyles";

const TestTextField = (props: any) => {
  const { fieldLabel } = props;
  return (
    <>
      <Box
        sx={{
          ...styleFlexEverything,
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
          width: "100%",
        }}
      >
        <Typography
          textAlign={"center"}
          fontWeight={"bold"}
          mt={0.5}
          mb={0.2}
          fontSize={14}
        >
          {fieldLabel}
        </Typography>
        <MuiTextField fullWidth size={"small"} {...props} />
      </Box>
    </>
  );
};

export default TestTextField;
