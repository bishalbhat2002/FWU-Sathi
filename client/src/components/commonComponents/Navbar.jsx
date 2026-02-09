import { useEffect, useRef, useState } from "react";
import ProfilePhoto from "./ProfilePhoto";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { GrHomeRounded, GrSearch } from "react-icons/gr";
import { RiTelegram2Fill } from "react-icons/ri";
import { MdNotificationsNone } from "react-icons/md";
import { PiFilesBold } from "react-icons/pi";
import ProfileViewer from "../profileComponents/ProfileViewer";
import { RxArrowTopRight } from "react-icons/rx";
import { TbMessageReport } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import {
  setProfileIndicator,
  toggleProfileIndicator,
} from "../../store/features/user/user.slice";
import { Logo } from "./Logo";

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
        <ProfileIcon />
      </div>
    </div>
  );
}



// ProfileIcon component..
function ProfileIcon() {
  const profileIndicator = useSelector(
    (state) => state.userReducer.profileIndicator,
  );
  const userProfile = useSelector(state=>state.userReducer.userProfile)
  const dispatch = useDispatch();

  const profileRef = useRef(null);
  const profileIconRef = useRef(null);

  console.log(userProfile);


  // Check if our referenced component exists or not, And if it exists then, check if contains the clicked element or not. If it contains then condition fails, if it doesnt contain then the condition is satisfied, And hence, the setProfileViewer() function is invoked.
  function handleOutsideClick(e) {
    if (
      profileRef.current &&
      profileIconRef.current &&
      !profileRef.current.contains(e.target) &&
      !profileIconRef.current.contains(e.target)
    ) {
      // setProfileViewer(false);
      dispatch(setProfileIndicator(false));
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
        ref={profileIconRef}
        className="bg-red-500 rounded-full"
        onClick={() => {
          dispatch(setProfileIndicator(!profileIndicator));
        }}
      >
        <ProfilePhoto imgSrc={userProfile.photo} />
      </button>
      {profileIndicator && <div ref={profileRef}>{<ProfileViewer />}</div>}
    </>
  );
}
