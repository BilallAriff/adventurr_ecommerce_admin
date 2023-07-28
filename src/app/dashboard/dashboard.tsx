"use client";

import React from "react";
import { Grid, Box, Typography, Container } from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";
import MainContent from "../MainContent/MainContent";
import Image from "next/image";
import { styleFlexEverything } from "../CommonStyles";
import Header from "../components/Header/Header";
import AddNewProduct from "../MainContent/Products/AddNewProduct/AddNewProduct";
import UpdateProduct from "../MainContent/Products/UpdateProduct/UpdateProduct";

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
        <Grid item sm={9} padding={0.5}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
              width: "100%",
              height: "100%",
            }}
          >
            <MainContent />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
