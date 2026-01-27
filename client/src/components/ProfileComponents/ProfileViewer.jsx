import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const ProfileViewer = () => {
  return (
    <div className="absolute inline-block bg-white/80 shadow border border-black/20 right-0 top-11 px-2 py-2 rounded-md">
      <Link to={"/profile"} className="shadow border-1 border-black/10 px-2 py-1 rounded-sm flex gap-2 group">
        <ProfilePhoto className={"no-scale-on-hover"} />
        <div >
         <h3 className="text-sm md:text-md font-semibold text-gray-700">Bisahl Bhat</h3>
          <p className="text-[10px] group-hover:hover-scale text-gray-500">
               bishalbhat2002@gmail.com
          </p>
        </div>
      </Link>
      <Link to={"/logout"} className="shadow border-1 border-black/10 px-2 py-1 rounded-sm flex gap-2 mt-1.5 ">
          <div className="flex items-center gap-2 group">
               <MdLogout className="text-lg text-gray-600 group-hover:scale-105 duration-200 ease-in" />
               <h3 className="text-sm md:text-md font-semibold text-gray-600">Logout</h3>
          </div>
      </Link>
    </div>
  );
};

export default ProfileViewer;
