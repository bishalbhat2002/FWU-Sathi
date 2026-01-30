import { useState } from "react";
import OverlayScreen from "../../layouts/OverlayScreen";
import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const [post, setPost] = useState({
    caption: "",
    photo: null,
  });

  return (
    <OverlayScreen>
      <div className="bg-white max-w-130 w-full bg-white-600 border-1 rounded-md border-gray-300">
        <div className="flex gap-4 p-2 items-center border-b border-black/20 relative">
          <ProfilePhoto className="h-15 w-15 no-scale-on-hover" />
          <div>
            <h2 className="font-bold text-xl text-zinc-700">Bishal Bhat</h2>
            <p className="font-medium text-gray-500 text-sm -mt-1">5th Semester</p>
          </div>
          <Link
            to={"/"}
            className="rounded-full p-1 bg-zinc-200 hover:bg-zinc-400 group absolute right-3 top-3 hover-scale"
          >
            <RxCross2 className="size-6 text-zinc-500 group-hover:text-white group-hover:hover-scale" />
          </Link>
        <div className="pr-1 pb-0.5 rounded-tl-sm text-zinc-400 font-medium absolute right-0 bottom-0">
          2082-12-10 12:10:30
        </div>
        </div>

        {/* Post Writing and Photo Upload code... */}
        <div className="p-1">
          <textarea
            rows={3}
            value={post.caption}
            className="w-full px-2 min-h-20 max-h-50 py-1 border-1 border-black/30 rounded shadow text-gray-700 focus:outline-none"
            placeholder="Enter Text Here ..."
            onChange={(e) =>
              setPost((prev) => ({ ...prev, caption: e.target.value }))
            }
          />

          {/* Show the uploaded photo.... */}
          {post.photo && (
            <div className="w-50 relative">
              <button
                onClick={(e)=>setPost((prev)=>({...prev, photo:null}))}
              className="rounded-full p-1 bg-zinc-100 absolute right-3 top-3 hover-scale">
                <RxCross2 className="size-4 text-zinc-700 hover-scale" />
              </button>
              <img src={URL.createObjectURL(post.photo)} alt="Post photo" 
              className="rounded-md border-1 border-black/30" />
            </div>
          )}

          {/* Take the input Photo from the user.... */}
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

            {/* Upload photo button */}
            <button
              onClick={() => document.getElementById("photoInput").click()}
              className="w-full bg-zinc-300 rounded-sm py-1 text-zinc-800 hover:opacity-90 active:scale-97 ease-in duration-200"
            >
              {post.photo ? "Change Photo":"Upload Photo"}
            </button>

            {/* Post button.... */}
            <button className="w-full mt-2 bg-blue-300 rounded-sm py-1 text-zinc-800 hover:bg-blue-400 active:scale-97 ease-in duration-200">
              Post
            </button>
          </div>
        </div>
      </div>
    </OverlayScreen>
  );
};

export default CreatePost;
