import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  changeForgotPasswordThunk,
  verifyForgotPasswordThunk,
} from "../../store/features/user/user.thunk";
import { setSuccess } from "../../store/features/user/user.slice";

const ForgotPasswordChange = () => {
  const navigate = useNavigate();

  const loader = useSelector((state) => state.userReducer.loader);
  const success = useSelector((state) => state.userReducer.success);
  const showOtherFields = useSelector(
    (state) => state.userReducer.showOtherFields,
  );

  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "cafati3799@helesco.com",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

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

  // State for handling Errors
  const [errors, setErrors] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleDataChange(field, e) {
    setData((prev) => ({
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

  // handle Email send to backend to get verification..
  function handleEmailSubmit(e) {
    e.preventDefault();
    dispatch(verifyForgotPasswordThunk({ email: data.email }));
  }

  // Function to handle password submit to backend....
  function handlePasswordChange(e) {
    // First validate the Input before submit.....
    e.preventDefault();

    let hasError = false;
    // Reset previous Errors before revalidation....
    setErrors((prev) => ({
      email: "",
      code: "",
      newPassword: "",
      confirmPassword: "",
    }));

    // Simple email regex to validate email..
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    if (data.email.length === 0) {
      hasError = true;
      handleErrors("email", "Email address cannot be empty.");
    } else if (!emailRegex.test(data.email)) {
      hasError = true;
      handleErrors("email", "Invalid email address.");
    }

    if (data.code.length === 0) {
      hasError = true;
      handleErrors("code", "Code cannot be empty.");
    } else if (data.code.length !== 6) {
      hasError = true;
      handleErrors("code", "Code must be of 6 digits.");
    }

    // Validate new Password field...
    if (data.newPassword?.length === 0) {
      hasError = true;
      handleErrors("new", "New password cannot be Empty.");
    } else if (data.newPassword?.length < 8 || data.newPassword?.length > 20) {
      hasError = true;
      handleErrors("new", "New Password must be 8-20 characters.");
    }

    // Validate confirm Password field...
    if (data.confirmPassword?.length === 0) {
      hasError = true;
      handleErrors("confirm", "Confirm password cannot be Empty.");
    } else if (
      data.confirmPassword.length < 8 ||
      data.confirmPassword.length > 20
    ) {
      hasError = true;
      handleErrors("confirm", "Confirm Password must be 8-20 characters.");
    }

    if (data.newPassword !== data.confirmPassword) {
      hasError = true;
      handleErrors(
        "confirm",
        "Confirm Password and New password didn't match.",
      );
    }

    // Dont submit form if error occured....
    if (hasError) return;

    dispatch(
      changeForgotPasswordThunk({
        email: data.email,
        password: data.confirmPassword,
        code: data.code,
      }),
    );
  }

  useEffect(() => {
    // Redirect to login page only if forgot password is changed successfully...
    if (success) {
      navigate("/login");
      dispatch(setSuccess(false));
    }
  }, [success]);

  return (
    <div className="w-full h-screen sm:pt-15 flex justify-center items-center overflow-hidden">
      <form
        onSubmit={!showOtherFields ? handleEmailSubmit : handlePasswordChange}
        className="max-w-105 w-full mx-2 bg-white shadow-post rounded-md overflow-hidden p-5 flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 -mt-2 -mb-1">
          {!showOtherFields ? "Forgot Password" : "Change Password"}
        </h2>

        {/* Email Input field container... */}
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="email" className="text-lg text-zinc-500 font-medium">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={data.email}
            onChange={(e) => handleDataChange("email", e)}
            autoFocus={true}
            placeholder="bb@gmail.com"
            className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-md focus:outline-blue-400"
          />
          <MdOutlineMail className="size-5 absolute right-3 top-[2.6rem] text-gray-500" />

          {errors.email && (
            <p className="text-red-400 text-md line-clamp-1 -mb-2">
              {errors.email}
            </p>
          )}
        </div>
        {showOtherFields && (
          <>
            {/* Code Input field container... */}
            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="verification-code"
                className="text-md text-zinc-400 font-medium mb-1"
              >
                OTP Code:
              </label>
              <input
                type="number"
                id="verification-code"
                name="verification-code"
                value={data.code}
                onChange={(e) => handleDataChange("code", e)}
                autoFocus={true}
                placeholder="OTP is send to the provided email."
                className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-md focus:outline-blue-400"
              />
              {/* Show Errors If Exists.... */}
              {errors.code && (
                <p className="text-red-400 text-md line-clamp-1 -mb-2">
                  {errors.code}
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
                value={data.newPassword}
                onChange={(e) => handleDataChange("newPassword", e)}
                id="new-Password"
                className="w-full bg-white-900 border-none input-shadow py-1 px-2 text-zinc-700 rounded-sm text-lg focus:outline-blue-400"
              />
              {data.newPassword && (
                <button
                  onClick={() => handleTogglePassword("new")}
                  type="button"
                  className="absolute right-3 top-10"
                >
                  {data.newPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              )}

              {/* Show Errors If Exists.... */}
              {errors.newPassword && (
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
                value={data.confirmPassword}
                onChange={(e) => handleDataChange("confirmPassword", e)}
                id="confirm-Password"
                className="w-full bg-white-900 border-none input-shadow py-1 px-2 text-zinc-700 rounded-sm text-lg focus:outline-blue-400"
              />
              {data.confirmPassword && (
                <button
                  onClick={() => handleTogglePassword("confirm")}
                  type="button"
                  className="absolute right-3 top-10"
                >
                  {showPassword.confirm ? <FiEye /> : <FiEyeOff />}
                </button>
              )}

              {/* Show Errors If Exists.... */}
              {errors.confirmPassword && (
                <p className="text-red-400 text-md line-clamp-1 -mb-2">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full mt-2 bg-blue-400 opacity-75 rounded-sm py-1.5 text-white hover:opacity-100 active:scale-97 ease-in focus:opacity-100 focus:outline-blue-700 duration-200"
        >
          {loader
            ? showOtherFields
              ? "Saving password. Please Wait..."
              : "Sending code. Please wait..."
            : showOtherFields
              ? "Save changes"
              : "Verify Email"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordChange;
