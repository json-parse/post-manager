import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post, Comment } from "./types.ts";

// Define a service using a base URL and expected endpoints
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getPostById: builder.query<{ post: Post; comments: Comment[] }, number>({
      async queryFn(id, _queryApi, _extraOptions, fetchWithBQ) {
        // Fetch the post
        const postResult = await fetchWithBQ(`posts/${id}`);
        if (postResult.error) return { error: postResult.error };

        // Fetch the comments
        const commentsResult = await fetchWithBQ(`comments?postId=${id}`);
        if (commentsResult.error) return { error: commentsResult.error };

        // Combine the post and comments
        return {
          data: {
            post: postResult.data as Post,
            comments: commentsResult.data as Comment[],
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostByIdQuery } = postApi;
