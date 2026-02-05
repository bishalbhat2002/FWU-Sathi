import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setProfileIndicator } from "../../store/features/user/user.slice";
import { logoutUserThunk } from "../../store/features/user/user.thunk";

const ProfileViewer = () => {

  const dispatch = useDispatch();
  const userProfile = useSelector(state=>state.userReducer.userProfile)

  function handleUserLogout(e){
    e.preventDefault();
    // Hide profile viewer popup box....
    dispatch(setProfileIndicator(false));

    dispatch(logoutUserThunk());
  }

  return (
    <>
      <div
        className="absolute inline-block bg-white shadow border border-black/20 right-0 top-11 px-2 py-2 rounded-md"
      >
        <Link
          to={"/profile"}
          onClick={(e)=>{dispatch(setProfileIndicator(false))}}
          className="w-full shadow border-1 border-black/20 px-2 py-1 rounded-sm flex gap-2 group"
        >
          <ProfilePhoto imgSrc={userProfile.photo} className={"no-scale-on-hover"} />
          <div>
            <h3 className="text-sm md:text-md font-semibold text-gray-700">
              {userProfile.name}
            </h3>
            <p className="text-[10px] group-hover:hover-scale text-gray-500">
              {userProfile.email}
            </p>
          </div>
        </Link>
        <button
          onClick={handleUserLogout}
          className="w-full shadow border-1 border-black/20 px-2 py-1 rounded-sm flex gap-2 mt-1.5 "
        >
          <div className="flex items-center gap-2 group">
            <MdLogout className="text-lg text-gray-600 group-hover:scale-105 duration-200 ease-in" />
            <h3 className="text-sm md:text-md font-semibold text-gray-600">
              Logout
            </h3>
          </div>
        </button>
      </div>
    </>
  );
};

export default ProfileViewer;
