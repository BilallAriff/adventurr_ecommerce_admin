import React, { useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useGetUsersQuery } from "@/redux/services/userApi";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useAddNewCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/services/categoryApi";
import ThemeModal from "@/app/components/Modal/Modal";
import { Formik } from "formik";

const Categories = () => {
  const { isLoading, isFetching, data, error } = useGetCategoriesQuery(null);
  const [
    createCategory,
    {
      isLoading: createCategoryLoading,
      isFetching: createCategoryIsFetching,
      data: createResponse,
      error: createCategoryError,
    },
  ] = useAddNewCategoryMutation();

  const wholdata = useGetCategoriesQuery(null);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  useEffect(() => {
    console.log("categories", data);
  }, [data]);

  if (isLoading) {
    return <h1>Loading . . . .</h1>;
  }
  return (
    <Grid container mt={2}>
      <Grid item sm={12} mb={2}>
        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant={"h5"}>Categories Managment</Typography>
          <ThemeModal name="New Category">
            <Formik
              initialValues={{ name: "", description: "" }}
              // validate={(values) => {
              //   const errors = {};
              //   if (!values.email) {
              //     errors.email = "Required";
              //   } else if (
              //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              //   ) {
              //     errors.email = "Invalid email address";
              //   }
              //   return errors;
              // }}
              // onSubmit={(values, { setSubmitting }) => {
              //   setTimeout(() => {
              //     alert(JSON.stringify(values, null, 2));
              //     setSubmitting(false);
              //   }, 400);
              // }}
              onSubmit={(values) => {
                console.log(values);
                createCategory(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                      type="text"
                      name="name"
                      size="small"
                      label="Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {errors.name && touched.name && errors.name}
                    <TextField
                      sx={{ marginTop: 1 }}
                      type="description"
                      name="description"
                      label="Description"
                      size="small"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                    {errors.description &&
                      touched.description &&
                      errors.description}
                  </Box>
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                  <button type="button" onClick={() => console.log()}>
                    log
                  </button>
                </form>
              )}
            </Formik>
          </ThemeModal>
        </Container>
      </Grid>
      <Grid item sm={12}>
        <Container>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="center">Added By</StyledTableCell>
                  <StyledTableCell align="center">Image</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data !== undefined &&
                  data.map((category, index) => (
                    <StyledTableRow key={category.name}>
                      <StyledTableCell
                        component="th"
                        align={"left"}
                        scope="category"
                      >
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {category.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {category.description}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {category.user_id ? category.user_id : "Not Available"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {category.image_url
                          ? category.image_url
                          : "Not Available"}
                      </StyledTableCell>
                      <StyledTableCell align="center">Actions</StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Categories;
