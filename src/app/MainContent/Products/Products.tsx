import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Grid,
  Box,
  Typography,
  Container,
  Tooltip,
  Button,
  CircularProgress,
  styled,
} from "@mui/material";
import {
  useDeleteProductByIdMutation,
  useGetproductsQuery,
} from "@/redux/services/productApi";
import AddNewProduct from "./AddNewProduct/AddNewProduct";
import {
  SetProductFormModalState,
  SetSelectedProductToUpdate,
} from "@/redux/features/product/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import UpdateProduct from "./UpdateProduct/UpdateProduct";
import { ColorPalete, styleFlexEverything } from "@/app/CommonStyles";
import ProductForm from "./ProductForm/ProductForm";
import ProductActions from "./UpdateProduct/ProductActions/ProductActions";

export default function Products() {
  const { isLoading: productsLoading, data } = useGetproductsQuery(null);
  const [deleteProductById, { isLoading: productDeleteLoading }] =
    useDeleteProductByIdMutation();

  const dispatch = useAppDispatch();

  // ================ Styled Components =================
  const StyledTableContainer = styled(TableContainer)({
    width: "100%",
    // border: "1px solid red",
    borderRadius: "4px",
    overflow: "hidden",
  });

  const StyledTableHead = styled(TableHead)({});
  const StyledTableHeadCell = styled(TableCell)({
    // border: "1px solid red",
    padding: 5,
    backgroundColor: ColorPalete.primary,
    color: ColorPalete.pure_white,
    textAlign: "center",
  });
  const StyledTableCell = styled(TableCell)({
    // border: "1px solid red",
    fontWeight: 500,
    padding: 5,
    backgroundColor: ColorPalete.pure_white,
    color: ColorPalete.primary,
    textAlign: "center",
  });
  const StyledTableRow = styled(TableRow)({});
  const StyledTableBody = styled(TableBody)({});

  if (productsLoading) {
    return (
      <Box
        sx={{
          ...styleFlexEverything,
          // border: "1px solid red",
          height: "100%",
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Grid container padding={0.5}>
      <Grid item md={12} mb={0.5}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            color={ColorPalete.primary_light}
          >
            Products
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => dispatch(SetProductFormModalState(true))}
          >
            Add New Product
          </Button>
          <ProductForm />
          {/* <AddNewProduct /> */}
          {/* <UpdateProduct /> */}
        </Box>
      </Grid>
      <Grid item md={12}>
        <StyledTableContainer>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableHeadCell align="right">
                  Thumbnail
                </StyledTableHeadCell>
                <StyledTableHeadCell align="right">Name</StyledTableHeadCell>
                <StyledTableHeadCell align="right">
                  Price USD
                </StyledTableHeadCell>
                <StyledTableHeadCell align="right">
                  Quantity
                </StyledTableHeadCell>
                <StyledTableHeadCell align="right">
                  Short description
                </StyledTableHeadCell>
                <StyledTableHeadCell align="right">
                  Long description
                </StyledTableHeadCell>
                <StyledTableHeadCell align="right">
                  Category
                </StyledTableHeadCell>
                <StyledTableHeadCell align="right">User</StyledTableHeadCell>
                <StyledTableHeadCell align="right">
                  Action(s)
                </StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((product: any, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell align="right">
                        <Avatar
                          src={`http://localhost:3000/${
                            product.images.length !== 0 &&
                            product.images[0].image_url
                          }`}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product?.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product?.price_usd}
                      </StyledTableCell>{" "}
                      <StyledTableCell align="right">
                        {product?.stock?.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Tooltip title={product?.short_description}>
                          <Typography sx={{ color: ColorPalete.primary }}>
                            {product?.short_description}
                          </Typography>
                        </Tooltip>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {" "}
                        <Tooltip title={product?.long_description}>
                          <Typography>{product?.long_description}</Typography>
                        </Tooltip>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product?.category?.name}
                      </StyledTableCell>
                      <StyledTableCell>{"No available"}</StyledTableCell>
                      <StyledTableCell>
                        {/* <ProductActions /> */}
                        <Button
                          sx={{ padding: 0, minWidth: 10 }}
                          onClick={() => {
                            deleteProductById(`${product?.id}`);
                          }}
                        >
                          <DeleteForeverIcon />
                        </Button>
                        <Button
                          sx={{ padding: 0, minWidth: 10 }}
                          onClick={() => {
                            dispatch(SetSelectedProductToUpdate(product));
                            // dispatch(SetProductUpdateModalState(true));
                          }}
                        >
                          <EditIcon />
                        </Button>
                      </StyledTableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Grid>
    </Grid>
  );
}
