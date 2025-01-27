import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllPostsQuery } from "../services/posts.ts";
import { setStatus } from "../redux/statusSlice.ts";
import { RootState } from "../redux/store.ts";
import PostList from "../components/PostList.tsx";
import { useLocation } from "react-router-dom";
import i18n from "../i18n.ts";

const Home = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.status.value);
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const { data, error, isLoading } = useGetAllPostsQuery();

  useEffect(() => {
    if (path === "en" || path === "es") {
      i18n.changeLanguage(path);
    } else {
      i18n.changeLanguage("es");
    }

    if (error) {
      dispatch(setStatus("error"));
    } else if (isLoading) {
      dispatch(setStatus("loading"));
    } else if (data) {
      dispatch(setStatus("idle"));
    }
  }, [isLoading, error, data, dispatch, location, path]);

  return data ? <PostList posts={data} /> : <p>{status}</p>;
};

export default Home;
