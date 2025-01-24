import React, { useEffect, useState } from "react";
import { useGetCommentsByPostIdQuery } from "../services/posts.ts";
import { useDispatch } from "react-redux";
import { setStatus } from "../redux/statusSlice.ts";
import { Post as PostType } from "../services/types.ts";

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
    <>
      {post && !isEdit ? (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
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
      {post && handleDelete && (
        <>
          <h4>Comments ({comments?.length ?? 0})</h4>
          <button type="button" onClick={() => handleDelete(post.id)}>
            Delete
          </button>
        </>
      )}
      <button type="button" onClick={handleEdit}>
        {isEdit ? "Save" : "Edit"}
      </button>
    </>
  );
};

export default Post;
