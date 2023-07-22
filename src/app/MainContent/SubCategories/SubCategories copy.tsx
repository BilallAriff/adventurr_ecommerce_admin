import React, { useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Avatar,
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
  useDeleteCategoryByIdMutation,
  useGetCategoriesQuery,
} from "@/redux/services/categoryApi";
import ThemeModal from "@/app/components/Modal/Modal";
import { Field, Formik } from "formik";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmationModal from "@/app/components/ConfirmationModal/ConfirmationModal";
import AddNewCategory from "./AddNewSubCategory/AddNewSubCategory";
import UpdateCategory from "./UpdateCateogory/UpdateCategory";
import { useAppDispatch } from "@/redux/hooks";
import {
  SetSelectedCategoryToUpdate,
  SetUpdateCategoryModal,
} from "@/redux/features/categories/categorySlice";
const Categories = () => {
  const { isLoading, isFetching, data, error } = useGetCategoriesQuery(null);
  const [createCategory] = useAddNewCategoryMutation();
  const [deleteCategory] = useDeleteCategoryByIdMutation();

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    console.log("categories", data);
  }, [data]);

  if (isLoading) {
    return <h1>Loading . . . .</h1>;
  }
  return (
    <>
      <UpdateCategory />
      <Grid container mt={2}>
        <Grid item sm={12} mb={2}>
          <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant={"h5"}>Categories Managment</Typography>
            <AddNewCategory />
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
                    <StyledTableCell align="center">
                      Description
                    </StyledTableCell>
                    <StyledTableCell align="center">Added By</StyledTableCell>
                    <StyledTableCell align="center">Image</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data !== undefined &&
                    data.map((category: any, index) => (
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
                          {category.user_id
                            ? category.user_id
                            : "Not Available"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Avatar
                            src={`http://localhost:3000/${category?.image_url}`}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Box>
                            <Button
                              sx={{ pading: 0 }}
                              onClick={() => {
                                dispatch(SetSelectedCategoryToUpdate(category));
                                dispatch(SetUpdateCategoryModal(true));
                              }}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              sx={{ pading: 0 }}
                              onClick={() => {
                                let deleteId = `${category.id}`;
                                deleteCategory({ id: deleteId });
                              }}
                            >
                              <DeleteForeverIcon />
                            </Button>
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Categories;
