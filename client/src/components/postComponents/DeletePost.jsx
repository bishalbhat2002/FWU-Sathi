import OverlayScreen from "../../layouts/OverlayScreen";
import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";




const DeletePost = () => {

  const navigate = useNavigate();

  return (
    <OverlayScreen>
      <button
        onClick={() => navigate(-1)}
        className="rounded-full p-1 bg-gray-800 absolute border-2 border-white right-3 top-3 hover-scale"
      >
        <RxCross2 className="size-6 text-white hover-scale" />
      </button>

      <div className="bg-white max-w-130 w-full bg-white-600 border-1 rounded-md border-gray-300 relative">

      <span className="absolute right-0 text-sm sm:text-md bg-red-100 rounded-bl px-2 py-1 font-medium text-zinc-500">You are Delete this post...</span>

        <div className="flex gap-4 p-2 items-center border-b border-gray-300 shadow relative">
          <ProfilePhoto className="h-15 w-15 no-scale-on-hover" />
          <div>
            <h2 className="font-bold text-xl text-zinc-700">Bishal Bhat</h2>
            <p className="font-medium text-gray-500 text-sm -mt-1">
              5th Semester
            </p>
          </div>
          <div className="pr-1 pb-0.5 rounded-tl-sm text-zinc-400 font-medium absolute right-0 bottom-0">
            2082-12-10 12:10:30
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
          <div className="mt-3 p-1 rounded-md shadow border-1 border-black/30">
            <h2 className="text-center text-sm sm:text-md md:text-lg font-medium text-zinc-800">
              Are you sure, You want to <b className="text-red-600">delete</b>{" "}
              this POST?
            </h2>
            <div className="text-md font-medium flex gap-2">
              <Link to={"/"} className="w-1/2">
                <button
                  autoFocus={true}
                  className="w-full mt-2 inline-block py-2 bg-white/10 border border-black/30 shadow rounded-sm py-1 text-zinc-800 hover:bg-blue-200 active:scale-97 ease-in duration-200"
                >
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
