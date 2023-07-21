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
        url: "http://localhost:3000/categories",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useAddNewCategoryMutation,
} = categoryApi;
