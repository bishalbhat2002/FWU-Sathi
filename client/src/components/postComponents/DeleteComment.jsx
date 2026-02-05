import { Link, useNavigate, useParams } from "react-router-dom";
import OverlayScreen from "../../layouts/OverlayScreen";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { deletePostCommentThunk } from "../../store/features/post/post.thunk";
import { setSuccess } from "../../store/features/post/post.slice";
import { useEffect, useState } from "react";

const DeleteComment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const commentId = useParams().commentId;
  const postId = useParams().postId;

  const comments = useSelector((state) => state.postReducer.comments);
  const comment = comments?.find((c) => (c._id === commentId ? c : null));

  function handleCommentDelete(e) {
    e.preventDefault();
    dispatch(deletePostCommentThunk({commentId, postId}));
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
      <div className="w-[80vw] relative max-w-130 bg-gray-800 p-5 rounded-md flex flex-col gap-2">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full p-1 bg-gray-800 absolute border-2 border-white -right-3 -top-3 hover-scale"
        >
          <RxCross2 className="size-6 text-white hover-scale" />
        </button>

        <h3 className="text-white text-lg font-semibold text-center -mt-3 mb-1">
          Delete Comment
        </h3>

        <p className="scrollbar-none text-sm  sm:text-md bg-white/98 rounded-sm text-gray-800 font-medium w-full p-4">
          {comment?.comment}
        </p>

        {/* Delete Confirmation Buttons... */}
        <div className="bg-white mt-2 p-2 rounded-md shadow">
          <h2 className="text-center text-sm sm:text-md md:text-lg font-medium text-zinc-800 ">
            Are you sure, You want to <b className="text-red-500">delete</b>{" "}
            this Comment?
          </h2>
          <div className="text-md font-medium flex gap-2">
            
              <button
                type="button"
                onClick={()=>navigate(-1)}
                autoFocus={true}
                className="w-1/2 mt-2 inline-block py-2 bg-white/10 border border-black/10 shadow rounded-sm py-1 text-zinc-800 hover:bg-blue-200 active:scale-97 ease-in duration-200"
              >
                No, don't Delete.
              </button>
            
            <button
              onClick={handleCommentDelete}
              className="w-1/2 mt-2 inline-block py-2 bg-red-300 rounded-sm py-1 border border-black/10 shadow text-zinc-800 hover:bg-red-400 hover:text-white active:scale-97 ease-in duration-200"
            >
              Yes, Delete.
            </button>
          </div>
        </div>
      </div>
    </OverlayScreen>
  );
};

export default DeleteComment;
