import OverlayScreen from "../../layouts/OverlayScreen";
import Post from "./Post";
import { CommentWrite } from "./WriteComment";
import { Comment } from "./Comment";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getPostCommentsThunk,
  getPostThunk,
} from "../../store/features/post/post.thunk";
import { RxCross2 } from "react-icons/rx";


const ViewPost = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const comments = useSelector((state) => state.postReducer.comments);
  const postSuccess = useSelector((state) => state.postReducer.postSuccess);
  const postLoader = useSelector((state) => state.postReducer.postLoader);
  const post = useSelector((state) => state.postReducer.post);
  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) return;

    dispatch(getPostCommentsThunk(postId));
    dispatch(getPostThunk(postId));

  }, [postId, dispatch]);

  if (postLoader) {
    return (
      <OverlayScreen>
        <p className="bg-gray-900  Text-gray flex justify-center text-white font-bold px-5 py-2 rounded">
          Loading post. Please wait.....
        </p>
      </OverlayScreen>
    );
  }

  if (!postLoader && !postSuccess) {
    return (
      <OverlayScreen>
        <div className="px-4 py-2 pb-3 bg-white border border-black/30 text-gray-600 text-4xl font-bold rounded">
          Post does't exist...
        </div>
      </OverlayScreen>
    );
  }

  console.log("from view:", post)


  return (
    // Overlays the Comment post infront of all...
    <OverlayScreen>
      <button
        onClick={() => navigate("/")}
        className="rounded-full p-1 bg-gray-800 absolute border-2 border-white right-3 top-3 hover-scale"
      >
        <RxCross2 className="size-6 text-white hover-scale" />
      </button>

      {post && (
        <div className="max-h-9/10 max-w-130 w-full relative items-center bg-linear-to-b from-violet-200 to-orange-200 p-2 rounded-sm overflow-y-auto hide-scrollbar">
          {/* Display the actual post first.... */}
          <Post post={post} commentBtnDisabled={true} />

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
      )}
    </OverlayScreen>
  );
};

export default ViewPost;
