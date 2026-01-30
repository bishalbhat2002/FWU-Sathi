import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

const ProfilePicture = ({ className }) => {
  const [profilePicture, setProfilePicture] = useState(null);

  function handleProfileChange(e) {
    e.preventDefault();
    alert("Apli callll..");
  }

  const profileLink = (profilePicture && URL.createObjectURL(profilePicture))? URL.createObjectURL(profilePicture) : "luffy.png";

  return (
    <div
      className={`h-30 w-30 rounded-full bg-amber-50 border-3 relative border-blue-500 p-0.5 shadow-profile ${className} `}
    >
      <img 
      src={profileLink}
      alt="" className="h-full w-full object-cover object-center rounded-full overflow-hidden " />

      <div className="text-lg bg-cover font-semibold absolute bottom-0 right-0">
        <input
          type="file"
          accept="image/*"
          hidden={true}
          id="profilePhoto"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />

        <button
          onClick={() => document.getElementById("profilePhoto").click()}
          className="bg-zinc-300 rounded-full p-1 text-zinc-800 hover:opacity-90 border-3 border-white active:scale-97 ease-in duration-200"
        >
          <MdModeEdit className="-rotate-15 scale-80 text-zinc-800 hover-scale" />
        </button>
      </div>

      {profilePicture && (
        <div className="absolute -bottom-12 -left-[0.1rem] text-xs flex gap-2 bg-gray-800 px-3 py-2 rounded-sm ">
          <button
            onClick={handleProfileChange}
            autoFocus={true}
            className="w-20 text-white hover-scale bg-blue-500 opacity-90 hover:opacity-100 rounded-md px-2 py-1"
          >
            Save Profile
          </button>

          <button
            onClick={(e) => setProfilePicture(null)}
            className="text-white hover-scale bg-zinc-500 opacity-90 hover:opacity-100 rounded-md px-2 py-1 text-xs"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
