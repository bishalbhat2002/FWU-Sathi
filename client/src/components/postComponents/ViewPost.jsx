import OverlayScreen from "../../layouts/OverlayScreen";
import Post from "./Post";
import { CommentWrite } from "./WriteComment";
import { Comment } from "./Comment";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPostCommentsThunk } from "../../store/features/post/post.thunk";
import { RxCross2 } from "react-icons/rx";

const ViewPost = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const posts = useSelector((state) => state.postReducer.posts);
  const comments = useSelector((state) => state.postReducer.comments);
  const success = useSelector((state) => state.postReducer.success);
  const loader = useSelector((state) => state.postReducer.loader);
  const post = posts.find((post) => post._id === postId);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPostCommentsThunk(postId));
  }, [postId]);

  if (loader) {
    return (
      <OverlayScreen>
        <p className="bg-gray-900  Text-gray flex justify-center text-white font-bold px-5 py-2 rounded">
          Loading post. Please wait.....
        </p>
      </OverlayScreen>
    );
  }

  return (
    // Overlays the Comment post infront of all...
    <OverlayScreen>
      <button
        onClick={() => navigate("/")}
        className="rounded-full p-1 bg-gray-800 absolute border-2 border-white right-3 top-3 hover-scale"
      >
        <RxCross2 className="size-6 text-white hover-scale" />
      </button>
      
      {post ? (
        <div className="max-h-9/10 max-w-130 w-full relative items-center bg-linear-to-b from-violet-200 to-orange-200 p-2 rounded-sm overflow-y-auto hide-scrollbar">
          {/* Display the actual post first.... */}
          {post && <Post post={post} commentBtnDisabled={true} />}

          <Outlet />

          {/* Comment Showing container. This container shows the comments on the post.  */}
          <div className="mt-2 max-h-9/10">
            {comments?.map((comment) => (
              <Comment key={comment?._id} comment={comment} />
            ))}
          </div>

          {/* Commment Box Container... It contains the comment input box .....*/}
          <CommentWrite />
        </div>
      ) : (
        <p className="Text-gray bg-violet-600 text-white font-bold px-5 py-2 rounded">
          No post found For provided Id
        </p>
      )}
    </OverlayScreen>
  );
};

export default ViewPost;
