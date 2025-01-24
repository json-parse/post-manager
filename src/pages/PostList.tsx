import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} from "../services/posts.ts";
import { setStatus } from "../redux/statusSlice.ts";
import { RootState } from "../redux/store.ts";
import Post from "../components/Post.tsx";
import { Post as PostType } from "../services/types.ts";

const PostList = ({ userId }) => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.status.value);
  const { data, error, isLoading } = useGetPostsByUserIdQuery(userId);
  const [createPost] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    if (error) {
      dispatch(setStatus("error"));
    } else {
      dispatch(setStatus("loading"));
    }
    if (data) {
      setPosts(data);
    }
  }, [isLoading, error, data, dispatch]);

  const onPublish = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const post = {
      userId,
      title: formData.get("title") as string,
      body: formData.get("body") as string,
    };
    const createdPost = await createPost(post);
    if (createdPost.data) {
      setPosts([createdPost.data, ...posts]);
    }
  };

  const onDelete = async (postId) => {
    const deletedPost = await deletePost(postId);
    if (deletedPost.data && Object.keys(deletedPost.data).length === 0) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    }
  };

  if (posts)
    return (
      <>
        <form onSubmit={onPublish}>
          <input name="title" placeholder="Title" required />
          <textarea
            name="body"
            placeholder="Write your post here..."
            required
          />
          <button type="submit">Publish</button>
        </form>
        {status && <p>{status}</p>}
        {posts.map((post, i) => (
          <Post key={i} post={post} onDelete={onDelete} />
        ))}
      </>
    );
  return null;
};

export default PostList;
