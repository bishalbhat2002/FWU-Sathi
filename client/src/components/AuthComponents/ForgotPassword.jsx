import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineMail } from "react-icons/md";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleEmailSubmit(e) {
    e.preventDefault();
    let isValid = true;

    if (email.length === 0) {
      isValid = false;
      toast.error("Email is required.");
    }

    // Return if not valid data is provided...
    if (!isValid) {
      return;
    }

    alert("api call");
    navigate("/forgot-password-code-verify")

  }

  return (
    <div className="w-full h-screen p-15 flex justify-center items-center overflow-hidden">
      <form
        onSubmit={handleEmailSubmit}
        className="max-w-105 w-full bg-white shadow-post rounded-md overflow-hidden p-5 flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 -mt-2 -mb-1">
          Forgot Password
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus={true}
            autoComplete={false}
            placeholder="bb@gmail.com"
            className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-md focus:outline-blue-400"
          />
          <MdOutlineMail className="size-5 absolute right-3 top-[2.6rem] text-gray-500" />
        </div>

        <button
          type="submit"
          className="w-full mt-3 bg-blue-500 opacity-85 rounded-sm py-1.5 text-white hover:opacity-100 active:scale-97 ease-in focus:opacity-100 focus:outline-blue-700 duration-200"
        >
          Send Verification Code
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
