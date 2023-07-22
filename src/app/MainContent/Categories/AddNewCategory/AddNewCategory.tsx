import ThemeModal from "@/app/components/Modal/Modal";
import { useAddNewCategoryMutation } from "@/redux/services/categoryApi";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Field, Formik } from "formik";
import React from "react";

const AddNewCategory = () => {
  const [createCategory] = useAddNewCategoryMutation();
  return (
    <ThemeModal name="New Category">
      <Formik
        initialValues={{ name: "", description: "", image: "" }}
        onSubmit={(values) => {
          console.log(values);
          const formData = new FormData();
          formData.append("name", values?.name);
          formData.append("description", values?.name);
          formData.append("image", values?.image);
          // console.log(formData);
          createCategory(formData);
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
              <Field name="file">
                {({ field }: any) => (
                  <TextField
                    type="file"
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
          </form>
        )}
      </Formik>
    </ThemeModal>
  );
};

export default AddNewCategory;
