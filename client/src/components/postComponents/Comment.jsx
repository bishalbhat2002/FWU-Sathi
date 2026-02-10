import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { useSelector } from "react-redux";

// Component to show comments on the post.
export const Comment = ({ comment }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const userProfile = useSelector((state) => state.userReducer.userProfile);

  // console.log(userProfile);
  // console.log(comment);

  const handleOutsideClick = (e) => {
    // e.stopPropagation();
    if (optionsRef.current && !optionsRef.current.contains(e.target)) {
      setShowOptions((prev) => !prev);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  return (
    <div className="rounded-sm w-full p-2 pb-6 flex gap-2 items-start relative">
      {/* Profile of Commenter... */}
      <Link to={`/profile/${comment?.userId?._id}`}>
        <ProfilePhoto
          imgSrc={comment?.userId?.photo}
          className={"h-15 w-15 no-scale-on-hover"}
        />
      </Link>

      <div className="flex gap-2">
        <div className="bg-white/70 max-w-90 rounded-sm px-3 py-2  flex flex-col gap-.5 relative">
          <h2 className="text-md font-semibold text-zinc-800">
            {comment?.userId?.name}
          </h2>
          {/* Comment Message... */}
          <div className="text-sm sm:text-md flex">{comment?.comment}</div>
          <small className="absolute -bottom-6 left-0 w-40 font-normal text-[14px] text-gray-700 ">
            {new Date(comment?.createdAt).toLocaleString("en-Np")}
          </small>
        </div>

        {/* {userProfile._id === comment.userId._id && ( */}
          <div>
            <SlOptionsVertical
              onClick={(e) => {
                e.stopPropagation;
                setShowOptions((prev) => !prev);
              }}
              className="size-8 text-gray-600 hover:bg-gray-100 p-2 rounded-full hover-scale shadow-2xl"
            />

            {/*Show Options when user clicks on the 3 dots... */}
            {showOptions && (
              <div
                ref={optionsRef}
                className="flex flex-col absolute bg-white rounded-md gap-1 overflow-hidden z-20 shadow-2xl border-1 border-zinc-400"
              >
                {(userProfile._id === comment.userId._id) && (
                  <Link
                    to={`edit/${comment?._id}`}
                    className="text-sm font-medium text-zinc-800 hover:bg-zinc-400 active:bg-zinc-300 w-full px-2"
                  >
                    Edit
                  </Link>
                )}
                {/* {userProfile._id !== comment.userId._id && (
                  <Link
                    to={`report/${comment?._id}`}
                    className="text-sm font-medium text-zinc-800 hover:bg-zinc-400 active:bg-zinc-300 w-full px-2"
                  >
                    Report
                  </Link>
                )} */}
                {(userProfile._id === comment.userId._id || userProfile?.role === "admin") && (
                  <Link
                    to={`delete/${comment?._id}`}
                    className="text-sm font-medium text-zinc-800 hover:bg-zinc-400 active:bg-zinc-300 w-full px-2"
                  >
                    Delete
                  </Link>
                )}
              </div>
            )}
          </div>
        {/* )} */}
      </div>
    </div>
  );
};
