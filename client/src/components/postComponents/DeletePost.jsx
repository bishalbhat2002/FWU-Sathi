import { useState } from "react";
import OverlayScreen from "../../layouts/OverlayScreen";
import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const DeletePost = () => {
  return (
    <OverlayScreen>
      <div className="bg-white max-w-130 w-full bg-white-600 border-1 rounded-md border-gray-300 shadow-2xl">
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

          {/* Delete Confirmation Buttons... */}
          <div className="bg-blue-100 mt-2 p-2 rounded-md shadow">
          <div className="text-center text-lg font-medium text-zinc-800 ">
            Are you sure, You want to <b className="text-red-600">delete</b> this POST?
          </div>
            <div className="text-md font-medium flex gap-2">
              <Link to={"/"}  className="w-1/2">
              <button className="w-full mt-2 inline-block py-2 bg-white/10 border border-black/10 shadow rounded-sm py-1 text-zinc-800 hover:bg-blue-200 active:scale-97 ease-in duration-200">
                No, don't Delete.
              </button>
              </Link>
              <button className="w-1/2 mt-2 inline-block py-2 bg-red-300 rounded-sm py-1 border border-black/10 shadow text-zinc-800 hover:bg-red-400 hover:text-white active:scale-97 ease-in duration-200">
                Yes, Delete.
              </button>
            </div>
          </div>
        </div>
      </div>
    </OverlayScreen>
  );
};

export default DeletePost;
