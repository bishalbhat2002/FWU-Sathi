import Post from "./Post";
import { useSelector } from "react-redux";;

const AllPosts = () => {

  const posts = useSelector((state) => state.postReducer.posts);

  return (
    <div className="container mx-auto flex flex-col gap-4 mt-3">
      {/* Check if any posts exists or not... If no posts exists. show No post exist..  */}
      {posts?.length === 0 && (
        <div className="flex justify-center items-center w-full h-[40vh]">
          <h2 className="text-gray-500 font-normal text-center">
            No Posts exist... create one!!
          </h2>
        </div>
      )}
      {/* Show all the posts if they exists. */}
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))
      }
    </div>
  );
};

export default AllPosts;
