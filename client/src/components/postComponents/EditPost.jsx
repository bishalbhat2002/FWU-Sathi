import { useEffect, useRef, useState } from "react";
import OverlayScreen from "../../layouts/OverlayScreen";
import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSemesterName } from "../../utilities/getSemName";
import { getImageUrl } from "../../utilities/getImageUrl";
import { editPostThunk } from "../../store/features/post/post.thunk";
import { setEditPostSuccess } from "../../store/features/post/post.slice";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);
  const loader = useSelector((state) => state.postReducer.loader);
  const editPostSuccess = useSelector(
    (state) => state.postReducer.editPostSuccess,
  );
  const post = posts.find((post) => post?._id === postId);

  const [caption, setCaption] = useState(post?.caption);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch(setEditPostSuccess(false));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (!loader && editPostSuccess) {
      navigate(-1);
    }
  }, [editPostSuccess, loader]);

  function handlePostEdit() {
    dispatch(editPostThunk({ caption, postId }));
  }

  /**
   * GSAP Animation Code
   */
  const postEditBtnRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  useGSAP(() => {
    // Animate the post create container when it mounts
    if (!isClosing) {
      gsap.from(postEditBtnRef.current, {
        opacity: 0,
        y: "100",
        duration: 0.4,
        delay: 0.1,
        ease: "power2.out",
      });
    }

    // Animate the post create container when it unmounts
    if (isClosing) {
      gsap.to(postEditBtnRef.current, {
        opacity: 0,
        scale: 0.3,
        y: "100%",
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          navigate(-1);
        },
      });
    }
  }, [isClosing]);

  return (
    <OverlayScreen>
      <button
        onClick={() => setIsClosing(true)}
        className="rounded-full p-1 bg-gray-800 absolute border-2 border-white right-3 top-3 hover-scale"
      >
        <RxCross2 className="size-6 text-white hover-scale" />
      </button>

      <div
        ref={postEditBtnRef}
        className="bg-white max-w-130 w-full bg-white-600 border rounded-md border-gray-300 relative"
      >
        <span className="absolute right-0 text-sm sm:text-md bg-green-100 rounded-bl px-2 py-1 font-medium text-zinc-500">
          You are Editing this post.
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
          <textarea
            rows={3}
            value={caption}
            autoFocus={true}
            className="w-full px-2 min-h-20 max-h-50 py-1 bg-blue-100 rounded my-1 shadow text-gray-700 focus:outline-blue-300"
            placeholder="Enter Caption Here ..."
            onChange={(e) => setCaption(e.target.value)}
          />

          {/*Use condition to show the photo  */}
          {post?.photo && (
            <div className="w-50 relative">
              <img
                src={getImageUrl(post?.photo)}
                alt="Post photo"
                className="rounded-md"
              />
            </div>
          )}

          <div className="mt-2 text-lg font-semibold">
            <button
              type="button"
              onClick={handlePostEdit}
              className="w-full mt-2 bg-blue-300/90 rounded-sm py-1 text-zinc-800 hover:bg-blue-400/80 active:scale-97 ease-in duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </OverlayScreen>
  );
};

export default EditPost;
