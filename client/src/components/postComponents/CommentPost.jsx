import { useState } from "react";
import OverlayScreen from "../../layouts/OverlayScreen";
import { RiSendPlaneFill } from "react-icons/ri";
import Post from "./Post";
import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { Link } from "react-router-dom";

const CommentPost = () => {
  return (
    // Overlays the Comment post infront of all...
    <OverlayScreen >
      {/* Comment Post Container.. */}
      <div className="h-9/10 flex-col justify-center items-center bg-zinc-300 ml-3 p-2 rounded-sm overflow-y-auto hide-scrollbar">
        {/* Display the actual post first.... */}
        <Post comment={true} />

        {/* Commment Box Container... It contains the comment input box .....*/}
          <CommentWrite />

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
      </div>
    </OverlayScreen>
  );
};

export default CommentPost;


function CommentWrite(){
const [comment, setComment] = useState("")

function handleComment(){
  alert("Comment Send: ", comment);
}

  return (
    <form onSubmit={handleComment} className="mx-auto w-full mt-1 bg-zinc-100 flex justify-between gap-2 rounded-sm p-2">
      <input
        type="text"
        value={comment}
        onChange={(e)=>(setComment(e.target.value))}
        name="comment"
        className="w-full focus:outline-blue-500 not-focus:border-1 border-zinc-400 bg-white px-2 text-gray-700 font-medium"
        placeholder="Your Message here...."
      />
      <button 
      type="submit"
      onClick={handleComment}
      className="flex hover-scale p-2 bg-blue-400 rounded-md">
        <RiSendPlaneFill className="size-7 text-white" />
      </button>
      </form>
  )
}



// Component to show comments on the post.
function Comment() {
  return (
    <div className="rounded-sm w-full p-2 pb-6 flex gap-2 items-start relative">
      {/* Profile of Commenter... */}
      <Link to={"/profile"}>
      <ProfilePhoto className={"h-15 w-15 no-scale-on-hover"} />
      </Link>

      {/* Comment Message... */}
      <div className="text-sm sm:text-md bg-white/70 max-w-100 rounded-sm p-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, odio aliquam molestiae eligendi architecto animi quod vitae delectus deserunt incidunt commodi unde, optio quibusdam, qui reprehenderit inventore hic veniam eveniet?
      </div>

      <small className="absolute bottom-1 left-20 font-medium text-gray-600">2002-12-10 12:30:10</small>
    </div>
  );
}
