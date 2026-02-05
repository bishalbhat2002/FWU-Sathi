import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { RxCross2 } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { TbHeartFilled } from "react-icons/tb";
import { LiaCommentDots } from "react-icons/lia";
import { TbMessageReport } from "react-icons/tb";
import { IoIosLink } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { getSemesterName } from "../../utilities/getSemName";
import { getImageUrl } from "../../utilities/getImageUrl";
import { useSelector, useDispatch } from "react-redux";
import { setSuccess, toggleLike } from "../../store/features/post/post.slice";
import { likePostThunk } from "../../store/features/post/post.thunk";
import toast from "react-hot-toast";

const Post = ({ post, commentBtnDisabled = false }) => {
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state.userReducer.userProfile);

  function handlePostLinkCopy() {
    try {
      navigator.clipboard.writeText(
        `${import.meta.env.VITE_CLIENT_URL}/post/view/${post?._id}`,
      );
      toast.success("Link copied to clipboard...");
    } catch (error) {
      toast.error("Link cannoted be copied to clipboard...");
      console.log("Error from link copy: ", error.message);
    }
  }



  return (
    <>
      <div className="mx-auto max-w-130 w-full bg-white shadow-post rounded-md overflow-hidden">
        <div className="flex gap-4 p-2 items-center shadow-bottom relative bg-white">
          <Link to={`/profile/${(post.userId._id !== userProfile._id)? post.userId._id : ""}`} >
            <ProfilePhoto
              imgSrc={post.userId.photo}
              className="h-15 w-15 no-scale-on-hover"
            />
          </Link>
          <div>
            <Link to={`/profile/${(post.userId._id !== userProfile._id)? post.userId._id : ""}`} >
              <h2 className="font-bold text-xl text-zinc-700 line-clamp-1">
                {post.userId.name}
              </h2>
            </Link>
            <p className="font-medium text-gray-500 text-sm -mt-1">
              {getSemesterName(post.semester)} Semester
            </p>
          </div>

          {/* Options for handling posts.... */}
          <div className="absolute top-1 right-1 border-1 border-black/20 flex gap-2 px-2 py-1 rounded-md ">
            {post?.userId?._id === userProfile._id && (
              <Link
                to={`/post/edit/${post._id}`}
                // onClick={()=>setSuccess(false)}
                className="rounded-full p-1 bg-white hover:bg-gray-400 group hover-scale"
                title="Edit Post"
              >
                <MdModeEdit className="size-4 -rotate-15 text-zinc-500 group-hover:text-white hover-scale" />
              </Link>
            )}

            {post?.userId?._id !== userProfile._id && (
              <Link
                to={`/post/report/${post._id}`}
                className="rounded-full p-1 bg-white hover:bg-gray-400 group hover-scale"
                title="Report Post"
              >
                <TbMessageReport className="size-4 text-zinc-500 group-hover:text-white hover-scale" />
              </Link>
            )}

            {post?.userId?._id === userProfile._id && (
              <Link
                to={`/post/delete/${post._id}`}
                className="rounded-full p-1 bg-white hover:bg-red-300 group hover-scale"
                title="Delete Post"
              >
                <MdDelete className="size-4 text-zinc-500 hover-scale group-hover:text-white " />
              </Link>
            )}
          </div>

          <div className="pr-1 pb-0.5 rounded-tl-sm text-zinc-400 font-medium absolute right-0 bottom-0">
            {new Date(post.createdAt).toLocaleString("en-NP")}
          </div>
        </div>

        <div className="p-1 bg-white">
          <p className="w-full px-2 py-1 text-gray-700">{post.caption}</p>
          {post.photo && (
            <div className="w-full relative px-2 py-1 flex justify-center">
              <img
                src={getImageUrl(post.photo)}
                // src={`${import.meta.env.VITE_SERVER_URL}/${post.photo}`.replace(
                //   /\\/g,
                //   "/",
                // )}
                alt="Post photo"
                className="rounded-sm max-h-80 max-w-full"
                onClick={() =>
                  navigate("/post/view-image/", {
                    state: {
                      imageUrl:
                        `${import.meta.env.VITE_SERVER_URL}/${post.photo}`.replace(
                          /\\/g,
                          "/",
                        ),
                    },
                  })
                }
              />
            </div>
          )}
        </div>

        <div className="bg-white flex rounded-b-sm h-10 gap-1 mx-3 mb-2">
          <LikeButton post={post} />

          {!commentBtnDisabled ? (
            <Link
              to={`/post/${post._id}/comment`}
              className={`w-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:scale-96 duration-200 ease-in rounded-md hover:opacity-90`}
            >
              <LiaCommentDots className="scale-125" />{" "}
              <span className="ml-2">{post.commentCount}</span>{" "}
            </Link>
          ) : (
            <button
              type="button"
              onClick={(e)=>e.preventDefault()}
              className={`w-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:scale-96 duration-200 ease-in rounded-md hover:opacity-90`}
            >
              <LiaCommentDots className="scale-125" />{" "}
              <span className="ml-2">{post.commentCount}</span>{" "}
            </button>
          )}

          <button
            onClick={handlePostLinkCopy}
            className="w-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:scale-96 duration-200 ease-in rounded-md hover:opacity-90"
          >
            <IoIosLink className="scale-110" />{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;

function LikeButton({ post }) {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userReducer.userProfile);

  function handleLike() {
    dispatch(toggleLike({ postId: post._id, userId: userProfile._id }));
    dispatch(likePostThunk({ postId: post._id }));
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      className="w-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:scale-96 duration-200 ease-in rounded-md hover:opacity-90"
    >
      {post.likerIds.includes(userProfile?._id) ? (
        <TbHeartFilled className="scale-115 text-red-500" />
      ) : (
        <FaRegHeart />
      )}{" "}
      <span className="ml-2">{post.likeCount}</span>{" "}
    </button>
  );
}
