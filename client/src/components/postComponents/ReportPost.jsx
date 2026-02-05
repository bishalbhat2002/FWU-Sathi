import { useNavigate, useParams } from "react-router-dom";
import OverlayScreen from "../../layouts/OverlayScreen";
import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getSemesterName } from "../../utilities/getSemName";
import { getImageUrl } from "../../utilities/getImageUrl";
import { reportPostThunk } from "../../store/features/post/post.thunk";
import { useEffect } from "react";
import { setSuccess } from "../../store/features/post/post.slice";

const ReportPost = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { postId } = useParams();
  const posts = useSelector((state) => state.postReducer.posts);
  const post = posts.find((post) => post._id === postId);

  const loader = useSelector((state) => state.postReducer.loader);
  const success = useSelector((state) => state.postReducer.success);
  const [ready, setReady] = useState(false);

  const [report, setReport] = useState("");

  function handlePostReport() {
    setReady(true);
    dispatch(reportPostThunk({ report, postId }));
  }

  useEffect(() => {
    dispatch(setSuccess(false));
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (!loader && success) {
      navigate(-1);
    }
  }, [success, loader]);

  return (
    <OverlayScreen>
      <button
        onClick={() => navigate(-1)}
        className="rounded-full p-1 bg-gray-800 absolute border-2 border-white right-3 top-3 hover-scale"
      >
        <RxCross2 className="size-6 text-white hover-scale" />
      </button>

      <div className="bg-white max-w-130 w-full bg-white-600 border-1 rounded-md border-gray-300 relative overflow-hidden">
        <span className="absolute right-0 text-sm sm:text-md bg-orange-100 rounded-bl px-2 py-1 font-medium text-zinc-500">
          You are reporting this post...
        </span>

        <div className="flex gap-4 p-2 items-center border-b border-gray-300 shadow relative">
          <ProfilePhoto
            imgSrc={post?.userId?.photo}
            className="h-15 w-15 no-scale-on-hover"
          />
          <div>
            <h2 className="font-bold text-xl text-zinc-700">
              {post?.userId?.name}
            </h2>
            <p className="font-medium text-gray-500 text-sm -mt-1">
              {getSemesterName(post?.semester)} Semester
            </p>
          </div>

          <div className="pr-1 pb-0.5 rounded-tl-sm text-zinc-400 font-medium absolute right-0 bottom-0 text-sm">
            {new Date(post?.createdAt).toLocaleString("en-Np")}
          </div>
        </div>
        <div className="p-1">
          <p className="w-full px-2 max-h-50 py-1 shadow text-gray-600 border border-black/10 rounded line-clamp-3">
            {post?.caption}
          </p>

          {/*Use condition to show the photo  */}
          {post.photo && (
            <div className="w-50 my-2 pl-1 relative">
              <img
                src={getImageUrl(post?.photo)}
                alt="Post photo"
                className="rounded-md border border-black/10"
              />
            </div>
          )}

          <div className="mt-2 text-md font-medium">
            <input type="file" accept="image/*" hidden={true} id="photoInput" />

            <textarea
              rows={3}
              autoFocus={true}
              value={report}
              onChange={(e) => setReport(e.target.value)}
              className="w-full px-2 min-h-20 max-h-50 py-1 bg-blue-100 text-gray-700 focus:outline-blue-300 border border-black/10 rounded"
              placeholder="Your Report Here ..."
            />

            <button
              type="button"
              onClick={handlePostReport}
              className="w-full mt-2 bg-blue-300 rounded-sm py-1 text-zinc-800 hover:bg-blue-400 hover:text-white active:scale-97 ease-in duration-200"
            >
              {loader ? "Reporting Post, Please wait..." : "Report Post."}
            </button>
          </div>
        </div>
      </div>
    </OverlayScreen>
  );
};

export default ReportPost;
