import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Product = {
  id: number;
  name: string;
  short_description?: string;
  long_description?: string;
  category_id?: number;
  stock_id?: number;
  price_usd?: number;
  stock: any;
  category: any;
  images: Array<any>;
};

export const productApi = createApi({
  reducerPath: "productApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getproducts: builder.query<Product[], null>({
      query: () => "products",
      providesTags: ["Products"],
    }),
    getProductById: builder.query<Product, { id: string }>({
      query: ({ id }) => `products/${id}`,
    }),
    addNewProduct: builder.mutation({
      query: (payload) => ({
        url: "/products",
        method: "POST",
        body: payload,
        // headers: {
        //   "Content-type": "application/json; charset=UTF-8",
        // },
        formData: true,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProductById: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (payload) => ({
        url: `/products`,
        method: "PUT",
        body: payload,
        // headers: {
        //   "Content-type": "application/json; charset=UTF-8",
        // },
        formData: true,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetproductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useAddNewProductMutation,
  useDeleteProductByIdMutation,
} = productApi;
