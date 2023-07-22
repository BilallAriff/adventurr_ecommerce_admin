import DynamicModal from "@/app/components/DynamicModal/DynamicModal";
import ThemeModal from "@/app/components/Modal/Modal";
import { SetUpdateCategoryModal } from "@/redux/features/categories/categorySlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useAddNewCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/redux/services/categoryApi";
import { useUpdateSubCategoryMutation } from "@/redux/services/subCategoryApi";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { Field, Formik } from "formik";
import React from "react";

const UpdateSubCategory = () => {
  const [updateSubCategory] = useUpdateSubCategoryMutation();
  const selectedCategoryToUpdate = useAppSelector(
    (state) => state.categoryReducer.selectedCategoryToUpdate
  );
  const updateCategoryModal = useAppSelector(
    (state) => state.categoryReducer.updateCategoryModal
  );
  const { isLoading, data: parentCategories } = useGetCategoriesQuery(null);

  const dispatch = useAppDispatch();

  return (
    <DynamicModal
      open={updateCategoryModal}
      handleClose={() => dispatch(SetUpdateCategoryModal(false))}
      name="New Category"
    >
      <Formik
        initialValues={{
          id: selectedCategoryToUpdate?.id,
          name: selectedCategoryToUpdate?.name,
          description: selectedCategoryToUpdate?.description,
          image: null,
        }}
        onSubmit={(values: any) => {
          console.log(values);
          const formData = new FormData();
          formData.append("id", values?.id);
          formData.append("name", values?.name);
          formData.append("description", values?.description);
          formData.append("category_id", values?.category_id);
          if (values?.image !== null || undefined) {
            formData.append("image", values?.image);
          }

          updateSubCategory(formData);
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
              <Avatar src={selectedCategoryToUpdate?.image_url} />
              <TextField
                type="text"
                name="name"
                size="small"
                label="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {/* {errors.name && touched.name && (
                <Typography color="error">{errors.name}</Typography>
              )} */}
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
              {/* {errors.description && touched.description && (
                <Typography color="error">{errors.description}</Typography>
              )} */}
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
                    {...field}
                    size="small"
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
    </DynamicModal>
  );
};

export default UpdateSubCategory;
