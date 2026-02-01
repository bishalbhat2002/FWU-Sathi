import OverlayScreen from "../../layouts/OverlayScreen";
import Post from "./Post";
import { CommentWrite } from "./WriteComment";
import { Comment } from "./Comment";
import { Outlet, useNavigate } from "react-router-dom";

const CommentPost = () => {

  const navigate = useNavigate();

  return (
    // Overlays the Comment post infront of all...
    <OverlayScreen>

      {/* Comment Post Container.. */}
      <div className="h-9/10 max-w-130 w-full relative items-center bg-blue-200 p-2 rounded-sm overflow-y-auto hide-scrollbar">
        {/* Display the actual post first.... */}
        <Post commentBtnDisabled={true} />

        <Outlet />

        {/* Comment Showing container. This container shows the comments on the post.  */}
        <div className="mt-2 min-h-9/10">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>

        {/* Commment Box Container... It contains the comment input box .....*/}
        <CommentWrite />
      </div>
    </OverlayScreen>
  );
};

export default CommentPost;