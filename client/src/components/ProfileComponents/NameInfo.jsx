import { Link } from "react-router-dom";
import { getSemesterName } from "../../utilities/getSemName";
import { useSelector } from "react-redux";


// Component to Display the Names Semester and Password Change feature...
export const NameInfo = () => {

  const profileInfo = useSelector((state) => state.userReducer.profileInfo);
  console.log(profileInfo)
  
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 ">{profileInfo?.name} </h2>
      <h2 className="text-sm font-medium text-gray-700 -mt-0.5 mb-1.5 relative">
        {getSemesterName(profileInfo?.semester)} Semester 
            {profileInfo?.role && <span className="role-class">{profileInfo?.role === "admin" ? "admin" : "student" } </span> }
      </h2>
      <Link
        to={"/profile/change-password"}
        className="hover-scale bg-gray-100 p-1 border-1 border-zinc-400 hover:bg-gray-400 hover:text-white text-zinc-600 rounded font-medium text-xs lg:text-sm"
      >
        Change Password
      </Link>
    </div>
  );
};
