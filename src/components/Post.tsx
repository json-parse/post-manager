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

interface PostProps {
  handleSave: (post: Partial<PostType>) => void;
  handleDelete?: (postId: number) => void;
  post?: PostType;
}

const Post = ({ post, handleSave, handleDelete }: PostProps) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(!post);
  const [editablePost, setEditablePost] = useState<Partial<PostType>>(
    post ?? { title: "", body: "" }
  );

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

  const handleEdit = () => {
    if (isEdit) {
      handleSave(editablePost);
    }
    setIsEdit(!isEdit);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        {post && !isEdit ? (
          <>
            <Typography variant="h4">{post.title}</Typography>
            <Typography variant="body2">{post.body}</Typography>
          </>
        ) : (
          <>
            <input
              name="title"
              value={editablePost?.title}
              onChange={(e) =>
                setEditablePost({ ...editablePost, title: e.target.value })
              }
              placeholder="Title"
              required
            />
            <textarea
              name="body"
              value={editablePost?.body}
              onChange={(e) =>
                setEditablePost({ ...editablePost, body: e.target.value })
              }
              placeholder="Write your post here..."
              required
            />
          </>
        )}
        {comments && (
          <Typography sx={{ color: "text.secondary", mt: 1.5 }}>
            Comments ({comments?.length ?? 0})
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {post && handleDelete && (
          <Button variant="outlined" onClick={() => handleDelete(post.id)}>
            Delete
          </Button>
        )}
        <Button variant="contained" onClick={handleEdit}>
          {isEdit ? "Save" : "Edit"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
