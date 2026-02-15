import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import type { CleanlyType } from "../../types/cleanlyType";

export const homeApi = createApi({
    reducerPath: "homeApi",
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:3000/cleanly"}),
    tagTypes: ["homeApi"],
    endpoints: (build) => ({
        getTypes: build.query<CleanlyType, void>({
            query: () => "",
            providesTags: ["homeApi"],
        }),
        createBooking: build.mutation({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
            
        }),
        }),

})

export const {useGetTypesQuery, useCreateBookingMutation} = homeApi;