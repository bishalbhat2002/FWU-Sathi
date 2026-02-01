import { useState } from "react";
import OverlayScreen from "../../layouts/OverlayScreen";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineMail } from "react-icons/md";

const ProfileEdit = () => {

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    program: "",
    semester: "",
    college: "",
    address: "",
    facebook: "",
    instagram: "",
    linkedln: "",
    github: "",
    youtube: "",
    website: "",
  });

  const [profileError, setProfileError] = useState({
    emailError: "",
    passwordError: "",
    nameError: "",
    genderError: "",
    programError: "",
    semesterError: "",
    collegeError: "",
    addressError: "",
    facebookError: "",
    instagramError: "",
    linkedlnError: "",
    githubError: "",
    youtubeError: "",
    websiteError: "",
  });

  function handleProfileDataChange(e) {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleProfileUpdateError(fieldName, errorMessage) {
    setProfileError((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));
  }

  function handleProfileUpdate(e) {
    e.preventDefault();
    let isValid = true;

    // Reset previous Errors...
    setProfileError((prev) => ({
      emailError: "",
      passwordError: "",
      nameError: "",
      genderError: "",
      programError: "",
      semesterError: "",
      collegeError: "",
      addressError: "",
      facebookError: "",
      instagramError: "",
      linkedlnError: "",
      githubError: "",
      youtubeError: "",
      websiteError: "",
    }));

    // Validate Data....
    if (profileData.email.length === 0) {
      isValid = false;
      handleProfileUpdateError("emailError", "Email is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      isValid = false;
      handleProfileUpdateError("emailError", "Invalid email format.");
    }

    if (profileData.name.length === 0) {
      isValid = false;
      handleProfileUpdateError("nameError", "Name is required.");
    } else if (profileData.name.length < 3 || profileData.name.length > 30) {
      isValid = false;
      handleProfileUpdateError(
        "nameError",
        "Name must be between 3-30 characters.",
      );
    }

    if (profileData.password.length === 0) {
      isValid = false;
      handleProfileUpdateError("passwordError", "Password is required.");
    } else if (
      profileData.password.length < 8 ||
      profileData.password.length > 16
    ) {
      isValid = false;
      handleProfileUpdateError(
        "passwordError",
        "Password must be between 3-30 characters.",
      );
    }

    if (profileData.program.length === 0) {
      isValid = false;
      handleProfileUpdateError("programError", "program is required..");
    } else if (
      profileData.program.length < 3 ||
      profileData.program.length > 30
    ) {
      isValid = false;
      handleProfileUpdateError(
        "programError",
        "program must be between 3-30 characters.",
      );
    }

    if (profileData.college.length === 0) {
      isValid = false;
      handleProfileUpdateError("collegeError", "College is required..");
    } else if (
      profileData.college.length < 3 ||
      profileData.college.length > 30
    ) {
      isValid = false;
      handleProfileUpdateError(
        "collegeError",
        "College must be between 3-30 characters.",
      );
    }

    if (profileData.address.length === 0) {
      isValid = false;
      handleProfileUpdateError("addressError", "Address is required.");
    } else if (
      profileData.address.length < 3 ||
      profileData.address.length > 30
    ) {
      isValid = false;
      handleProfileUpdateError(
        "addressError",
        "Address must be between 3-30 characters.",
      );
    }

    const semester = parseInt(profileData.semester);
    if (!semester) {
      isValid = false;
      handleProfileUpdateError("semesterError", "Semester is required..");
    } else if (semester < 1 || semester > 8) {
      isValid = false;
      handleProfileUpdateError(
        "semesterError",
        "Semester must be between 1-8.",
      );
    }

    if (profileData.gender === "") {
      isValid = false;
      handleProfileUpdateError("genderError", "Gender is required.");
    }

    const facebook = profileData.facebook?.trim();
    const instagram = profileData.instagram?.trim();
    const linkedln = profileData.linkedln?.trim();
    const github = profileData.github?.trim();
    const youtube = profileData.youtube?.trim();
    const website = profileData.website?.trim();

    let socialMedia = {};

    if (facebook) {
      if (facebook.includes("facebook.com/") && facebook.length < 30) {
        socialMedia.facebook = facebook;
      } else {
        isValid = false;
        handleProfileUpdateError("facebookError", "Facebook is invalid.");
      }
    }
    if (instagram) {
      if (instagram.includes("instagram.com/") && instagram.length < 30) {
        socialMedia.instagram = instagram;
      } else {
          isValid = false;
          handleProfileUpdateError("instagramError", "Instagram is invalid.");  
      }
    }
    if (linkedln) {
      if (linkedln.includes("linkedln.com/") && linkedln.length < 30) {
        socialMedia.linkedln = linkedln;
      } else {
          isValid = false;
          handleProfileUpdateError("linkedlnError", "Linkedln is invalid.");  
      }
    }
    if (github) {
      if (github.includes("github.com/") && github.length < 30) {
        socialMedia.github = github;
      } else {
          isValid = false;
          handleProfileUpdateError("githubError", "Github is invalid.");  
      }
    }
    if (youtube) {
      if (youtube.includes("youtube.com/") && youtube.length < 30) {
        socialMedia.youtube = youtube;
      } else {
          isValid = false;
          handleProfileUpdateError("youtubeError", "Youtube is invalid.");  
      }
    }
    if (website) {
      // Regular expresssion for Webstite URL..
      const websiteRegex =
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
      if (websiteRegex.test(website) && website.length < 50) {
        socialMedia.website = website;
      } else {
          isValid = false;
          handleProfileUpdateError("websiteError", "Website is invalid.");  
      }
    }

    console.log(socialMedia);

    console.log(profileData);
    // Return if not valid data is provided...
    if (!isValid) {
      return;
    }

    // Send the registration form data to backend....
  }

  return (
    <OverlayScreen>
      <button
        onClick={()=>navigate(-1)}        
        className="rounded-full p-1 bg-gray-400 hover:bg-gray-600 absolute right-5 top-5 z-10 hover-scale"
      >
        <RxCross2 className="size-6 text-white hover-scale" />
      </button>
      <form
        onSubmit={handleProfileUpdate}
        className="max-w-220 w-full max-h-[90%] overflow-scroll hide-scrollbar mx-3 my-5 bg-white shadow-edit-profile rounded-md p-5 flex flex-col gap-5 relative"
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 -mt-2 -mb-1">
          Edit Profile Info
        </h2>

        {/* Input Fields container. */}
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-4">
          {/* Name field continer.... */}
          <div className="flex flex-col gap-1 w-full relative">
            <label className="text-md text-zinc-500 font-medium" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleProfileDataChange}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {profileError.nameError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {profileError.nameError}
              </p>
            )}
          </div>

          {/* Email Input field container... */}
          <div className="flex flex-col gap-1 w-full relative">
            <label
              className="text-lg text-zinc-500 font-medium"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileDataChange}
              autoFocus={true}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            <MdOutlineMail className="size-5 absolute right-3 top-[2.6rem] text-gray-500" />

            {/* Show Errors If Exists.... */}
            {profileError.emailError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {profileError.emailError}
              </p>
            )}
          </div>

          {/* Gender field continer.... */}
          <div className="flex flex-col gap-1 w-full relative">
            <label
              className="text-md text-zinc-500 font-medium"
              htmlFor="gender"
            >
              Gender:
            </label>

            <div className="flex gap-6 p-[0.38rem] pl-6 input-shadow">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="gender"
                  name="gender"
                  value={"male"}
                  onChange={handleProfileDataChange}
                  className="size-4"
                />{" "}
                <span className="font-medium text-gray-600 ml-2">Male </span>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="gender"
                  name="gender"
                  value={"female"}
                  onChange={handleProfileDataChange}
                  className="size-4"
                />
                <span className="font-medium text-gray-600 ml-2">Female </span>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="gender"
                  name="gender"
                  value={"other"}
                  onChange={handleProfileDataChange}
                  className="size-4"
                />
                <span className="font-medium text-gray-600 ml-2">Other </span>
              </div>
            </div>

            {/* Show Errors If Exists.... */}
            {profileError.genderError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {profileError.genderError}
              </p>
            )}
          </div>

          {/* semester field continer.... */}
          <div className="flex flex-col gap-1 w-full relative">
            <label
              className="text-md text-zinc-500 font-medium"
              htmlFor="semester"
            >
              Semester:
            </label>
            <select
              name="semester"
              id="semester"
              onChange={handleProfileDataChange}
              className="w-full bg-white-900 border-none font-medium input-shadow p-2 text-zinc-600 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            >
              <option value="" className="text-md">
                Select Semester
              </option>
              <option value="1" className="text-md">
                1 sem
              </option>
              <option value="2" className="text-md">
                2 sem
              </option>
              <option value="3" className="text-md">
                3 sem
              </option>
              <option value="4" className="text-md">
                4 sem
              </option>
              <option value="5" className="text-md">
                5 sem
              </option>
              <option value="6" className="text-md">
                6 sem
              </option>
              <option value="7" className="text-md">
                7 sem
              </option>
              <option value="8" className="text-md">
                8 sem
              </option>
            </select>

            {/* Show Errors If Exists.... */}
            {profileError.semesterError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {profileError.semesterError}
              </p>
            )}
          </div>

          {/* Program field continer.... */}
          <div className="flex flex-col gap-1 w-full relative">
            <label
              className="text-md text-zinc-500 font-medium"
              htmlFor="program"
            >
              Program:
            </label>
            <input
              type="text"
              id="program"
              name="program"
              value={profileData.program}
              onChange={handleProfileDataChange}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {profileError.programError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {profileError.programError}
              </p>
            )}
          </div>

          {/* college field continer.... */}
          <div className="flex flex-col gap-1 w-full relative">
            <label
              className="text-md text-zinc-500 font-medium"
              htmlFor="college"
            >
              College:
            </label>
            <input
              type="text"
              id="college"
              name="college"
              value={profileData.college}
              onChange={handleProfileDataChange}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {profileError.collegeError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {profileError.collegeError}
              </p>
            )}
          </div>

          {/* address field continer.... */}
          <div className="flex flex-col gap-1 w-full relative">
            <label
              className="text-md text-zinc-500 font-medium"
              htmlFor="address"
            >
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={profileData.address}
              onChange={handleProfileDataChange}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {profileError.addressError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {profileError.addressError}
              </p>
            )}
          </div>

          {/* Facebook field continer.... */}
          <div className="flex flex-col gap-1 w-full relative">
            <label
              className="text-md text-zinc-500 font-medium"
              htmlFor="facebook"
            >
              Facebook:
            </label>
            <input
              type="text"
              id="facebook"
              name="facebook"
              value={profileData.facebook}
              onChange={handleProfileDataChange}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {profileError.facebookError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {profileError.facebookError}
              </p>
            )}
          </div>

          {/* Instagram field continer.... */}
          <div className="flex flex-col gap-1 w-full relative">
            <label
              className="text-md text-zinc-500 font-medium"
              htmlFor="instagram"
            >
              Instagram:
            </label>
            <input
              type="text"
              id="instagram"
              name="instagram"
              value={profileData.instagram}
              onChange={handleProfileDataChange}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {profileError.instagramError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {profileError.instagramError}
              </p>
            )}
          </div>

          {/* Linkedln field continer.... */}
          <div className="flex flex-col gap-1 w-full relative">
            <label
              className="text-md text-zinc-500 font-medium"
              htmlFor="linkedln"
            >
              Linkedln:
            </label>
            <input
              type="text"
              id="linkedln"
              name="linkedln"
              value={profileData.linkedln}
              onChange={handleProfileDataChange}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {profileError.linkedlnError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {profileError.linkedlnError}
              </p>
            )}
          </div>

          {/* Github field continer.... */}
          <div className="flex flex-col gap-1 w-full relative">
            <label
              className="text-md text-zinc-500 font-medium"
              htmlFor="github"
            >
              Github:
            </label>
            <input
              type="text"
              id="github"
              name="github"
              value={profileData.github}
              onChange={handleProfileDataChange}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {profileError.githubError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {profileError.githubError}
              </p>
            )}
          </div>

          {/* Youtube field continer.... */}
          <div className="flex flex-col gap-1 w-full relative">
            <label
              className="text-md text-zinc-500 font-medium"
              htmlFor="youtube"
            >
              Youtube:
            </label>
            <input
              type="text"
              id="youtube"
              name="youtube"
              value={profileData.youtube}
              onChange={handleProfileDataChange}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {profileError.youtubeError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {profileError.youtubeError}
              </p>
            )}
          </div>

          {/* Website field continer.... */}
          <div className="flex flex-col gap-1 w-full relative sm:col-span-2">
            <label
              className="text-md text-zinc-500 font-medium"
              htmlFor="website"
            >
              Website:
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={profileData.website}
              onChange={handleProfileDataChange}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {profileError.websiteError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {profileError.websiteError}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 opacity-85 rounded-sm py-1.5 text-white hover:opacity-100 active:scale-97 ease-in focus:opacity-100 focus:outline-blue-700 duration-200"
        >
          Save Changes
        </button>
      </form>
    </OverlayScreen>
  );
};

export default ProfileEdit;
