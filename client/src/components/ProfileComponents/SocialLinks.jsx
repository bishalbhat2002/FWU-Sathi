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
import { useSelector } from "react-redux";

const SocialLinks = () => {
  const profileInfo = useSelector((state) => state.userReducer.profileInfo);
  const hasSocialLinks =
    profileInfo?.facebook ||
    profileInfo?.instagram ||
    profileInfo?.linkedln ||
    profileInfo?.github ||
    profileInfo?.youtube ||
    profileInfo?.website;

  if (!hasSocialLinks) {
    return null;
  }

  return (
    <div className="rounded-md p-3  mt-5 sm:mt-0 border border-zinc-500/30 flex gap-3">
      {profileInfo?.facebook && (
        <a
          href={
            profileInfo.facebook?.includes("http")
              ? profileInfo.facebook
              : "https://" + profileInfo.facebook
          }
          target="_blank"
          rel="noopener noreferrer"
          title="facebook"
          className="group"
        >
          <FaFacebook className="text-3xl sm:text-4xl text-gray-700 hover:text-white rounded-lg group-hover:scale-105 ease-in duration-200 active:scale-95 group-hover:bg-zinc-500 bg-zinc-200 p-1.5" />
        </a>
      )}
      {profileInfo?.instagram && (
        <a
          href={
            profileInfo.instagram?.includes("http")
              ? profileInfo.instagram
              : "https://" + profileInfo.instagram
          }
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          className="group"
        >
          <FaInstagram className="text-3xl sm:text-4xl text-gray-700 hover:text-white rounded-lg group-hover:scale-105 ease-in duration-200 active:scale-95 group-hover:bg-zinc-500 bg-zinc-200 p-1.5" />
        </a>
      )}
      {profileInfo?.linkedln && (
        <a
          href={
            profileInfo.linkedln?.includes("http")
              ? profileInfo.linkedln
              : "https://" + profileInfo.linkedln
          }
          target="_blank"
          rel="noopener noreferrer"
          title="Linkedln"
          className="group"
        >
          <FaLinkedin className="text-3xl sm:text-4xl text-gray-700 hover:text-white rounded-lg group-hover:scale-105 ease-in duration-200 active:scale-95 group-hover:bg-zinc-500 bg-zinc-200 p-1.5" />
        </a>
      )}
      {profileInfo?.github && (
        <a
          href={
            profileInfo.github?.includes("http")
              ? profileInfo.github
              : "https://" + profileInfo.github
          }
          target="_blank"
          rel="noopener noreferrer"
          title="Github"
          className="group"
        >
          <FaGithub className="text-3xl sm:text-4xl text-gray-700 hover:text-white rounded-lg group-hover:scale-105 ease-in duration-200 active:scale-95 group-hover:bg-zinc-500 bg-zinc-200 p-1.5" />
        </a>
      )}
      {profileInfo?.youtube && (
        <a
          href={
            profileInfo.youtube?.includes("http")
              ? profileInfo.youtube
              : "https://" + profileInfo.youtube
          }
          target="_blank"
          rel="noopener noreferrer"
          title="Youtube"
          className="group"
        >
          <FaYoutube className="text-3xl sm:text-4xl text-gray-700 hover:text-white rounded-lg group-hover:scale-105 ease-in duration-200 active:scale-95 group-hover:bg-zinc-500 bg-zinc-200 p-1.5" />
        </a>
      )}
      {profileInfo?.website && (
        <a
          href={
            profileInfo.website?.includes("http")
              ? profileInfo.website
              : "https://" + profileInfo.website
          }
          target="_blank"
          rel="noopener noreferrer"
          title="Website"
          className="group"
        >
          <FaGlobe className="text-3xl sm:text-4xl text-gray-700 hover:text-white rounded-lg group-hover:scale-105 ease-in duration-200 active:scale-95 group-hover:bg-zinc-500 bg-zinc-200 p-1.5" />
        </a>
      )}
    </div>
  );
};

export default SocialLinks;
