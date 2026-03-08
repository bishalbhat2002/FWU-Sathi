import { useRef } from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const AllPosts = () => {
  const posts = useSelector((state) => state.postReducer.posts);
  const postsRef = useRef([]); // This will store refs for all post elements
  postsRef.current = []; // reset on every render to avoid duplicate refs

  const addToRefs = (el) => {
    if (el && !postsRef.current.includes(el)) {
      postsRef.current.push(el);
    }
  };

  useGSAP(() => {
    gsap.from(postsRef.current, {
      opacity: 0,
      y: 60,
      duration: 0.6,
      stagger: 0.3, // animate posts one after another
      ease: "power2.out",
    });
  }, []);

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
        <Post key={post._id} post={post} ref={addToRefs} />
      ))}
    </div>
  );
};

export default AllPosts;
