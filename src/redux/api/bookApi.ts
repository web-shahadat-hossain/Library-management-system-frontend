import type { IBooks } from "@/types";
import { baseApi } from "./baseApi";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBook: builder.mutation<
      IBooks,
      {
        title: string;
        author: string;
        genre: string;
        copies: number;
        description: string;
        available: boolean;
      }
    >({
      query: (data) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    getBooks: builder.query<IBooks[], void>({
      query: () => "/books",
      transformResponse: (response: { data: IBooks[] }) => response.data,
      providesTags: ["Book"],
    }),
  }),
});

export const { useCreateBookMutation, useGetBooksQuery } = bookApi;
