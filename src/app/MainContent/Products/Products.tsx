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
import {
  Avatar,
  Grid,
  Box,
  Typography,
  Container,
  Tooltip,
  Button,
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
import { ColorPalete } from "@/app/CommonStyles";
import ProductForm from "./ProductForm/ProductForm";

export default function Products() {
  const { isLoading: productsLoading, data } = useGetproductsQuery(null);
  const [deleteProductById, { isLoading: productDeleteLoading }] =
    useDeleteProductByIdMutation();

  const dispatch = useAppDispatch();

  if (productsLoading) {
    return <h4>Loading . . . </h4>;
  }
  return (
    <Grid container>
      <Grid item md={12} padding={0.5} sx={{ border: "1px solid red" }}>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="right">Thumbnail</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price USD</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Short description</TableCell>
                <TableCell align="right">Long description</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Action(s)</TableCell>
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
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="right">
                        <Avatar
                          src={`http://localhost:3000/${
                            product.images.length !== 0 &&
                            product.images[0].image_url
                          }`}
                        />
                      </TableCell>
                      <TableCell align="right">{product?.name}</TableCell>
                      <TableCell align="right">
                        {product?.price_usd}
                      </TableCell>{" "}
                      <TableCell align="right">
                        {product?.stock?.quantity}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title={product?.short_description}>
                          <Typography>{product?.short_description}</Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <Tooltip title={product?.long_description}>
                          <Typography>{product?.long_description}</Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        {product?.category?.name}
                      </TableCell>
                      <TableCell>{"No available"}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            deleteProductById(`${product?.id}`);
                          }}
                        >
                          <DeleteForeverIcon />
                        </Button>
                        <Button
                          onClick={() => {
                            dispatch(SetSelectedProductToUpdate(product));
                            // dispatch(SetProductUpdateModalState(true));
                          }}
                        >
                          <EditIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
