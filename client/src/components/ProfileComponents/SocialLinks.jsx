import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaYoutube,
} from "react-icons/fa";

const SocialLinks = () => {
  return (
    <div className="rounded-md p-3 mt-5 sm:mt-0 border-1 border-gray-400 flex gap-3">
      <Link to={""} title="facebook" className="group">
        <FaFacebook className="text-3xl sm:text-4xl text-gray-700 hover:text-white  rounded-lg group-hover:scale-105 ease-in duration-200 active:scale-95 group-hover:bg-zinc-500 bg-zinc-200 p-1.5" />
      </Link>
      <Link to={""} title="Instagram" className="group">
        <FaInstagram className="text-3xl sm:text-4xl text-gray-700 hover:text-white  rounded-lg group-hover:scale-105 ease-in duration-200 active:scale-95 group-hover:bg-zinc-500 bg-zinc-200 p-1.5" />
      </Link>
      <Link to={""} title="Linkedln" className="group">
        <FaLinkedin className="text-3xl sm:text-4xl text-gray-700 hover:text-white  rounded-lg group-hover:scale-105 ease-in duration-200 active:scale-95 group-hover:bg-zinc-500 bg-zinc-200 p-1.5" />
      </Link>
      <Link to={""} title="Github" className="group">
        <FaGithub className="text-3xl sm:text-4xl text-gray-700 hover:text-white  rounded-lg group-hover:scale-105 ease-in duration-200 active:scale-95 group-hover:bg-zinc-500 bg-zinc-200 p-1.5" />
      </Link>
      <Link to={""} title="Youtube" className="group">
        <FaYoutube className="text-3xl sm:text-4xl text-gray-700 hover:text-white  rounded-lg group-hover:scale-105 ease-in duration-200 active:scale-95 group-hover:bg-zinc-500 bg-zinc-200 p-1.5" />
      </Link>
      <Link to={""} title="Website" className="group">
        <FaGlobe className="text-3xl sm:text-4xl text-gray-700 hover:text-white  rounded-lg group-hover:scale-105 ease-in duration-200 active:scale-95 group-hover:bg-zinc-500 bg-zinc-200 p-1.5" />
      </Link>
    </div>
  );
};

export default SocialLinks;
