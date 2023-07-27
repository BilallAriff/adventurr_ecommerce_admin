"use client";

import React from "react";
import { Grid, Box, Typography, Container } from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";
import MainContent from "../MainContent/MainContent";
import Image from "next/image";
import { styleFlexEerything } from "../CommonStyles";
import Header from "../components/Header/Header";

const Dashboard = () => {
  return (
    <>
      <Grid container sx={{ display: "flex" }}>
        <Grid item sm={12}>
          <Header />
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
