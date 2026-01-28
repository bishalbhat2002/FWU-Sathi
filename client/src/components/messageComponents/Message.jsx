import { Link } from "react-router-dom";
import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { SlOptionsVertical } from "react-icons/sl";
import { useState } from "react";

export const Message = ({message, direction}) => {
  const [showOptions, setShowOptions] = useState(false);

  const profileMessageOrderSetup = (direction ==="start")? "justify-start":"flex-row-reverse";
  const messageOptionsSetup = (direction ==="start")? "justify-start":"flex-row-reverse justify-end";
  const timePostionSetup = (direction ==="start")? "left-20":"right-19";

  return (
    <div className={`w-full p-2 pb-5 flex gap-2 items-start relative ${profileMessageOrderSetup}`}>
     
      {/* Profile of Commenter... */}
      <Link to={"/profile"}>
        <ProfilePhoto className={"h-15 w-15 no-scale-on-hover"} />
      </Link>

      {/* Comment Message... */}
      <div className={`flex gap-2 ${messageOptionsSetup}`}>
        <p className="text-sm sm:text-md bg-white/70 max-w-100 rounded-sm p-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, odio
  
        </p>

        <div className="relative">
          <SlOptionsVertical
            onClick={(e) => setShowOptions((prev) => !prev)}
            className="size-8 text-gray-600 hover:bg-gray-100 p-2 rounded-full hover-scale shadow-2xl"
          />

          {/*Show Options when user clicks on the 3 dots... */}
          {showOptions && <div className="flex flex-col absolute bg-white rounded-md gap-1 overflow-hidden z-20 shadow-2xl border-1 border-zinc-400">
            <Link className="text-sm font-medium text-zinc-800 hover:bg-zinc-400 active:bg-zinc-300 w-full px-2">Edit</Link>  
            <Link className="text-sm font-medium text-zinc-800 hover:bg-zinc-400 active:bg-zinc-300 w-full px-2">Report</Link>  
            <Link className="text-sm font-medium text-zinc-800 hover:bg-zinc-400 active:bg-zinc-300 w-full px-2">Delete</Link>  
          </div>}
        </div>
      </div>

      <small className={`absolute font-medium text-gray-600 bottom-1 ${timePostionSetup}`}>
        2002-12-10 12:30:10
      </small>
    </div>
  );
};
