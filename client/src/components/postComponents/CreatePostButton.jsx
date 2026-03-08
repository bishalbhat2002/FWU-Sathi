import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
import {useRef} from "react"
import {gsap} from "gsap"
import {useGSAP} from "@gsap/react"



const CreatePost = () => {
  const userProfile = useSelector((state) => state.userReducer.userProfile);
  const postCreateBtnRef = useRef(null);

  useGSAP(() => { 
    gsap.from(postCreateBtnRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      delay: 0.1,
      ease: "power2.out",
    })
  }, [])
  

  return (
    <div 
    ref={postCreateBtnRef}
    className="max-w-130 mx-auto border shadow border-black/10 px-2 py-2 mt-3 rounded-md bg-white/90 create-post-btn-hover">
      <Link to={"/post/create"} className="flex gap-3 items-center">
        <ProfilePhoto  imgSrc={userProfile?.photo} userId={userProfile?._id} />
        
        <p className="text-md text-gray-600">What's on your Mind, <b className="text-gray-500">{userProfile?.name}</b>?</p>
      </Link>
    </div>
  );
};

export default CreatePost;
