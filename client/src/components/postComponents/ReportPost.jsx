import { useState } from "react";
import OverlayScreen from "../../layouts/OverlayScreen";
import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const ReportPost = () => {
  return (
    <OverlayScreen>
      <div className="bg-white max-w-130 w-full bg-white-600 border-1 rounded-md border-gray-300">
        <div className="flex gap-4 p-2 items-center border-b border-gray-300 shadow relative">
          <ProfilePhoto className="h-15 w-15 no-scale-on-hover" />
          <div>
            <h2 className="font-bold text-xl text-zinc-700">Bishal Bhat</h2>
            <p className="font-light text-sm">2082-12-10 12:10:30</p>
          </div>
          <Link
            to={"/"}
            className="rounded-full p-1 bg-zinc-300 absolute right-3 top-3 hover-scale"
          >
            <RxCross2 className="size-6 text-zinc-500 hover-scale" />
          </Link>
          <div className="px-3 rounded-tl-sm text-zinc-800 bg-zinc-300 absolute right-0 bottom-0">
            5th Semester
          </div>
        </div>
        <div className="p-1">
          <p className="w-full px-2 min-h-20 max-h-50 py-1 shadow text-gray-600 line-clamp-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque non
            ea corrupti saepe, architecto provident ab nobis eveniet, tenetur
            eos atque animi cumque. Doloribus nesciunt ipsam nemo, architecto in
            tempore.{" "}
          </p>
          {/*Use condition to show the photo  */}
          <div className="w-50 my-2 pl-1 relative">
            <img src="/image.png" alt="Post photo" className="rounded-md" />
          </div>

          <div className="mt-2 text-md font-medium">
            <input type="file" accept="image/*" hidden={true} id="photoInput" />

            <textarea
              rows={3}
              className="rounded-sm w-full px-2 min-h-20 max-h-50 py-1 border-1 border-zinc-300 shadow text-gray-700 focus:outline-none"
              placeholder="Your Report Here ..."
            />

            <button className="w-full mt-2 bg-blue-300 rounded-sm py-1 text-zinc-800 hover:bg-blue-400 hover:text-white active:scale-97 ease-in duration-200">
              Report Post
            </button>
          </div>
        </div>
      </div>
    </OverlayScreen>
  );
};

export default ReportPost;
