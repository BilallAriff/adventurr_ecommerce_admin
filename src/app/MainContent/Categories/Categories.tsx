import React from "react";
import { Grid, Container, Typography, Button } from "@mui/material";

const Categories = () => {
  return (
    <Grid container mt={2}>
      <Grid item sm={12}>
        <Container>
          <Typography variant={"h5"}>Categories Managment</Typography>
        </Container>
      </Grid>
      <Grid item sm={12}>
        <Container>
          <Typography variant="h5">body</Typography>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Categories;
