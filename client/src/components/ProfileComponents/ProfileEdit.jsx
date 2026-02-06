import { useEffect, useState } from "react";
import OverlayScreen from "../../layouts/OverlayScreen";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineMail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setEditProfile } from "../../store/features/user/user.slice";
import { editUserInformationThunk } from "../../store/features/user/user.thunk";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileInfo = useSelector((state) => state.userReducer.profileInfo);
  const editLoader = useSelector((state) => state.userReducer.editLoader);
  const editSuccess = useSelector((state) => state.userReducer.editSuccess);
  const [ready, setReady] = useState(false);

  console.log(profileInfo);

  useEffect(()=>{
    dispatch(setEditProfile(true));
    setReady(true);
  }, [])

  useEffect(()=>{
    if(!ready)
      return;

    if(!editLoader && editSuccess){
      navigate(-1);
    }
  }, [editSuccess, editLoader]);


  const [profileData, setProfileData] = useState({
    name: profileInfo?.name,
    gender: profileInfo?.gender,
    program: profileInfo?.program,
    semester: profileInfo?.semester,
    college: profileInfo?.college,
    address: profileInfo?.address,
    facebook: profileInfo?.facebook,
    instagram: profileInfo?.instagram,
    linkedln: profileInfo?.linkedln,
    github: profileInfo?.github,
    youtube: profileInfo?.youtube,
    website: profileInfo?.website,
  });

  const [profileError, setProfileError] = useState({
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
      if (facebook.includes("facebook.com/") && facebook.length < 50) {
        socialMedia.facebook = facebook;
      } else {
        isValid = false;
        handleProfileUpdateError("facebookError", "Facebook is invalid.");
      }
    }else{
      socialMedia.facebook = "";
    }
    if (instagram) {
      if (instagram.includes("instagram.com/") && instagram.length < 50) {
        socialMedia.instagram = instagram;
      } else {
        isValid = false;
        handleProfileUpdateError("instagramError", "Instagram is invalid.");
      }
    }else{
      socialMedia.instagram = "";
    }
    if (linkedln) {
      if (linkedln.includes("linkedln.com/") && linkedln.length < 50) {
        socialMedia.linkedln = linkedln;
      } else {
        isValid = false;
        handleProfileUpdateError("linkedlnError", "Linkedln is invalid.");
      }
    }else{
      socialMedia.linkedln = "";
    }
    if (github) {
      if (github.includes("github.com/") && github.length < 50) {
        socialMedia.github = github;
      } else {
        isValid = false;
        handleProfileUpdateError("githubError", "Github is invalid.");
      }
    }else{
      socialMedia.github = "";
    }
    if (youtube) {
      if (youtube.includes("youtube.com/") && youtube.length < 50) {
        socialMedia.youtube = youtube;
      } else {
        isValid = false;
        handleProfileUpdateError("youtubeError", "Youtube is invalid.");
      }
    }else{
      socialMedia.youtube = "";
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
    }else{
      socialMedia.website = "";
    }

    // console.log(socialMedia);

    // console.log(profileData);

    // Return if not valid data is provided...
    if (!isValid) {
      return;
    }

    // Send the updated profile data to backend....
    dispatch(editUserInformationThunk(profileData));


  }

  return (
    <OverlayScreen>
      <button
        onClick={() => navigate(-1)}
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
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {profileError.nameError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {profileError.nameError}
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
                  id="male"
                  name="gender"
                  value={"male"}
                  onChange={handleProfileDataChange}
                  checked={profileData.gender === "male"}
                  className="size-4"
                />{" "}
                <label
                  htmlFor="male"
                  className="font-medium text-gray-600 ml-2"
                >
                  Male{" "}
                </label>
              </div>

              <div className="flex items-center" htmlFor="">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value={"female"}
                  onChange={handleProfileDataChange}
                  checked={profileData.gender === "female"}
                  className="size-4"
                />
                <label
                  htmlFor="female"
                  className="font-medium text-gray-600 ml-2"
                >
                  Female{" "}
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value={"other"}
                  onChange={handleProfileDataChange}
                  checked={profileData.gender === "other"}
                  className="size-4"
                />
                <label
                  className="font-medium text-gray-600 ml-2"
                  htmlFor="other"
                >
                  Other{" "}
                </label>
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
              value={profileData.semester}
              onChange={handleProfileDataChange}
              className="w-full bg-white-900 border-none font-medium input-shadow p-2 text-zinc-600 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <option
                  key={index}
                  value={index + 1}
                  className="text-md"
                >
                  {index + 1}
                </option>
              ))}
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
          <div className="flex flex-col gap-1 w-full relative">
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
          {editLoader ? "Saving Changes" : "Save Changes"}
        </button>
      </form>
    </OverlayScreen>
  );
};

export default ProfileEdit;
