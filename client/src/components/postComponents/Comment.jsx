import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";

// Component to show comments on the post.
export const Comment = () => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  const handleOutsideClick = (e) => {
    // e.stopPropagation();
    if (optionsRef.current && !optionsRef.current.contains(e.target)) {
      setShowOptions((prev)=>!prev);
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
      <Link to={"/profile"}>
        <ProfilePhoto className={"h-15 w-15 no-scale-on-hover"} />
      </Link>

      <div className="flex gap-2">
        {/* Comment Message... */}
        <div className="text-sm sm:text-md bg-white/70 max-w-90 rounded-sm p-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, odio
          aliquam molestiae eligendi architecto animi quod vitae delectus
          deserunt incidunt commodi unde, optio quibusdam, qui reprehenderit
          inventore hic veniam eveniet?
        </div>

        <div>
          <SlOptionsVertical
            onClick={(e) => {e.stopPropagation;setShowOptions((prev) => !prev);}}
            className="size-8 text-gray-600 hover:bg-gray-100 p-2 rounded-full hover-scale shadow-2xl"
          />

          {/*Show Options when user clicks on the 3 dots... */}
          {showOptions && (
            <div
              ref={optionsRef}
              className="flex flex-col absolute bg-white rounded-md gap-1 overflow-hidden z-20 shadow-2xl border-1 border-zinc-400"
            >
              <Link
                to={"edit"}
                className="text-sm font-medium text-zinc-800 hover:bg-zinc-400 active:bg-zinc-300 w-full px-2"
              >
                Edit
              </Link>
              <Link
                to={"report"}
                className="text-sm font-medium text-zinc-800 hover:bg-zinc-400 active:bg-zinc-300 w-full px-2"
              >
                Report
              </Link>
              <Link
                to={"delete"}
                className="text-sm font-medium text-zinc-800 hover:bg-zinc-400 active:bg-zinc-300 w-full px-2"
              >
                Delete
              </Link>
            </div>
          )}
        </div>
      </div>

      <small className="absolute bottom-1 left-20 font-medium text-gray-600">
        2002-12-10 12:30:10
      </small>
    </div>
  );
};
