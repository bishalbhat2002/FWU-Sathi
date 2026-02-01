import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineMail } from "react-icons/md";

const ForgotPasswordCodeVerify = () => {
  const [code, setCode] = useState("");
    const navigate = useNavigate();

  function handleCodeSubmit(e) {
    e.preventDefault();
    let isValid = true;

    if (code.length === 0) {
      isValid = false;
      toast.error("code is required.");
    }else if (code.length > 6) {
      isValid = false;
      toast.error("code must be of  6 characters.");
    }

    // Return if not valid data is provided...
    if (!isValid) {
      return;
    }

    alert("api call");
    navigate("/change-password")

  }

  return (
    <div className="w-full h-screen p-15 flex justify-center items-center overflow-hidden">
      <form
        onSubmit={handleCodeSubmit}
        className="max-w-90 w-full bg-white shadow-post rounded-md overflow-hidden p-5 flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 -mt-2 -mb-1">
          Forgot Password
        </h2>

        {/* Email Input field container... */}
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="verification-code" className="text-md text-zinc-400 font-medium mb-1">
            A 6 digit OTP has been sent to email bishal****.com. Enter the OTP below.
          </label>
          <input
            type="number"
            id="verification-code"
            name="verification-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoFocus={true}
            autoComplete={false}
            placeholder="OTP here..."
            className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-md focus:outline-blue-400"
          />

        </div>

        <button
          type="submit"
          className="w-full mt-3 bg-blue-500 opacity-85 rounded-sm py-1.5 text-white hover:opacity-100 active:scale-97 ease-in focus:opacity-100 focus:outline-blue-700 duration-200"
        >
          Verify Code
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordCodeVerify;
