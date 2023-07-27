import ThemeModal from "@/app/components/Modal/Modal";
import { Form, Formik } from "formik";
import {
  Box,
  TextField,
  Typography,
  Autocomplete,
  Button,
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
      <Box padding={0.5}>
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
      </Box>
    </Modal>
  );
};

export default ProductForm;
