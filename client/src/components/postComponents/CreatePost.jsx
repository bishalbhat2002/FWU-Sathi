import { useEffect, useState, useRef } from "react";
import OverlayScreen from "../../layouts/OverlayScreen";
import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { validateImage } from "../../utilities/validatePhoto";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { postCreateThunk } from "../../store/features/post/post.thunk";
import { getSemesterName } from "../../utilities/getSemName";
import { setSuccess } from "../../store/features/post/post.slice";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state.userReducer.userProfile); // State to represent user profile..
  const loader = useSelector((state) => state.postReducer.loader); // State to represent if post is being upload or not
  const success = useSelector((state) => state.postReducer.success); // State to represent if post is successfully uploaded or not

  const [post, setPost] = useState({
    caption: "",
    photo: null,
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch(setSuccess(false));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (!loader && success) {
      navigate("/");
    }
  }, [success, loader]);

  function handleImageChange(e) {
    const image = e.target.files[0];
    if (!image) {
      return;
    }
    const { valid, message } = validateImage(image);
    // console.log(valid, message);

    // if photo is invalid, show error and make the photo state null.
    if (!valid) {
      toast.error(message);
      setPost((prev) => ({
        ...prev,
        photo: null,
      }));
      e.target.value = "";
      return;
    }

    // If photo is valid, then save it in state.
    setPost((prev) => ({
      ...prev,
      photo: e.target.files[0],
    }));
  }

  function handlePostCreate(e) {
    e.preventDefault();

    if (!post.caption) {
      toast.error("Caption cannot be empty.");
      return;
    }

    if (post.caption.length < 10 || post.caption.length > 500) {
      toast.error("Caption must be between 10-500 characters.");
      return;
    }

    // send data to backend....
    dispatch(postCreateThunk(post));
  }

  /**
   * GSAP Animation Code
   */
  const postCreateBtnRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  useGSAP(() => {
    // Animate the post create container when it mounts
    if (!isClosing) {
      gsap.from(postCreateBtnRef.current, {
        opacity: 0,
        y: "100",
        duration: 0.4,
        delay: 0.1,
        ease: "power2.out",
      });
    }

    // Animate the post create container when it unmounts
    if (isClosing) {
      gsap.to(postCreateBtnRef.current, {
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
        ref={postCreateBtnRef}
        className="bg-white max-w-130 w-full bg-white-600 border-1 rounded-md border-gray-300 relative"
      >
        <div className="flex gap-4 p-2 items-center border-b border-black/20 relative">
          <ProfilePhoto
            imgSrc={userProfile.photo}
            className="h-15 w-15 no-scale-on-hover"
          />
          <div>
            <h2 className="font-bold text-xl text-zinc-700">
              {userProfile.name}
            </h2>
            <p className="font-medium text-gray-500 text-sm -mt-1">
              {getSemesterName(userProfile.semester)} Semester
            </p>
          </div>

          <div className="pr-1 pb-0.5 rounded-tl-sm text-zinc-400 font-medium absolute right-0 text-sm bottom-0">
            {/* 2082-12-10 12:10:30 */}
            {new Date().toLocaleString("en-NP")}
          </div>
        </div>

        {/* Post Writing and Photo Upload code... */}
        <form
          onSubmit={handlePostCreate}
          encType="multipart/form-data"
          className="p-1"
        >
          <textarea
            rows={3}
            value={post.caption}
            autoFocus={true}
            className="w-full px-2 min-h-20 max-h-50 py-1 bg-blue-100 rounded shadow text-gray-700 focus:outline-blue-300"
            placeholder="Enter Text Here ..."
            onChange={(e) =>
              setPost((prev) => ({ ...prev, caption: e.target.value }))
            }
          />

          {/* Show the uploaded photo.... */}
          {post.photo && (
            <div className="inline-block relative bg-blue-300">
              <button
                onClick={(e) => setPost((prev) => ({ ...prev, photo: null }))}
                className="rounded-full p-1 bg-zinc-100 absolute right-2 top-2 hover-scale"
              >
                <RxCross2 className="size-4 text-zinc-700 hover-scale" />
              </button>
              <img
                src={URL.createObjectURL(post.photo)}
                alt="Post photo"
                className="rounded-md border-1 border-black/30 max-h-50"
              />
            </div>
          )}

          {/* Take the input Photo from the user.... */}
          <div className="mt-2 text-lg font-semibold">
            <input
              type="file"
              accept="image/*"
              hidden={true}
              id="photoInput"
              onChange={handleImageChange}
            />

            {/* Upload photo button */}
            <button
              type="button"
              onClick={() => document.getElementById("photoInput").click()}
              className="w-full bg-zinc-200 hover:bg-zinc-300 rounded-sm py-1 text-zinc-800 active:scale-97 ease-in duration-200"
            >
              {post.photo ? "Change Photo" : "Upload Photo"}
            </button>

            {/* Post button.... */}
            <button className="w-full mt-2 bg-blue-300/80 rounded-sm py-1 text-zinc-800 hover:bg-blue-400/70 active:scale-97 ease-in duration-200">
              {loader ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </OverlayScreen>
  );
};

export default CreatePost;
