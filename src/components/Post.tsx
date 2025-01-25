import React, { useEffect, useState } from "react";
import { useGetCommentsByPostIdQuery } from "../services/posts.ts";
import { useDispatch } from "react-redux";
import { setStatus } from "../redux/statusSlice.ts";
import { Post as PostType } from "../services/types.ts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";

interface PostProps {
  handleSave?: (post: Partial<PostType>) => void;
  handleDelete?: (postId: number) => void;
  post?: PostType;
}

const Post = ({ post, handleSave, handleDelete }: PostProps) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(!post);
  const [editablePost, setEditablePost] = useState<Partial<PostType>>(
    post ?? { title: "", body: "" }
  );
  const [errors, setErrors] = useState<
    { [key in keyof PostType]?: string } | undefined
  >(undefined);
  const {
    data: comments,
    error,
    isLoading,
  } = useGetCommentsByPostIdQuery(post?.id ?? 0);

  useEffect(() => {
    if (error) {
      dispatch(setStatus("error"));
    } else if (isLoading) {
      dispatch(setStatus("loading"));
    } else if (comments) {
      dispatch(setStatus("idle"));
    }
  }, [isLoading, error, comments, dispatch]);

  const validate = (key: keyof PostType) => {
    if (!editablePost[key]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: "This field is required",
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[key];
        return Object.keys(newErrors).length ? newErrors : undefined;
      });
    }
  };

  const handleEdit = () => {
    validate("title");
    validate("body");
    const canEdit =
      isEdit && handleSave && editablePost.title && editablePost.body;
    if (canEdit) {
      handleSave(editablePost);
    }
    if (post) {
      // toggle edit mode if editing an existing post
      setIsEdit(!isEdit);
    } else {
      // reset values if creating a new post
      setEditablePost({ title: "", body: "" });
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        {post && !isEdit ? (
          <>
            <Typography variant="h5" component="h3">
              {post.title}
            </Typography>
            <Typography variant="body2">{post.body}</Typography>
          </>
        ) : (
          <Grid container spacing={2} direction="column">
            <TextField
              label="Title"
              variant="outlined"
              multiline
              name="title"
              value={editablePost?.title}
              onChange={(e) =>
                setEditablePost({ ...editablePost, title: e.target.value })
              }
              onBlur={() => validate("title")}
              placeholder="Title"
              required
              error={Boolean(errors?.title)}
            />
            <TextField
              label="Text"
              variant="outlined"
              multiline
              name="body"
              value={editablePost?.body}
              onChange={(e) =>
                setEditablePost({ ...editablePost, body: e.target.value })
              }
              onBlur={() => validate("body")}
              placeholder="Write your post here..."
              required
              error={Boolean(errors?.body)}
            />
          </Grid>
        )}
        {post && (
          <Typography sx={{ color: "text.secondary", mt: 1.5 }}>
            Comments ({comments?.length ?? 0})
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
        {post && handleDelete && (
          <Button
            variant="outlined"
            disabled={isEdit}
            onClick={() => handleDelete(post.id)}
          >
            Delete
          </Button>
        )}
        {handleSave && (
          <Button
            variant="contained"
            onClick={handleEdit}
            disabled={Boolean(errors)}
          >
            {isEdit ? "Save" : "Edit"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
