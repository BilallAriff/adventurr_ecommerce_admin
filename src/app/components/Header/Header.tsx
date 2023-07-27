import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import Container from "../Container/Container";
import { styleFlexEverything } from "@/app/CommonStyles";

const Header: FC<any> = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Container sx={{ backgroundColor: "#ffffff" }}>
        <Box sx={{ py: 0.8 }}>
          <Box
            style={{
              ...styleFlexEverything,
              maxWidth: 225,
            }}
          >
            <img
              style={{ width: "30px", marginRight: "4px" }}
              src="/adventurr_logo_dark.png"
            />
            <Typography fontSize={20} color="primary" fontWeight="bold">
              Adventurr Tech
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
