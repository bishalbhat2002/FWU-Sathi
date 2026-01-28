import { RiSendPlaneFill } from "react-icons/ri";

// Component to write comment on the post.
function CommentWrite() {

     const [comment, setComment] = useState("")

     // hanlde submit comment
     function handleCommentSend(){
          alert(comment, "comment has been sent...")
     }


  return (
    <form 
    onSubmit={handleCommentSend}
    className="bg-zinc-200 flex justify-between gap-2 my-2 rounded-sm p-2">
      <input
        type="text"
        name="comment"
        className="w-full focus:outline-blue-500 bg-white px-2 text-gray-700 font-medium"
        placeholder="Your comment here...."
      />
      <button type="submit" className="flex hover-scale p-2 bg-blue-400 rounded-md">
        <RiSendPlaneFill className="size-7 text-white" />
      </button>
    </form>
  );
}
