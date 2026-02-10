import OverlayScreen from "../../layouts/OverlayScreen";
import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { getSemesterName } from "../../utilities/getSemName";
import { getImageUrl } from "../../utilities/getImageUrl";
import { useEffect, useState } from "react";
import {
  setDeletePostSuccess,
  setSuccess,
} from "../../store/features/post/post.slice";
import { deletePostThunk } from "../../store/features/post/post.thunk";

const DeletePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const posts = useSelector((state) => state.postReducer.posts);
  const deletePostSuccess = useSelector(
    (state) => state.postReducer.deletePostSuccess,
  );
  const loader = useSelector((state) => state.postReducer.loader);
  const post = posts.find((post) => post?._id === postId) || null;

  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch(setDeletePostSuccess(false));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (!loader && deletePostSuccess) {
      navigate(-1);
    }
  }, [deletePostSuccess, loader]);

  function handlePostDelete(e) {
    e.preventDefault();
    dispatch(deletePostThunk({ postId }));
  }

  if (!post) {
    return null;
  }

  return (
    <OverlayScreen>
      <button
        onClick={() => navigate(-1)}
        className="rounded-full p-1 bg-gray-800 absolute border-2 border-white right-3 top-3 hover-scale"
      >
        <RxCross2 className="size-6 text-white hover-scale" />
      </button>

      <div className="bg-white max-w-130 w-full bg-white-600 border-1 rounded-md border-gray-300 relative">
        <span className="absolute right-0 text-sm sm:text-md bg-red-100 rounded-bl px-2 py-1 font-medium text-zinc-500">
          You are Deleting this post.
        </span>

        <div className="flex gap-4 p-2 items-center border-b border-gray-300 shadow relative">
          <ProfilePhoto
            imgSrc={post?.userId?.photo}
            className="h-15 w-15 no-scale-on-hover"
          />
          <div>
            <h2 className="font-bold text-xl text-zinc-700">
              {post?.userId?.name}
            </h2>
            <p className="font-medium text-gray-500 text-sm -mt-1">
              {getSemesterName(post?.semester)} Semester
            </p>
          </div>

          <div className="pr-1 pb-0.5 rounded-tl-sm text-zinc-400 font-medium absolute right-0 bottom-0 text-sm">
            {new Date(post?.createdAt).toLocaleString("en-Np")}
          </div>
        </div>

        <div className="p-1">
          <p className="w-full px-2 py-1 text-gray-600  rounded line-clamp-3">
            {post?.caption}
          </p>

          {post?.photo && (
            <div className="w-50 my-2 pl-1 relative">
            <img
              src={getImageUrl(post?.photo)}
              alt="Post photo"
              className="rounded-md"
            />
          </div>
          )}

          { /* Delete Confirmation Buttons... */}
          <div className="mt-3 p-1 rounded-md shadow border border-black/20">
            <h2 className="text-center text-sm sm:text-md md:text-lg font-medium text-zinc-800">
              Are you sure, You want to <b className="text-red-600">delete</b>{" "}
              this POST?
            </h2>
            <div className="text-md font-medium flex gap-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                autoFocus={true}
                className="w-1/2 mt-2 inline-block py-2 bg-white/10 border border-black/20 shadow rounded-sm text-zinc-800 hover:bg-blue-200 active:scale-97 ease-in duration-200"
              >
                No, don't Delete.
              </button>

              <button
                onClick={handlePostDelete}
                className="w-1/2 mt-2 inline-block py-2 bg-red-300 rounded-sm border border-black/10 shadow text-zinc-800 hover:bg-red-400 hover:text-white active:scale-97 ease-in duration-200"
              >
                {loader ? "Deleting Post, Please wait..." : "Yes, Delete."}
              </button>
            </div>
          </div>
        </div>
      </div>
    </OverlayScreen>
  );
};

export default DeletePost;
