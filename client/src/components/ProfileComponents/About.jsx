import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

// Component to display other profile details...
export const About = () => {
  return (
    <>
      <div className="w-full mt-5 sm:mt-0 rounded-sm bg-white border-1 border-zinc-300 px-4 py-2 about-shadow relative">
        <Link
          to={"edit"}
          className="bg-zinc-300 rounded-full p-1 text-zinc-800 hover:opacity-90 border-3 hover:scale-120 border-white active:scale-97 ease-in duration-200 absolute right-2"
        >
          <MdModeEdit className="-rotate-15 size-4 text-zinc-800" />
        </Link>
        <p className="text-sm font-semibold text-gray-700 line-clamp-1">
          Email: bishalbhatddss@gmail.com
        </p>
        <p className="text-sm font-semibold text-gray-700 line-clamp-1">
          Gender: Male
        </p>
        <p className="text-sm font-semibold text-gray-700 line-clamp-1">
          Program: BSc.CSIT
        </p>
        <p className="text-sm font-semibold text-gray-700 line-clamp-1">
          College: FWU
        </p>
        <p className="text-sm font-semibold text-gray-700 line-clamp-1">
          Address: MNR
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
