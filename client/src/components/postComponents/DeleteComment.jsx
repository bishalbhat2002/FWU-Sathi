import { Link, useNavigate } from "react-router-dom";
import OverlayScreen from "../../layouts/OverlayScreen";
import { RxCross2 } from "react-icons/rx";

const DeleteComment = () => {
  function handleCommentDelete(e) {
    e.preventDefault();
  }

  const navigate = useNavigate();

  return (
    <OverlayScreen>
      <div
        className="w-[80vw] relative max-w-130 bg-gray-800 p-5 rounded-md flex flex-col gap-2"
      >
        <button
          onClick={()=>navigate(-1)}
          className="rounded-full p-1 bg-gray-800 absolute border-2 border-white -right-3 -top-3 hover-scale"
        >
          <RxCross2 className="size-6 text-white hover-scale" />
        </button>

        <h3 className="text-white text-lg font-semibold text-center -mt-3 mb-1">
          Delete Comment
        </h3>

        <p className="scrollbar-none text-sm sm:text-md bg-white/98 rounded-sm text-gray-800 font-medium w-full p-2 py-1">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non eius
          error quaerat praesentium vel facilis, ducimus voluptatem velit
          possimus deserunt harum omnis ut quo vitae neque modi nulla. In, sit.
        </p>


        {/* Delete Confirmation Buttons... */}
        <div className="bg-white mt-2 p-2 rounded-md shadow">
          <h2 className="text-center text-sm sm:text-md md:text-lg font-medium text-zinc-800 ">
            Are you sure, You want to <b className="text-red-500">delete</b>{" "}
            this Comment?
          </h2>
          <div className="text-md font-medium flex gap-2">
            <Link to={"/post/comment"} className="w-1/2">
              <button autoFocus={true} className="w-full mt-2 inline-block py-2 bg-white/10 border border-black/10 shadow rounded-sm py-1 text-zinc-800 hover:bg-blue-200 active:scale-97 ease-in duration-200">
                No, don't Delete.
              </button>
            </Link>
            <button 
            onClick={handleCommentDelete}
            className="w-1/2 mt-2 inline-block py-2 bg-red-300 rounded-sm py-1 border border-black/10 shadow text-zinc-800 hover:bg-red-400 hover:text-white active:scale-97 ease-in duration-200">
              Yes, Delete.
            </button>
          </div>
        </div>
      </div>
    </OverlayScreen>
  );
};

export default DeleteComment;
