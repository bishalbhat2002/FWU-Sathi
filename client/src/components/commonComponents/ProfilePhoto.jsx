import { getImageUrl } from "../../utilities/getImageUrl";
import { useSelector } from "react-redux";

const ProfilePhoto = ({ imgSrc, userId = "" }) => {
  const userProfile = useSelector((state) => state.userReducer.userProfile);
  const onlineUsers = useSelector((state) => state.socketReducer.onlineUsers);

  const isOnline = onlineUsers?.includes(userId) && userId !== userProfile._id;

  return (
    <div
      className={`overflow-hidden h-10 w-10 rounded-full ${isOnline ? "show-user-active" : "border-2 border-blue-500"} bg-amber-50 hover:scale-104 ease duration-200 active:scale-97`}
    >
      {/* <img src={imgSrc} alt="" className='scale-107'/> */}
      <img
        src={getImageUrl(imgSrc)}
        alt=""
        className={`h-full w-full object-cover object-center rounded-full overflow-hidden`}
      />
    </div>
  );
};

export default ProfilePhoto;
