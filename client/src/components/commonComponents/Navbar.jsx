import { useEffect, useRef, useState } from "react";
import ProfilePhoto from "./ProfilePhoto";
import { NavLink, Link } from "react-router-dom";
import { GrHomeRounded, GrSearch } from "react-icons/gr";
import { RiTelegram2Fill } from "react-icons/ri";
import { MdNotificationsNone } from "react-icons/md";
import { PiFilesBold } from "react-icons/pi";
import ProfileViewer from "../profileComponents/ProfileViewer";
import { RxArrowTopRight } from "react-icons/rx";
import { TbMessageReport } from "react-icons/tb";

export const Navbar = () => {
  return (
    <nav className="z-50 h-15 bg-white shadow flex justify-between items-center px-3 md:px-10 fixed top-0 right-0 left-0">
      {/* Logo Component from Same Page.... */}
      <Logo />

      {/* Navigation Link Component from Same page... */}
      <NavigationLink />
    </nav>
  );
};

// Logo Component
function Logo() {
  return (
    <Link to={"/"}>
      <div className="-mt-2 pl-2 sm:pl-0 inline-block font-extrabold hover:scale-102 ease duration-200 active:scale-97">
        <span className=" text-lg sm:text-2xl bg-linear-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
          FWU Sathi
        </span>
        <span className="text-3xl text-orange-600">.</span>
      </div>
    </Link>
  );
}

// Navigation Link Components
function NavigationLink() {
  return (
    <div className="flex justify-center items-center gap-5 sm:gap-7">
      <ul className="flex flex-1 justify-between gap-4 sm:gap-5">
        <li>
          <NavLink
            className={({ isActive }) =>
              `text-gray-500 nav-link hover:text-blue-800 ${isActive ? "active" : ""}`
            }
            to={"/"}
            title="Home"
          >
            <GrHomeRounded className="hover-scale text-[15px] sm:text[19px]  md:text-[23px] " />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `text-gray-500 nav-link hover:text-blue-800 ${isActive ? "active" : ""}`
            }
            to={"/search"}
            title="Search"
          >
            <GrSearch className="hover-scale text-[15px] sm:text[19px]  md:text-[23px] " />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `text-gray-500 nav-link hover:text-blue-800 ${isActive ? "active" : ""}`
            }
            to={"/chat"}
            title="Chats"
          >
            <RiTelegram2Fill className="hover-scale text-[17px] sm:text[21px] md:text-[25px] " />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `text-gray-500 nav-link hover:text-blue-800 ${isActive ? "active" : ""}`
            }
            to={"/notification"}
            title="Notifications"
          >
            <MdNotificationsNone className="hover-scale text-[17px] sm:text[21px]  md:text-[25px] " />
          </NavLink>
        </li>

        {/* Short Circuit Report Navigation Menu.... I.e. Only show it to the admin. */}
        {false && (
          <li>
            <NavLink
              className={({ isActive }) =>
                `text-gray-500 nav-link hover:text-blue-800 ${isActive ? "active" : ""}`
              }
              to={"/report"}
              title="Report"
            >
              <TbMessageReport className="hover-scale text-[17px] sm:text[21px]  md:text-[25px] " />
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            className={({ isActive }) =>
              `text-gray-500 nav-link hover:text-blue-800 ${isActive ? "active" : ""}`
            }
            to={"/notes"}
            title="Notes"
          >
            <PiFilesBold className="hover-scale text-[17px] sm:text[21px]  md:text-[25px] " />
          </NavLink>
        </li>
      </ul>

      <div className="relative">
        {/* Show Profile in case of Login and Login button if not loggedin... */}
        {true ? <ProfileIcon /> : <LoginButton />}
      </div>
    </div>
  );
}

// Login Button Component....
function LoginButton() {
  return (
    <Link
      to={"/login"}
      className="bg-blue-700 px-2 py-1 sm:px-3 sm:py-2 rounded-md hover-scale flex items-center gap-1 opacity-90 hover:opacity-100 text-white"
    >
      <span className="text-[15px] sm:text-sm lg:text-md font-medium">
        Login
      </span>
      <RxArrowTopRight className="size-4" />
    </Link>
  );
}

// ProfileIcon component..
function ProfileIcon() {
  const [profileViewer, setProfileViewer] = useState(false);
  const profileRef = useRef(null);

  // Check if our referenced component exists or not, And if it exists then, check if contains the clicked element or not. If it contains then condition fails, if it doesnt contain then the condition is satisfied, And hence, the setProfileViewer() function is invoked.
  function handleOutsideClick(e) {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setProfileViewer(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  return (
    <>
      <button
        className="bg-red-500 rounded-full"
        onClick={() => setProfileViewer((prev) => !prev)}
      >
        <ProfilePhoto />
      </button>
      {profileViewer && <div ref={profileRef}>{<ProfileViewer />}</div>}
    </>
  );
}
