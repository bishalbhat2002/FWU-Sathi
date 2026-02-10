import { Link } from "react-router-dom";
import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { getSemesterName } from "../../utilities/getSemName";
import { useSelector } from "react-redux";

export const User = ({ user }) => {
  const userProfile = useSelector((state) => state.userReducer.userProfile);

  return (
    <Link
      to={`/profile/${user._id !== userProfile._id ? user._id : ""}`}
      className="min-w-90 max-w-120 sm:min-w-75  bg-linear-to-r from-indigo-100 to-blue-100 shadow px-3 py-2 rounded-md flex gap-3"
    >
      <ProfilePhoto imgSrc={user?.photo} userId={user?._id} className={"h-22 w-22 "} />
      <NameInfo user={user} />
    </Link>
  );
};

// Searched User Other Info...
function NameInfo({ user }) {
  return (
    <div className="font-bold text-sm w-fill">
      <h2 className="text-lg text-gray-700 line-clamp-1">{user?.name}</h2>
      <h3 className="text-sm text-gray-600 line-clamp-1">
        {" "}
        {getSemesterName(user.semester)} Sem - {user.program}
      </h3>
      <h3 className="text-xs text-gray-500 line-clamp-1">{user.college}</h3>
      <h3 className="text-xs text-gray-400 line-clamp-1">{user.address}</h3>
    </div>
  );
}
