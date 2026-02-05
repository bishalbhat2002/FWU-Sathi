import OverlayScreen from "../../layouts/OverlayScreen";
import Post from "./Post";
import { CommentWrite } from "./WriteComment";
import { Comment } from "./Comment";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPostCommentsThunk } from "../../store/features/post/post.thunk";

const CommentPost = () => {

  const dispatch = useDispatch()
  const { postId } = useParams();
  const posts = useSelector((state) => state.postReducer.posts);
  const comments = useSelector((state) => state.postReducer.comments);
  const post = posts.find((post) => post._id === postId);

  useEffect(() => {
    dispatch(getPostCommentsThunk(postId));
  }, [postId]);


  return (
    // Overlays the Comment post infront of all...
    <OverlayScreen>
      {/* Comment Post Container.. */}
      <div className="max-h-[95%] max-w-130 w-full relative items-center bg-linear-to-b from-blue-200 to-orange-200 p-2 rounded-sm overflow-y-auto hide-scrollbar">
        {/* Display the actual post first.... */}
        {post && <Post post={post} commentBtnDisabled={true} />}

        <Outlet />

        {/* Comment Showing container. This container shows the comments on the post.  */}
         <div className="mt-2 max-h-9/10">
          {
            comments?.map(comment=>(
              <Comment key={comment?._id} comment={comment} />
            ))
          }
        </div>
  

        {/* Commment Box Container... It contains the comment input box .....*/}
        <CommentWrite />
      </div>
    </OverlayScreen>
  );
};

export default CommentPost;
