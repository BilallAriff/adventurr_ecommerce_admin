import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type SubCategory = {
  id?: number;
  category_id: number;
  name: string;
  description?: string;
  user_id?: number;
  image?: string;
};

export const subCategoryApi = createApi({
  reducerPath: "subCategoryApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["Sub-Categories"],
  endpoints: (builder) => ({
    getSubCategories: builder.query<SubCategory[], null>({
      query: () => "sub-categories",
      providesTags: ["Sub-Categories"],
    }),
    addNewSubCategory: builder.mutation({
      query: (payload) => ({
        url: "sub-categories",
        method: "POST",
        body: payload,
        formData: true,
      }),
      invalidatesTags: ["Sub-Categories"],
    }),
    updateSubCategory: builder.mutation({
      query: (payload) => ({
        url: "sub-categories",
        method: "PUT",
        body: payload,
        formData: true,
      }),
      invalidatesTags: ["Sub-Categories"],
    }),
    deleteSubCategoryById: builder.mutation<SubCategory, { id: string }>({
      query: ({ id }) => ({
        url: `sub-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sub-Categories"],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useAddNewSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryByIdMutation,
} = subCategoryApi;
