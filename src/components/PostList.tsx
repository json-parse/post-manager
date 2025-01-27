import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { useTranslation } from "react-i18next";
import Post from "./Post.tsx";
import { Post as PostType } from "../services/types.ts";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

interface PostListProps {
  posts: PostType[];
  handleUpdate?: (post: Partial<PostType>) => void;
  handleDelete?: (postId: number) => void;
}

const PostList = ({ posts, handleUpdate, handleDelete }: PostListProps) => {
  const { t } = useTranslation();
  const status = t(useSelector((state: RootState) => state.status.value));

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        {t("posts")}
      </Typography>
      {status && <p>{status}</p>}
      <Grid container spacing={2}>
        {posts.map((post, i) => (
          <Grid size={{ md: 6 }} key={i}>
            <Post
              post={post}
              handleSave={handleUpdate}
              handleDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PostList;
