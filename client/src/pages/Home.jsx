import { Outlet } from "react-router-dom";
import CreatePostButton from "../components/postComponents/CreatePostButton";
import ScrollPageLayout from "../layouts/ScrollPageLayout";
import AllPosts from "../components/postComponents/AllPosts";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPostsThunk } from "../store/features/post/post.thunk";

const Home = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPostsThunk({ page: 1 }));
  }, []);


  return (
    <ScrollPageLayout>
      <CreatePostButton />
      <Outlet />

      {/* Posts Here.......  */}

      <AllPosts />
    </ScrollPageLayout>
  );
};

export default Home;
