
import { RxArrowTopRight } from "react-icons/rx";
import { Link } from "react-router-dom";

export const AuthHeader = ()=>{
  return (
    <nav className="z-50 h-15 bg-white shadow flex justify-center items-center px-3 sm:px-20 fixed top-0 right-0 left-0">
      <div className="w-50 flex items-center justify-center font-extrabold text-2xl sm:text-3xl text-[var(--logo-primary-color)]">
        FWU Sathi
        <span className="sm:text-3xl text-[var(--logo-secondary-color)]">.</span>
      </div>
      <Link to={"/"}
      className="bg-gray-800 px-3 py-2 rounded hover-scale flex items-center gap-1 absolute right-3 opacity-60 hover:opacity-100 text-white">
          <span className="text-xs md:text-md  font-medium hidden sm:block">Visit Website</span>
          <RxArrowTopRight className="size-4" />
      </Link>
    </nav>
  );
}
