import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User, Post, Comment } from "./types.ts";

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
    getCommentsByPostId: builder.query<Comment[], number>({
      query: (postId) => `comments?postId=${postId}`,
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
  useGetCommentsByPostIdQuery,
  useCreatePostMutation,
} = postApi;
