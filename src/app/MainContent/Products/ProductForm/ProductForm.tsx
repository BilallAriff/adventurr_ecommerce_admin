import ThemeModal from "@/app/components/Modal/Modal";
import { Form, Formik } from "formik";
import {
  Box,
  TextField,
  Typography,
  Autocomplete,
  Button,
  Grid,
} from "@mui/material";
import React from "react";
import { useGetSubCategoriesQuery } from "@/redux/services/subCategoryApi";
import {
  useAddNewProductMutation,
  useDeleteProductByIdMutation,
} from "@/redux/services/productApi";
import Modal from "@/app/components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SetProductFormModalState } from "@/redux/features/product/productSlice";
import TestTextField from "../../../components/TextField/TextField";
import DragAndDropFileUpload from "@/app/components/DragAndDropFileUpload/DragAndDropFileUpload";
import MasonryGallery from "@/app/components/MansonaryGallary/MansonaryGallary";

const ProductForm = () => {
  const { data: subCategories, isLoading: subCategoriesLoading } =
    useGetSubCategoriesQuery(null);

  const [addNewProduct, { isLoading: addProductLoading }] =
    useAddNewProductMutation();

  const productFormModalState = useAppSelector(
    (state) => state.productReducer.productFormModalState
  );

  const dispatch = useAppDispatch();

  return (
    <Modal
      open={productFormModalState}
      onOpen={() => dispatch(SetProductFormModalState(true))}
      onClose={() => dispatch(SetProductFormModalState(false))}
      name="New Product"
    >
      <Grid maxHeight={550} maxWidth={1100} container padding={1}>
        <Grid
          item
          md={12}
          display={"flex"}
          justifyContent={"space-between"}
          borderBottom={"1px solid #F1F1F1"}
        >
          <Typography variant="h4" fontWeight={"bold"}>
            Products
          </Typography>
          <Button sx={{ textTransform: "capitalize" }}>
            Upload Images/Videos
          </Button>
        </Grid>
        <Grid md={6.5} spacing={0.5} container>
          <Grid item md={12}>
            <TestTextField fieldLabel={"Name"} />
          </Grid>
          <Grid item md={6}>
            <TestTextField fieldLabel={"Price in USD"} />
          </Grid>
          <Grid item md={6}>
            <TestTextField fieldLabel={"Quantity"} />
          </Grid>
          <Grid item md={12}>
            <TestTextField fieldLabel={"Category"} />
          </Grid>
          <Grid item md={12}>
            <TestTextField
              multiline
              rows={4}
              fieldLabel={"Short description"}
            />
          </Grid>
          <Grid item md={12}>
            <Button sx={{ border: "2px solid #000722" }} variant="outlined">
              Add complete description
            </Button>
          </Grid>
        </Grid>

        <Grid item md={5.5}>
          <DragAndDropFileUpload
            onImagesChange={(images) => console.log(images)}
          />
        </Grid>
        <Grid item md={12}>
          <Box mt={0.5}>
            <Button variant="contained" sx={{ mr: 0.5 }}>
              Save Product
            </Button>
            <Button variant="outlined" sx={{ border: "2px solid #000722" }}>
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
      {/* <Box
        sx={{
          padding: 0.5,
          maxHeight: 500,
          minWidth: 700,
        }}
      >
        <Formik
          initialValues={{
            name: "aa",
            short_description: "aa",
            long_description: "aa",
            price_usd: "12",
            category_id: "",
            stock: "12",
          }}
          onSubmit={(values: any) => {
            const formData = new FormData();
            // Object.keys(values).map((key: any, index) => {
            //   formData.append(key, values[key]);
            // });
            // console.log(values);
            // formData.append("images[]", values?.images);
            Object.keys(values).forEach((key) => {
              if (key === "images") {
                Array.from(values[key]).forEach((image) => {
                  formData.append("images", image);
                });
              } else {
                formData.append(key, values[key]);
              }
            });
            addNewProduct(formData);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <TestTextField fieldLabel={"Testing test field"} />
              <Box my={2}>
                <TextField
                  name="name"
                  type="text"
                  size="small"
                  fullWidth
                  label="Name"
                  onChange={(e) => setFieldValue("name", e?.target?.value)}
                />
              </Box>
              <Box my={2}>
                <TextField
                  name="short_description"
                  type="text"
                  size="small"
                  fullWidth
                  label="short_description"
                  onChange={(e) =>
                    setFieldValue("short_description", e?.target?.value)
                  }
                />
              </Box>
              <Box my={2}>
                <TextField
                  name="long_description"
                  type="text"
                  size="small"
                  fullWidth
                  label="long_description"
                  onChange={(e) =>
                    setFieldValue("long_description", e?.target?.value)
                  }
                />
              </Box>
              <Box my={2}>
                <TextField
                  name="price"
                  type="text"
                  size="small"
                  fullWidth
                  label="price"
                  onChange={(e) => setFieldValue("price", e?.target?.value)}
                />
              </Box>
              <Box my={2}>
                <TextField
                  name="stock"
                  type="text"
                  size="small"
                  fullWidth
                  label="stock"
                  onChange={(e) => setFieldValue("stock", e?.target?.value)}
                />
              </Box>
              <Box my={2}>
                <TextField
                  name="images"
                  inputProps={{
                    multiple: true,
                  }}
                  type="file"
                  size="small"
                  fullWidth
                  label="Images"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    // console.log(e?.currentTarget?.files)
                    setFieldValue("images", e?.currentTarget?.files)
                  }
                />
              </Box>
              <Box my={2}>
                <Autocomplete
                  options={subCategories}
                  renderOption={(props, option) => {
                    return <Box {...props}>{option?.name}</Box>;
                  }}
                  getOptionLabel={(option) => option?.name}
                  onChange={(event, value) => {
                    setFieldValue("category_id", value?.id);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Category" size="small" />
                  )}
                />
              </Box>
              <Box>
                <Button type="submit">Save</Button>
                <Button type="button" onClick={() => console.log(values)}>
                  Log
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box> */}
    </Modal>
  );
};

export default ProductForm;
