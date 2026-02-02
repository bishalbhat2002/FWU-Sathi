import { Link } from "react-router-dom";
import ProfilePhoto from "../commonComponents/ProfilePhoto";


// One Report Link code...
export const ReportLink = ()=> {
  return (
    <Link
      // to={"/report/resolve-comment"}
      to={"/report/resolve-message"}
      // to={"/report/resolve-post"}
      className="w-full shadow-notes p-2 px-4 rounded-sm hover-scale-sm flex items-center bg-white relative gap-3"
    >
      <ProfilePhoto />
      <p className=" font-medium text-xs sm:text-sm md:text-md lg:text-lg text-zinc-60">
        <b>Bishal Bhat</b> has reported a Post.
      </p>
      <small className="text-sm font-semibold text-gray-500 absolute bottom-1 right-2">
        2002-12-12 &nbsp; 10:12:50
      </small>
    </Link>
  );
}

