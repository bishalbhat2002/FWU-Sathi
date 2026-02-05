import { useEffect, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createPostCommentThunk } from "../../store/features/post/post.thunk";
import toast from "react-hot-toast";
import { createComment } from "../../store/features/post/post.slice";

export const CommentWrite = ()=> {
  const [comment, setComment] = useState("");
  const postId = useParams().postId;
  const dispatch = useDispatch();
  const success = useSelector(state=>state.postReducer.success)
  const loader = useSelector(state=>state.postReducer.loader)

  function handleComment(e) {
    e.preventDefault(); 
    if(comment?.trim().length === 0){
      return toast.error("Empty comments are not allowed.")
    }
    
    if(comment?.trim().length < 3 || comment?.trim().length >500){
      return toast.error("Comment must be between 3-500 characters.")
    }

    // If everything is fine, then dispatch the comment....
    dispatch(createPostCommentThunk({comment, postId}));
    dispatch(createComment({postId}));
  }

  useEffect(()=>{
    if(success && !loader){
      setComment("");
    }
  }, [success, loader])

  return (
    <form
      onSubmit={handleComment}
      className="mx-auto w-full mt-1 flex justify-between gap-2 rounded-sm p-2 sticky bottom-0 z-19 bg-white"
    >
      <input
        type="text"
        value={comment}
        autoFocus={true}
        onChange={(e) => setComment(e.target.value)}
        name="comment"
        className="w-full focus:outline-blue-500 not-focus:border-1 border-zinc-400 bg-white px-2 text-gray-600 font-medium"
        placeholder="Your Message here...."
      />
      <button
        type="submit"
        onClick={handleComment}
        className="flex hover-scale p-2 bg-blue-400 rounded-md"
      >
        <RiSendPlaneFill className="size-7 text-white" />
      </button>
    </form>
  );
}