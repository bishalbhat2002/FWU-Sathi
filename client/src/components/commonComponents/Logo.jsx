import { Link } from "react-router-dom";

export const Logo = ()=>{
  return (
    <Link to={"/"}>
      <div className="-mt-2 pl-2 sm:pl-0 inline-block font-extrabold hover:scale-102 ease duration-200 active:scale-97">
        <span className=" text-xl sm:text-2xl bg-linear-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">FWU Sathi</span>
        <span className="text-3xl text-orange-500">.</span>
      </div>
    </Link>
  );
}