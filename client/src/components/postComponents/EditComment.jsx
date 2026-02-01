import { Link, useNavigate } from "react-router-dom";
import OverlayScreen from "../../layouts/OverlayScreen";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const EditComment = () => {

  const navigate = useNavigate();

  const [comment, setComment] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, odio",
  );
  function handleCommentEdit(e) {
    e.preventDefault();
  }

  return (
    <OverlayScreen>
      <form
        onSubmit={handleCommentEdit}
        className="w-[80vw] relative max-w-130 bg-gray-800 p-5 rounded-md flex flex-col gap-2 "
      >
        <button
          onClick={()=>navigate(-1)}
          className="rounded-full p-1 bg-gray-800 absolute border-2 border-white -right-3 -top-3 hover-scale"
        >
          <RxCross2 className="size-6 text-white hover-scale" />
        </button>
       
       <h3 className="text-white text-lg font-semibold text-center -mt-3 mb-1">Edit Comment</h3>

        <textarea
          value={comment}
          rows={5}
          name="edit-message"
          autoFocus={true}
          onChange={(e) => setComment(e.target.value)}
          className="scrollbar-none text-sm sm:text-md bg-white/90 rounded-sm w-full p-2"
        />

        <input
          type="submit"
          value={"Save Changes"}
          className="text-white text-lg py-1 rounded-sm bg-blue-400 hover:bg-blue-500 active:scale-98 duration-200 ease-in  w-full"
        />
      </form>
    </OverlayScreen>
  );
};

export default EditComment;
