import * as React from "react";
import { useGetPostByIdQuery } from "./services/posts.ts";

export default function App() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPostByIdQuery(1);
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = postApi.endpoints.getPostById.useQuery(1)

  return (
    <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </>
      ) : null}
    </div>
  );
}
