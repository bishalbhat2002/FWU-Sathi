import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ChangePassword = () => {
  const navigate = useNavigate();

  // States for handling the Password show and hide
  const [showPassword, setShowPassword] = useState({
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

  const [password, setPassword] = useState({
    new: "",
    confirm: "",
  });

  // State for handling Errors
  const [errors, setErrors] = useState({
    new: "",
    confirm: "",
  });

  function handlePasswordChange(field, e) {
    setPassword((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  }

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
      new: "",
      confirm: "",
    }));

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
    toast.success("Password changed successfully.");
    navigate("/login");
  }

  return (
    <div className="w-full h-screen sm:pt-15 flex justify-center items-center overflow-hidden">
      <form
        onSubmit={handlePasswordSubmit}
        className="max-w-105 w-full mx-2 bg-white shadow-post rounded-md overflow-hidden p-5 flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 -mt-2 -mb-1">
          Forgot Password
        </h2>

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
            autoFocus={true}
            className="w-full bg-white-900 border-none input-shadow py-1 px-2 text-zinc-700 rounded-sm text-lg focus:outline-blue-400"
          />
          {password.new && (
            <button
              onClick={() => handleTogglePassword("new")}
              type="button"
              className="absolute right-3 top-10"
            >
              {showPassword.new ? <FiEye /> : <FiEyeOff />}
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
              {showPassword.confirm ? <FiEye /> : <FiEyeOff />}
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
  );
};

export default ChangePassword;
