import { useState } from "react";
import ProfilePhoto from "./ProfilePhoto";
import { NavLink, Link } from "react-router-dom";
import { GrHomeRounded, GrSearch } from "react-icons/gr";
import { RiTelegram2Fill } from "react-icons/ri";
import { MdNotificationsNone } from "react-icons/md";
import { PiFilesBold } from "react-icons/pi";
import ProfileViewer from "../profileComponents/ProfileViewer";

export const Navbar = () => {
  const [profileViewer, setProfileViewer] = useState(false);

  function handleProfileView(e){
    e.preventDefault();
    setProfileViewer(!profileViewer);
  }

  return (
    <nav className="z-50 h-15 bg-white shadow flex justify-between items-center px-3 md:px-10 fixed top-0 right-0 left-0">
      <Link to={"/"}>
        <div className="-mt-2 w-28 inline-block font-extrabold text-xl text-[var(--logo-primary-color)] hover:scale-102 size-[20px] ease duration-200 active:scale-97">
          FWU Sathi
          <span className="text-3xl text-[var(--logo-secondary-color)]">.</span>
        </div>
      </Link>

      <div className="flex justify-center items-center gap-7">
        <ul className="flex flex-1 justify-between gap-5">
          <li>
            <NavLink
              className={({ isActive }) =>
                `text-gray-500 text-lg lg:text-xl nav-link hover:text-blue-800 ${isActive ? "active" : ""}`
              }
              to={"/"}
            >
              <GrHomeRounded className="hover-scale text-[22px]   md:text-[23px] " />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `text-gray-500 text-lg lg:text-xl nav-link hover:text-blue-800 ${isActive ? "active" : ""}`
              }
              to={"/search"}
            >
              <GrSearch className="hover-scale text-[22px]   md:text-[23px] " />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `text-gray-500 text-lg lg:text-xl nav-link hover:text-blue-800 ${isActive ? "active" : ""}`
              }
              to={"/chat"}
            >
              <RiTelegram2Fill className="hover-scale text-[23px] md:text-[25px] " />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `text-gray-500 text-lg lg:text-xl nav-link hover:text-blue-800 ${isActive ? "active" : ""}`
              }
              to={"/notification"}
            >
              <MdNotificationsNone className="hover-scale text-[23px]   md:text-[25px] " />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `text-gray-500 text-lg lg:text-xl nav-link hover:text-blue-800 ${isActive ? "active" : ""}`
              }
              to={"/notes"}
            >
              <PiFilesBold className="hover-scale text-[23px]   md:text-[25px] " />
            </NavLink>
          </li>
        </ul>
        <div className="relative">
          <button className="bg-red-500 rounded-full" onClick={handleProfileView}>
              <ProfilePhoto />
          </button>
        {
          profileViewer && <ProfileViewer />
        }
        </div>
      </div>
    </nav>
  );
};
