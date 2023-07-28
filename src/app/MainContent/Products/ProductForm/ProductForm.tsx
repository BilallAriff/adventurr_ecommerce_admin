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
import React, { ChangeEvent, useEffect, useState } from "react";
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

const ProductForm = () => {
  const { data: subCategories, isLoading: subCategoriesLoading } =
    useGetSubCategoriesQuery(null);

  const [addNewProduct, { isLoading: addProductLoading }] =
    useAddNewProductMutation();

  const productFormModalState = useAppSelector(
    (state) => state.productReducer.productFormModalState
  );

  const [initialValues, setInitialValues] = useState<Product>({
    name: "",
    category_id: 0,
    short_description: "",
    long_description: "",
    quantity: 0,
    price_usd: 0,
  });
  const [productImages, setProductImages] = useState<ImageData[]>([]);

  const dispatch = useAppDispatch();

  interface Product {
    name: string;
    category_id: number;
    short_description?: string;
    long_description?: string;
    quantity: number;
    price_usd: number;
  }

  // Function to convert a data URL to a Blob
  function dataURLtoBlob(dataURL: any) {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const handleSubmit = (values: any) => {
    const formData = new FormData();

    Object.keys(values).map((key, index) => {
      formData.append(key, values[key]);
    });
    productImages.forEach((image: any) => {
      console.log("image =>", image.url);
      formData.append("images", dataURLtoBlob(image.url));
    });
    // if (productImages.length !== 0) {
    //   productImages.forEach((image) => {
    //     formData.append("images", image);
    //   });
    // }
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    addNewProduct(formData);
  };

  // useEffect(() => {
  //   setInitialValues({});
  // }, []);

  return (
    <Modal
      open={productFormModalState}
      onOpen={() => dispatch(SetProductFormModalState(true))}
      onClose={() => dispatch(SetProductFormModalState(false))}
      name="New Product"
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => {
          return (
            <Form>
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
                    <TestTextField
                      name={"name"}
                      values={values.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("name", e?.target?.value)
                      }
                      fieldLabel={"Name"}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TestTextField
                      name={"price_usd"}
                      values={values.price_usd}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("price_usd", e?.target?.value)
                      }
                      fieldLabel={"Price in USD"}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TestTextField
                      name={"quantity"}
                      values={values.quantity}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("quantity", e?.target?.value)
                      }
                      fieldLabel={"Quantity"}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TestTextField
                      name={"category_id"}
                      values={values.category_id}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("category_id", e?.target?.value)
                      }
                      fieldLabel={"Category"}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TestTextField
                      name={"short_description"}
                      values={values.short_description}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("short_description", e?.target?.value)
                      }
                      multiline
                      rows={4}
                      fieldLabel={"Short description"}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <Button
                      type="button"
                      sx={{ border: "2px solid #000722" }}
                      variant="outlined"
                    >
                      Add complete description
                    </Button>
                  </Grid>
                </Grid>

                <Grid item md={5.5}>
                  <DragAndDropFileUpload
                    onImagesChange={(images: any) => {
                      setProductImages(images);
                      // setFieldValue("images", images);
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <Box mt={0.5}>
                    <Button type="submit" variant="contained" sx={{ mr: 0.5 }}>
                      Save Product
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        dispatch(SetProductFormModalState(false));
                      }}
                      variant="outlined"
                      sx={{ border: "2px solid #000722" }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
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
