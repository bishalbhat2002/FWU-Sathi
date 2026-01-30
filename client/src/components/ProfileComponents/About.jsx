import { Link } from "react-router-dom";


// Component to display other profile details...
export const About = ()=>{
  return (
    <>
      <div className="w-full mt-5 sm:mt-0 rounded-sm bg-gray-200 border-1 border-zinc-300 px-4 py-2 about-shadow">
        <p className="text-sm font-bold text-gray-700 line-clamp-1">
          Email: bishalbhatddss@gmail.com
        </p>
        <p className="text-sm font-bold text-gray-700 line-clamp-1">
          Gender: Male
        </p>
        <p className="text-sm font-bold text-gray-700 line-clamp-1">
          Program: BSc.CSIT
        </p>
        <p className="text-sm font-bold text-gray-700 line-clamp-1">
          College: FWU
        </p>
        <p className="text-sm font-bold text-gray-700 line-clamp-1">
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
}