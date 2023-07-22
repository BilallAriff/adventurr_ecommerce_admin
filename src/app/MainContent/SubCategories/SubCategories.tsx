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
import UpdateCategory from "./UpdateSubCateogory/UpdateSubCategory";
import { useAppDispatch } from "@/redux/hooks";
import {
  SetSelectedCategoryToUpdate,
  SetUpdateCategoryModal,
} from "@/redux/features/categories/categorySlice";
import {
  useAddNewSubCategoryMutation,
  useDeleteSubCategoryByIdMutation,
  useGetSubCategoriesQuery,
} from "@/redux/services/subCategoryApi";
import UpdateSubCategory from "./UpdateSubCateogory/UpdateSubCategory";
import AddNewSubCategory from "./AddNewSubCategory/AddNewSubCategory";
const Categories = () => {
  const { isLoading, isFetching, data, error } = useGetSubCategoriesQuery(null);
  const [createSubCategory] = useAddNewSubCategoryMutation();
  const [deleteSubCategory] = useDeleteSubCategoryByIdMutation();

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
      <UpdateSubCategory />
      <Grid container mt={2}>
        <Grid item sm={12} mb={2}>
          <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant={"h5"}>Sub Categories Managment</Typography>
            <AddNewSubCategory />
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
                    <StyledTableCell>Parent Category</StyledTableCell>
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
                          {category?.category?.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {category.user_id
                            ? category.user_id
                            : "Not Available"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Avatar
                            src={`http://localhost:3000/${category?.image}`}
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
                                deleteSubCategory({ id: deleteId });
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
