import type { IBorrow } from "@/types";
import { baseApi } from "./baseApi";

export interface Root {
  success: boolean;
  message: string;
  data: Daum[];
}

interface Daum {
  totalQuantity: number;
  book: Book;
}

interface Book {
  title: string;
  isbn: string;
}

export const BorrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBorrow: builder.mutation<IBorrow, IBorrow>({
      query: (data) => ({
        url: `/borrow`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrow"],
    }),

    getBorrows: builder.query<Root, void>({
      query: () => `/borrow`,
    }),
  }),
});

export const { useCreateBorrowMutation, useGetBorrowsQuery } = BorrowApi;
