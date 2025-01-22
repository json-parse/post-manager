import React from "react";
import { useGetPostByIdQuery } from "./services/posts.ts";

export default function App() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error } = useGetPostByIdQuery(1);

  if (!data) return <p>Loading...</p>;
  if (error) return <p>Oh no, there was an error</p>;

  const { post, comments } = data;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.name}</p>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
