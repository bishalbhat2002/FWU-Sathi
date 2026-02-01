import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineMail } from "react-icons/md";

const RegisterComponent = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    program: "",
    semester: "",
    college: "",
    address: "",
  });

  const [registerError, setRegisterError] = useState({
    emailError: "",
    passwordError: "",
    nameError: "",
    genderError: "",
    programError: "",
    semesterError: "",
    collegeError: "",
    addressError: "",
  });

  function handleRegisterDatachange(e) {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleRegisterError(fieldName, errorMessage) {
    setRegisterError((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));
  }

  function handleRegister(e) {
    e.preventDefault();
    let isValid = true;

    // Reset previous Errors...
    setRegisterError((prev) => ({
      emailError: "",
      passwordError: "",
      nameError: "",
      genderError: "",
      programError: "",
      semesterError: "",
      collegeError: "",
      addressError: "",
    }));

    // Validate Data....
    if (registerData.email.length === 0) {
      isValid = false;
      handleRegisterError("emailError", "Email is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      isValid = false;
      handleRegisterError("emailError", "Invalid email format.");
    }

    if (registerData.name.length === 0) {
      isValid = false;
      handleRegisterError("nameError", "Name is required.");
    } else if (registerData.name.length < 3 || registerData.name.length > 30) {
      isValid = false;
      handleRegisterError("nameError", "Name must be between 3-30 characters.");
    }

    if (registerData.password.length === 0) {
      isValid = false;
      handleRegisterError("passwordError", "Password is required.");
    } else if (
      registerData.password.length < 8 ||
      registerData.password.length > 16
    ) {
      isValid = false;
      handleRegisterError(
        "passwordError",
        "Password must be between 3-30 characters.",
      );
    }

    if (registerData.program.length === 0) {
      isValid = false;
      handleRegisterError("programError", "program is required..");
    } else if (
      registerData.program.length < 3 ||
      registerData.program.length > 30
    ) {
      isValid = false;
      handleRegisterError(
        "programError",
        "program must be between 3-30 characters.",
      );
    }

    if (registerData.college.length === 0) {
      isValid = false;
      handleRegisterError("collegeError", "College is required..");
    } else if (
      registerData.college.length < 3 ||
      registerData.college.length > 30
    ) {
      isValid = false;
      handleRegisterError(
        "collegeError",
        "College must be between 3-30 characters.",
      );
    }

    if (registerData.address.length === 0) {
      isValid = false;
      handleRegisterError("addressError", "Address is required.");
    } else if (
      registerData.address.length < 3 ||
      registerData.address.length > 30
    ) {
      isValid = false;
      handleRegisterError(
        "addressError",
        "Address must be between 3-30 characters.",
      );
    }

    const semester = parseInt(registerData.semester);
    if (!semester) {
      isValid = false;
      handleRegisterError("semesterError", "Semester is required..");
    } else if (semester < 1 || semester > 8) {
      isValid = false;
      handleRegisterError("semesterError", "Semester must be between 1-8.");
    }

    if (registerData.gender === "") {
      isValid = false;
      handleRegisterError("genderError", "Gender is required.");
    }

    console.log(registerData)
    // Return if not valid data is provided...
    if (!isValid) {
      return;
    }

     // Send the registration form data to backend....     
    
  }

  return (
    <div className="w-full h-screen pt-15 flex justify-center items-start sm:items-center overflow-x-hidden overflow-y-auto">
      <form
        onSubmit={handleRegister}
        className="max-w-220 w-full mx-3 my-5 bg-white shadow-post rounded-md overflow-hidden p-5 flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 -mt-2 -mb-1">
          Register
        </h2>

        {/* Input Fields container. */}
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-4">
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
              value={registerData.email}
              onChange={handleRegisterDatachange}
              autoFocus={true}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            <MdOutlineMail className="size-5 absolute right-3 top-[2.6rem] text-gray-500" />

            {/* Show Errors If Exists.... */}
            {registerError.emailError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {registerError.emailError}
              </p>
            )}
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
              value={registerData.password}
              onChange={handleRegisterDatachange}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />

            {registerData.password && (
              <button
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
                className="absolute right-3 top-11 text-gray-700"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>
            )}

            {/* Show Errors If Exists.... */}
            {registerError.passwordError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {registerError.passwordError}
              </p>
            )}
          </div>

          {/* Line to distinguish the Email and Password field with other stuff. */}
          {/* <hr className="sm:col-span-2 text-black/30" /> */}

          {/* Name field continer.... */}
          <div className="flex flex-col gap-1 w-full relative">
            <label className="text-md text-zinc-500 font-medium" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={registerData.name}
              onChange={handleRegisterDatachange}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {registerError.nameError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {registerError.nameError}
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
                  onChange={handleRegisterDatachange}
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
                  onChange={handleRegisterDatachange}
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
                  onChange={handleRegisterDatachange}
                  className="size-4"
                />
                <span className="font-medium text-gray-600 ml-2">Other </span>
              </div>
            </div>

            {/* Show Errors If Exists.... */}
            {registerError.genderError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {registerError.genderError}
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
               onChange={handleRegisterDatachange}
               className="w-full bg-white-900 border-none font-medium input-shadow p-2 text-zinc-600 rounded-sm text-sm sm:text-md focus:outline-blue-400"
               >
                    <option value="" className="text-md">Select Semester</option>
                    <option value="1" className="text-md">1 sem</option>
                    <option value="2" className="text-md">2 sem</option>
                    <option value="3" className="text-md">3 sem</option>
                    <option value="4" className="text-md">4 sem</option>
                    <option value="5" className="text-md">5 sem</option>
                    <option value="6" className="text-md">6 sem</option>
                    <option value="7" className="text-md">7 sem</option>
                    <option value="8" className="text-md">8 sem</option>
               </select>


            {/* Show Errors If Exists.... */}
            {registerError.semesterError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {registerError.semesterError}
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
              value={registerData.program}
              onChange={handleRegisterDatachange}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {registerError.programError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {registerError.programError}
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
              value={registerData.college}
              onChange={handleRegisterDatachange}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {registerError.collegeError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {registerError.collegeError}
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
              value={registerData.address}
              onChange={handleRegisterDatachange}
              autoComplete={false}
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {registerError.addressError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {registerError.addressError}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 opacity-85 rounded-sm py-1.5 text-white hover:opacity-100 active:scale-97 ease-in focus:opacity-100 focus:outline-blue-700 duration-200"
        >
          Register
        </button>

        <div className="relative mt-3">
          <hr className="text-black/20" />
          <p className="absolute -bottom-2.5 font-bold left-[50%] bg-white px-2 translate-x-[-50%] text-gray-600">
            or
          </p>
        </div>

        <Link
          to={"/login"}
          className="mx-auto text-blue-400 text-sm text-center font-medium group"
        >
          Already have an Account?{" "}
          <span className="group-hover:underline">login</span>
        </Link>
      </form>
    </div>
  );
};

export default RegisterComponent;
