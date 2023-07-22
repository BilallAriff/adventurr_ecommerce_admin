import ThemeModal from "@/app/components/Modal/Modal";
import {
  useAddNewCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/services/categoryApi";
import { useAddNewSubCategoryMutation } from "@/redux/services/subCategoryApi";
import {
  Box,
  Button,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { Field, Formik } from "formik";
import React from "react";

const AddNewSubCategory = () => {
  const [createSubCategory] = useAddNewSubCategoryMutation();
  const { isLoading, data: parentCategories } = useGetCategoriesQuery(null);
  let options: any = [];
  return (
    <ThemeModal name="New Category">
      <Formik
        initialValues={{
          name: "",
          description: "",
          image: "",
          category_id: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          const formData = new FormData();
          formData.append("name", values?.name);
          formData.append("description", values?.description);
          formData.append("image", values?.image);
          formData.append("category_id", values?.category_id);
          // console.log(formData);
          createSubCategory(formData);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
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
              {errors.name && touched.name && (
                <Typography color="error">{errors.name}</Typography>
              )}
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
              {errors.description && touched.description && (
                <Typography color="error">{errors.description}</Typography>
              )}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={parentCategories}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option?.name}
                  </Box>
                )}
                getOptionLabel={(option) => option?.name}
                onChange={(event, value) => {
                  setFieldValue("category_id", value?.id);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Parent Category" size="small" />
                )}
              />
              <Field name="file">
                {({ field }: any) => (
                  <TextField
                    type="file"
                    size="small"
                    {...field}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue(
                        "image",
                        event.currentTarget.files?.[0] || null
                      );
                    }}
                  />
                )}
              </Field>
            </Box>
            <Button type="submit">Submit</Button>
            <button type="button" onClick={() => console.log(parentCategories)}>
              show data
            </button>
          </form>
        )}
      </Formik>
    </ThemeModal>
  );
};

export default AddNewSubCategory;
