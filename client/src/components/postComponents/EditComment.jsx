import { useNavigate, useParams } from "react-router-dom";
import OverlayScreen from "../../layouts/OverlayScreen";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { editPostCommentThunk } from "../../store/features/post/post.thunk";
import { setSuccess } from "../../store/features/post/post.slice";

const EditComment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const commentId = useParams().commentId;
  const comments = useSelector((state) => state.postReducer.comments);
  const commentToEdit = comments?.find((c) => (c._id === commentId ? c : null));
  
  const [comment, setComment] = useState(commentToEdit?.comment);
  
  function handleCommentEdit(e) {
    e.preventDefault();
    dispatch(editPostCommentThunk({ comment, commentId }));
  }
  
  const success = useSelector((state) => state.postReducer.success);
  const loader = useSelector((state) => state.postReducer.loader);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch(setSuccess(false));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (!loader && success) {
      navigate(-1);
    }
  }, [success, loader]);

  return (
    <OverlayScreen>
      <form
        onSubmit={handleCommentEdit}
        className="w-[80vw] relative max-w-130 bg-gray-800 p-5 rounded-md flex flex-col gap-2 "
      >
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="rounded-full p-1 bg-gray-800 absolute border-2 border-white -right-3 -top-3 hover-scale"
        >
          <RxCross2 className="size-6 text-white hover-scale" />
        </button>

        <h3 className="text-white text-lg font-semibold text-center -mt-3 mb-1">
          Edit Comment
        </h3>

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
