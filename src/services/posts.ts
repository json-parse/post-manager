import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User, Post } from "./types.ts";

// Define a service using a base URL and expected endpoints
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getUserByUsername: builder.query<User[], string>({
      query: (username) => `users?username=${username}`,
    }),
    getPostsByUserId: builder.query<Post[], number>({
      query: (userId) => `posts?userId=${userId}`,
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (post) => ({
        url: "posts",
        method: "POST",
        body: post,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserByUsernameQuery,
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
} = postApi;
