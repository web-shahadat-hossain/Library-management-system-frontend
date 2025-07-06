import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-system-phi-six.vercel.app/api",
  }),
  tagTypes: ["Book", "Borrow"],
  endpoints: () => ({}),
});
