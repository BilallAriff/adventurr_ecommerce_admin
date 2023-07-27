"use client";

import React from "react";
import { Grid, Box, Typography, Container } from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";
import MainContent from "../MainContent/MainContent";
import Image from "next/image";
import { styleFlexEerything } from "../CommonStyles";

const Dashboard = () => {
  return (
    <>
      <Grid container sx={{ border: "1px solid green", display: "flex" }}>
        <Grid sx={{ border: "1px solid orange" }} item sm={12}>
          <Box sx={{ backgroundColor: "#FFFFFF", maxHeight: 50, py: 0.3 }}>
            <Container sx={{ overflow: "hidden" }}>
              <Box>
                <Box
                  style={{
                    ...styleFlexEerything,
                    maxWidth: 225,
                  }}
                >
                  <img
                    style={{ width: "30px", marginRight: "4px" }}
                    src="/adventurr_logo_dark.png"
                  />
                  <Typography fontSize={25} color="primary" fontWeight="bold">
                    Adventurr Tech
                  </Typography>
                </Box>
              </Box>
            </Container>
          </Box>
        </Grid>
        <Grid
          item
          sm={3}
          sx={{
            minHeight: {
              md: 560,
            },
            mt: 0.5,
          }}
        >
          <Sidebar />
        </Grid>
        <Grid item sm={9}>
          <Container>
            <MainContent />
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
