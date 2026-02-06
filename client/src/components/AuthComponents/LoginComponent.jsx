import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link} from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineMail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/features/user/user.thunk";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.userReducer.loader);


  const [showPassword, setShowPassword] = useState(true);
  const [loginData, setLogindata] = useState({
    email: "cafati3799@helesco.com",
    password: "ilovecoding",
  });

  function handleLoginDatachange(e) {
    setLogindata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleLogin(e) {
    e.preventDefault();
    let isValid = true;

    if (loginData.email?.length === 0 || loginData.password?.length === 0) {
      isValid = false;
      toast.error("All fields are required.");
    } else if (
      loginData.password?.length < 8 ||
      loginData.password?.length > 20
    ) {
      isValid = false;
      toast.error("Password must be 8-20 characters.");
    }

    // Return if not valid data is provided...
    if (!isValid) {
      return;
    }

    // send data to backend for verificatoin..
    dispatch(loginUserThunk(loginData));
  }



  return (
    <div className="w-full h-screen sm:pt-15 flex justify-center items-center overflow-hidden">
      <form
        onSubmit={handleLogin}
        className="max-w-105 w-full bg-white shadow-post rounded-md overflow-hidden p-5 mx-2 flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 -mt-2 -mb-1">
          Login
        </h2>

        {/* Email Input field container... */}
        <div className="flex flex-col gap-1 relative">
          <label className="text-lg text-zinc-500 font-medium" htmlFor="email">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginDatachange}
            autoFocus={true}
            className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-md focus:outline-blue-400"
          />
          <MdOutlineMail className="size-5 absolute right-3 top-[2.6rem] text-gray-500" />
        </div>

        {/* Password Input field continaer... */}
        <div className="flex flex-col gap-1 relative">
          <label
            className="text-lg text-zinc-500 font-medium"
            htmlFor="password"
          >
            {" "}
            Password{" "}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginDatachange}
            className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-md focus:outline-blue-400"
          />

          {loginData.password && (
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
              className="absolute right-3 top-11 text-gray-700"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          )}
        </div>
        <div className="text-end -mt-3 -mb-2">
          <Link
            to={"/forgot-password-change"}
            className="text-blue-400 text-sm text-end font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loader}
          className="w-full bg-blue-500 opacity-85 rounded-sm py-1.5 text-white hover:opacity-100 active:scale-97 ease-in focus:opacity-100 focus:outline-blue-700 duration-200"
        >
          {!loader ? "Login" : "Plase wait"}
        </button>

        <div className="relative mt-3">
          <hr className="text-black/20" />
          <p className="absolute -bottom-2.5 font-bold left-[50%] bg-white px-2 translate-x-[-50%] text-gray-600">
            or
          </p>
        </div>

        <Link
          to={"/register"}
          className="mx-auto text-blue-400 text-sm text-center font-medium group"
        >
          Dont't have an Account?{" "}
          <span className="group-hover:underline">register</span>
        </Link>
      </form>
    </div>
  );
};

export default LoginComponent;
