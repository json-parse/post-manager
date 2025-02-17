import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllPostsQuery } from "../services/posts.ts";
import { setStatus } from "../redux/statusSlice.ts";
import { RootState } from "../redux/store.ts";
import PostList from "../components/PostList.tsx";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const status = t(useSelector((state: RootState) => state.status.value));

  const { data, error, isLoading } = useGetAllPostsQuery();

  useEffect(() => {
    if (error) {
      dispatch(setStatus("error"));
    } else if (isLoading) {
      dispatch(setStatus("loading"));
    } else if (data) {
      dispatch(setStatus("idle"));
    }
  }, [isLoading, error, data, dispatch]);

  return data ? <PostList posts={data} /> : <p>{status}</p>;
};

export default Home;
