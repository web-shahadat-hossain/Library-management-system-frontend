import type { IBorrow } from "@/types";
import { baseApi } from "./baseApi";

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
    // getBooks: builder.query<
    //   {
    //     data: IBooks[];

    //   },
    //   { page: number; limit: number }
    // >({
    //   query: ({ page, limit }) => `/books?page=${page}&limit=${limit}`,
    //   providesTags: ["Book"],
    // }),
  }),
});

export const { useCreateBorrowMutation } = BorrowApi;
