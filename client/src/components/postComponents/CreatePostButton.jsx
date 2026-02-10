import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"

const CreatePost = () => {
  const userProfile = useSelector((state) => state.userReducer.userProfile);
  

  return (
    <div className="max-w-130 mx-auto border shadow border-black/10 px-2 py-2 mt-3 rounded-md bg-white/90">
      <Link to={"/post/create"} className="flex gap-3 items-center">
        <ProfilePhoto  imgSrc={userProfile?.photo} userId={userProfile?._id} />
        
        <p className="text-md text-gray-600">What's on your Mind, {userProfile?.name}?</p>
      </Link>
    </div>
  );
};

export default CreatePost;
