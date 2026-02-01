import { useState } from "react";
import OverlayScreen from "../../layouts/OverlayScreen";
import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState({
    caption: "",
    photo: null,
  });

  const navigate = useNavigate();

  return (
    <OverlayScreen >
      <button
        onClick={() => navigate(-1)}
        className="rounded-full p-1 bg-gray-800 absolute border-2 border-white right-3 top-3 hover-scale"
      >
        <RxCross2 className="size-6 text-white hover-scale" />
      </button>


      <div className="bg-white max-w-130 w-full bg-white-600 border-1 rounded-md border-gray-300 relative">


      <span className="absolute right-0 text-sm sm:text-md bg-green-100 rounded-bl px-2 py-1 font-medium text-zinc-500">You are Editing this post...</span>

        <div className="flex gap-4 p-2 items-center border-b border-gray-300 shadow relative">
          <ProfilePhoto className="h-15 w-15 no-scale-on-hover" />
          <div>
            <h2 className="font-bold text-xl text-zinc-700">Bishal Bhat</h2>
             <p className="font-medium text-gray-500 text-sm -mt-1">5th Semester</p>
          </div>
          
        <div className="pr-1 pb-0.5 rounded-tl-sm text-zinc-400 font-medium absolute right-0 bottom-0 text-sm">
          2082-12-10 12:10:30
        </div>
        </div>
        <div className="p-1">
          <textarea
            rows={3}
            value={post.caption}
            autoFocus={true}
            className="w-full px-2 min-h-20 max-h-50 py-1 bg-blue-100 rounded my-1 shadow text-gray-700 focus:outline-blue-300"
            placeholder="Enter Caption Here ..."
            onChange={(e) =>
              setPost((prev) => ({ ...prev, caption: e.target.value }))
            }
          />
           {/*Use condition to show the photo  */}
            <div className="w-50 relative">
              <img src="/image.png" alt="Post photo" 
              className="rounded-md" />
            </div>
          
          <div className="mt-2 text-lg font-semibold">
            <input
              type="file"
              accept="image/*"
              hidden={true}
              id="photoInput"
              onChange={(e) =>
                setPost((prev) => ({ ...prev, photo: e.target.files[0] }))
              }
            />
            <button className="w-full mt-2 bg-blue-300/90 rounded-sm py-1 text-zinc-800 hover:bg-blue-400/80 active:scale-97 ease-in duration-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </OverlayScreen>
  );
};

export default EditPost;
