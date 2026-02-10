import { Link } from "react-router-dom";
import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { SlOptionsVertical } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const Message = ({ message, direction }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const userProfile = useSelector((state) => state.userReducer.userProfile);

  const profileMessageOrderSetup =
    direction === "start" ? "justify-start" : "flex-row-reverse";
  const messageOptionsSetup =
    direction === "start" ? "justify-start" : "flex-row-reverse justify-end";

  const timePostionSetup =
    direction === "start" ? "left-0" : "right-0 flex justify-end";

  const nameSetup =
    direction === "start" ? "text-start" : "text-end";

  const optionSetup =
    direction === "start"
      ? "left-10"
      : "right-7 flex justify-end";

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
    <div
      className={`w-full p-2 pb-3 flex gap-2 md:gap-3 lg:gap-4 items-start relative ${profileMessageOrderSetup}`}
    >
      {/* Profile of Commenter... */}

      <Link
        to={`/profile/${message?.userId?._id !== userProfile?._id ? message?.userId?._id : ""}`}
      >
        <ProfilePhoto
          imgSrc={message?.userId?.photo}
          className={"h-15 w-15 no-scale-on-hover"}
        />
      </Link>

      {/* Comment Message... */}
      <div className={`flex gap-2 ${messageOptionsSetup}`}>
        <div className="relative">
          <h3 className={`text-xs text-gray-500 ${nameSetup}`}>{message?.userId.name}</h3>
          <p className="text-sm text-gray-600 sm:text-md bg-white/70 max-w-45 sm:max-w-60 md:max-w-70 lg:max-w-80 rounded-sm p-2">
            {message?.message}
          </p>

          <small
            className={`absolute w-40 font-normal text-gray-400 text-xs -bottom-4 ${timePostionSetup}`}
          >
            {new Date(message?.createdAt).toLocaleString("en-Np")}
          </small>
        </div>

        <div className="relative">
          {(userProfile._id === message.userId._id || userProfile.role === "admin") && (
            <SlOptionsVertical
              onClick={(e) => setShowOptions((prev) => !prev)}
              className="size-8 text-gray-600 hover:bg-gray-100 p-2 relative top-3 rounded-full hover-scale shadow-2xl"
            />
          )}

          {/*Show Options when user clicks on the 3 dots... */}
          {showOptions && (
            <div
              ref={optionsRef}
              className={`flex flex-col absolute ${optionSetup} top-4 bg-white rounded-md gap-1 overflow-hidden z-20 shadow-2xl border border-zinc-400`}
            >
              {(userProfile._id === message.userId._id) && (
                <Link
                  to={`/chat/edit/${message._id}`}
                  className="text-sm font-medium text-zinc-800 hover:bg-zinc-400 active:bg-zinc-300 w-full px-2"
                >
                  Edit
                </Link>
              )}
              {/* <Link
                to={`/chat/report/${message._id}`}
                className="text-sm font-medium text-zinc-800 hover:bg-zinc-400 active:bg-zinc-300 w-full px-2"
              >
                Report
              </Link> */}

              {(userProfile._id === message.userId._id || userProfile.role === "admin") && (
                <Link
                  to={`/chat/delete/${message._id}`}
                  className="text-sm font-medium text-zinc-800 hover:bg-zinc-400 active:bg-zinc-300 w-full px-2"
                >
                  Delete
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
