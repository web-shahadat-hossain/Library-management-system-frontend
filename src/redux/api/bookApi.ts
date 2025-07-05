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
    getBooks: builder.query<
      {
        data: IBooks[];
        meta: {
          total: number;
          page: number;
          limit: number;
        };
      },
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/books?page=${page}&limit=${limit}`,
      providesTags: ["Book"],
    }),

    deleteBook: builder.mutation<{ id: string }, string>({
      query(id) {
        return {
          url: `books/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetBooksQuery,
  useDeleteBookMutation,
} = bookApi;
