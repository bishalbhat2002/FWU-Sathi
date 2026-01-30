import { Link } from "react-router-dom";
import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { SlOptionsVertical } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";

export const Message = ({ message, direction, msg="defaukt" }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  const profileMessageOrderSetup =
    direction === "start" ? "justify-start" : "flex-row-reverse";
  const messageOptionsSetup =
    direction === "start" ? "justify-start" : "flex-row-reverse justify-end";
  const timePostionSetup = direction === "start" ? "left-20 md:left-21 lg:left-22" : "right-19 md:right-20 sm:right-21";

  const handleOutsideClick = (e)=>{
      // e.stopPropagation();
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        console.log("first", msg)
        setShowOptions((prev) => !prev);
      }
    }

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
      <Link to={"/profile"}>
        <ProfilePhoto className={"h-15 w-15 no-scale-on-hover"} />
      </Link>

      {/* Comment Message... */}
      <div className={`flex gap-2 ${messageOptionsSetup}`}>
        <p className="text-sm text-gray-600 sm:text-md bg-white/70 max-w-45 sm:max-w-60 md:max-w-70 lg:max-w-80 rounded-sm p-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, odio
        </p>

        <div className="relative">
          <SlOptionsVertical
            onClick={(e) => setShowOptions((prev) => !prev)}
            className="size-8 text-gray-600 hover:bg-gray-100 p-2 rounded-full hover-scale shadow-2xl"
          />

          {/*Show Options when user clicks on the 3 dots... */}
          {showOptions && (
            <div
              ref={optionsRef}
              className="flex flex-col absolute bg-white rounded-md gap-1 overflow-hidden z-20 shadow-2xl border-1 border-zinc-400"
            >
              <Link to={"/chat/edit"} className="text-sm font-medium text-zinc-800 hover:bg-zinc-400 active:bg-zinc-300 w-full px-2">
                Edit
              </Link>
              <Link to={"/chat/report"} className="text-sm font-medium text-zinc-800 hover:bg-zinc-400 active:bg-zinc-300 w-full px-2">
                Report
              </Link>
              <Link to={"/chat/delete"} className="text-sm font-medium text-zinc-800 hover:bg-zinc-400 active:bg-zinc-300 w-full px-2">
                Delete
              </Link>
            </div>
          )}
        </div>
      </div>

      <small
        className={`absolute font-medium text-gray-600 -bottom-1.5 ${timePostionSetup}`}
      >
        2002-12-10 12:30:10
      </small>
    </div>
  );
};
