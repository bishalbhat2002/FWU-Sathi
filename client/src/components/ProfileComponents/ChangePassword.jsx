import { useState } from "react";
import OverlayScreen from "../../layouts/OverlayScreen";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const ChangePassword = () => {
  // States for handling the Password show and hide
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Function to handle Show and Hide password
  function handleTogglePassword(field) {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  // State to handle passwords
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  function handlePasswordChange(field, e) {
    setPassword((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  }

  // State for handling Errors
  const [errors, setErrors] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  function handleErrors(errorField, errorMessage) {
    setErrors((prev) => ({
      ...prev,
      [errorField]: errorMessage,
    }));
  }

  // Function to handle password submit to backend....
  function handlePasswordSubmit(e) {
    // First validate the Input before submit.....
    e.preventDefault();

    let hasError = false;
    // Reset previous Errors before revalidation....
    setErrors((prev) => ({
      current: "",
      new: "",
      confirm: "",
    }));

    // Validate Current Password field...
    if (password.current?.length === 0) {
      hasError = true;
      handleErrors("current", "Current password cannot be Empty.");
    } else if (password.current?.length < 8 || password.current?.length > 20) {
      hasError = true;
      handleErrors("current", "Current Password must be 8-20 characters.");
    }

    // Validate new Password field...
    if (password.new?.length === 0) {
      hasError = true;
      handleErrors("new", "New password cannot be Empty.");
    } else if (password.new?.length < 8 || password.new?.length > 20) {
      hasError = true;
      handleErrors("new", "New Password must be 8-20 characters.");
    }

    // Validate confirm Password field...
    if (password.confirm?.length === 0) {
      hasError = true;
      handleErrors("confirm", "Confirm password cannot be Empty.");
    } else if (password.confirm?.length < 8 || password.confirm?.length > 20) {
      hasError = true;
      handleErrors("confirm", "Confirm Password must be 8-20 characters.");
    }

    if (password.new !== password.confirm) {
      hasError = true;
      handleErrors(
        "confirm",
        "Confirm Password and New password didn't match.",
      );
    }

    // Dont submit form if error occured....
    if (hasError) return;
    alert("data send to backedn....");
  }

  return (
    <OverlayScreen>
      <div className="bg-white max-w-130 w-full bg-white-600 border-1 rounded-md border-gray-300 px-5 ">
        <div className="flex gap-4 p-2 items-center justify-center relative">
          <span className="text-2xl font-black text-zinc-600 py-2">
            Change Password
          </span>
          <Link
            to={"/profile"}
            className="rounded-full p-1 bg-zinc-300 absolute -right-2 top-3 hover-scale"
          >
            <RxCross2 className="size-6 text-zinc-500 hover-scale" />
          </Link>
        </div>

        {/* Password change Form... */}
        <form
          onSubmit={handlePasswordSubmit}
          className="flex  flex-col gap-4 pb-5"
        >
          <div className="flex flex-col gap-0.5 relative">
            <label
              className="text-lg text-zinc-500 font-medium"
              htmlFor="currentPassword"
            >
              Current Password
            </label>
            <input
              type={showPassword.current ? "text" : "password"}
              value={password.current}
              onChange={(e) => handlePasswordChange("current", e)}
              id="currentPassword"
              autoFocus={true}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow py-1 px-2 text-zinc-700 rounded-sm text-lg focus:outline-blue-400"
            />
            {password.current && (
              <button
                onClick={() => handleTogglePassword("current")}
                type="button"
                className="absolute right-3 top-10"
              >
                {showPassword.current ? <FiEyeOff /> : <FiEye />}
              </button>
            )}

            {/* Show Errors If Exists.... */}
            {errors.current && (
              <p className="text-red-400 text-md line-clamp-1 -mb-2">
                {errors.current}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-0.5 relative">
            <label
              className="text-lg text-zinc-500 font-medium"
              htmlFor="currentPassword"
            >
              New Password
            </label>
            <input
              type={showPassword.new ? "text" : "password"}
              value={password.new}
              onChange={(e) => handlePasswordChange("new", e)}
              id="new-Password"
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow py-1 px-2 text-zinc-700 rounded-sm text-lg focus:outline-blue-400"
            />
            {password.new && (
              <button
                onClick={() => handleTogglePassword("new")}
                type="button"
                className="absolute right-3 top-10"
              >
                {showPassword.new ? <FiEyeOff /> : <FiEye />}
              </button>
            )}

            {/* Show Errors If Exists.... */}
            {errors.new && (
              <p className="text-red-400 text-md line-clamp-1 -mb-2">
                {errors.new}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-0.5 relative">
            <label
              className="text-lg text-zinc-500 font-medium"
              htmlFor="currentPassword"
            >
              Confirm Password
            </label>
            <input
              type={showPassword.confirm ? "text" : "password"}
              value={password.confirm}
              onChange={(e) => handlePasswordChange("confirm", e)}
              id="confirm-Password"
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow py-1 px-2 text-zinc-700 rounded-sm text-lg focus:outline-blue-400"
            />
            {password.confirm && (
              <button
                onClick={() => handleTogglePassword("confirm")}
                type="button"
                className="absolute right-3 top-10"
              >
                {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
              </button>
            )}

            {/* Show Errors If Exists.... */}
            {errors.confirm && (
              <p className="text-red-400 text-md line-clamp-1 -mb-2">
                {errors.confirm}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-blue-400 opacity-75 rounded-sm py-1.5 text-white hover:opacity-100 active:scale-97 ease-in focus:opacity-100 focus:outline-blue-700 duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </OverlayScreen>
  );
};

export default ChangePassword;
