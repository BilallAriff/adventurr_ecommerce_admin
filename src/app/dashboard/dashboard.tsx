"use client";

import React from "react";
import { Grid, Box, Typography, Container } from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";
import MainContent from "../MainContent/MainContent";

const Dashboard = () => {
  return (
    <>
      <Grid container>
        <Grid item sm={12}>
          <Box sx={{ backgroundColor: "black", padding: 1 }}>
            <Container>
              <Typography color={"white"} fontWeight="bold">
                Adventurr Tech
              </Typography>
            </Container>
          </Box>
        </Grid>
        <Grid item sm={3}>
          <Container>
            <Sidebar />
          </Container>
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
