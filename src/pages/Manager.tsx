import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../services/posts.ts";
import { setStatus } from "../redux/statusSlice.ts";
import Post from "../components/Post.tsx";
import { Post as PostType } from "../services/types.ts";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import PostList from "../components/PostList.tsx";

const Manager = ({ user }) => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetPostsByUserIdQuery(user.id);
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
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

  const handleCreate = async (formData) => {
    const post = {
      userId: user.id,
      title: formData.title,
      body: formData.body,
    };
    const createdPost = await createPost(post);
    if (createdPost.data) {
      setPosts([createdPost.data, ...posts]);
    }
  };

  const handleUpdate = async (post) => {
    const updatedPost = await updatePost(post);
    if (updatedPost.data) {
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === post.id ? updatedPost.data : p))
      );
    }
  };

  const handleDelete = async (postId) => {
    const deletedPost = await deletePost(postId);
    if (deletedPost.data && Object.keys(deletedPost.data).length === 0) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    }
  };

  if (posts)
    return (
      <Grid container spacing={4} direction="column">
        <Grid>
          <Typography variant="h4" component="h2" gutterBottom>
            Post something new, {user.username}!
          </Typography>
          <Grid size={{ md: 6 }}>
            <Post handleSave={handleCreate} />
          </Grid>
        </Grid>
        <Grid>
          <PostList
            posts={posts}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </Grid>
      </Grid>
    );
  return null;
};

export default Manager;
