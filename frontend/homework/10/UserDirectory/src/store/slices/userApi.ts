import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UsersResponse } from "../types/userResponse";
import type { User } from "../types/user";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_UVITE_API_BASE_URL ?? "https://dummyjson.com"}),
    tagTypes: ["Users"],
    endpoints: (build) => ({
        getUsers: build.query<UsersResponse, void>({
            query: () => "/users",
            providesTags: ["Users"],
        }),

        addUser: build.mutation<UsersResponse, Partial<User>>({
            query: (body) => ({
                url: "/users/add",
                method: "POST",
                body,

            }),
            invalidatesTags: ["Users"],
        }),

        getUserById: build.query<User, number>({
            query: (id) => `/users/${id}`,
            providesTags:(result,error,id)=>[{type:"User",id}]
        }),
    }),

})

export const {useGetUsersQuery, useAddUserMutation, useGetUserByIdQuery} = usersApi
