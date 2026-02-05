import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Component to display other profile details...
export const About = () => {
  const profileInfo = useSelector((state) => state.userReducer.profileInfo);
  const userProfile = useSelector((state) => state.userReducer.userProfile);

  return (
    <>
      <div className="w-full mt-5 sm:mt-0 rounded-sm bg-white border-1 border-zinc-300 px-4 py-2 about-shadow relative">
       {/* Show edit option only if the profile matched to logged in user... */}
        {userProfile?._id === profileInfo?._id && (
          <Link
            to={"edit"}
            className="bg-zinc-300 rounded-full p-1 text-zinc-800 hover:opacity-90 border-3 hover:scale-120 border-white active:scale-97 ease-in duration-200 absolute right-2"
          >
            <MdModeEdit className="-rotate-15 size-4 text-zinc-800" />
          </Link>
        )}
        <p className="text-sm font-semibold text-gray-700 line-clamp-1">
          Email: {profileInfo?.email}
        </p>
        <p className="text-sm font-semibold text-gray-700 line-clamp-1">
          Gender: {profileInfo?.gender}
        </p>
        <p className="text-sm font-semibold text-gray-700 line-clamp-1">
          Program: {profileInfo?.program}
        </p>
        <p className="text-sm font-semibold text-gray-700 line-clamp-1">
          College: {profileInfo?.college}
        </p>
        <p className="text-sm font-semibold text-gray-700 line-clamp-1">
          Address: {profileInfo?.address}
        </p>
      </div>

      <div className="text-center pt-6 pb-2">
        <button
          disabled={true}
          className="bg-blue-300 px-4 py-1 rounded font-medium text-white animate-bounce"
        >
          All Posts <span>⬇️</span>{" "}
        </button>
      </div>
    </>
  );
};
