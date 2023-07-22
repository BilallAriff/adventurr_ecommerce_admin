import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Category = {
  id: number;
  name: string;
  description: string;
  user_id: number | null;
  image_url: number | null;
  createdAt: string;
  updatedAt: string;
};

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], null>({
      query: () => "categories",
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query<Category, { id: string }>({
      query: ({ id }) => `categories/${id}`,
    }),
    addNewCategory: builder.mutation({
      query: (payload) => ({
        url: "/categories",
        method: "POST",
        body: payload,
        // headers: {
        //   "Content-type": "application/json; charset=UTF-8",
        // },
        formData: true,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategoryById: builder.mutation<Category, { id: string }>({
      query: ({ id }) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: (payload) => ({
        url: `/categories`,
        method: "PUT",
        body: payload,
        // headers: {
        //   "Content-type": "application/json; charset=UTF-8",
        // },
        formData: true,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useAddNewCategoryMutation,
  useDeleteCategoryByIdMutation,
  useUpdateCategoryMutation,
} = categoryApi;
