import React from "react";

const Post = ({ post }) => (
  <>
    <h2>{post.title}</h2>
    <p>{post.body}</p>
    {/* <h4>Comments ({comments.length})</h4> */}
  </>
);

export default Post;
