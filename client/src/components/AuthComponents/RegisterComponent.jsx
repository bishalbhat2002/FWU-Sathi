import { isValidElement, useRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineMail } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  registerUserThunk,
  verifyRegisterEmailThunk,
} from "../../store/features/user/user.thunk";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const RegisterComponent = () => {
  const [showPassword, setShowPassword] = useState(true);
  const verificationCodeField = useSelector(
    (state) => state.userReducer.verificationCodeField,
  );
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated,
  );
  const loader = useSelector((state) => state.userReducer.loader);
  const dispatch = useDispatch();

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "ilovecoding0000",
    name: "",
    gender: "",
    program: "BSC-CSIT",
    semester: "6",
    college: "FWU",
    address: "MNR",
    verificationCode: "",
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
    verificationCodeError: "",
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

  // Validate Register Data...
  function validateRegisterData() {
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
      verificationCodeError: "",
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
      registerData.password.length > 20
    ) {
      isValid = false;
      handleRegisterError(
        "passwordError",
        "Password must be between 8-20 characters.",
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

    // Return True or false.... True means register data is correct, and False means register data is not correct.
    return isValid;
  }

  function validateVerificationCode() {
    let isValid = true;
    if (registerData.verificationCode.length === 0) {
      isValid = false;
      handleRegisterError(
        "verificationCodeError",
        "Verification Code is required.",
      );
    } else if (registerData.verificationCode.length !== 6) {
      isValid = false;
      handleRegisterError(
        "verificationCodeError",
        "Verification Code must be 6 characters.",
      );
    }

    // Return true or false.... True means verification code is in correct format false means it is in incorrect format.
    return isValid;
  }

  // Verify Email....
  function verifyEmail(e) {
    e.preventDefault();
    if (!validateRegisterData()) {
      return;
    }

    // Send Email only to backend for verification...
    dispatch(verifyRegisterEmailThunk({ email: registerData.email }));
  }

  function handleRegister(e) {
    e.preventDefault();

    // Return if not valid data is provided...
    if (!validateRegisterData() || !validateVerificationCode()) {
      return;
    }

    // Send the registration form data to backend....
    console.log("data send:", registerData);

    dispatch(registerUserThunk(registerData));
  }

  /**
   * GSAP Animation for Register Form...
   *
   */

  const formRef = useRef(null);
  useGSAP(() => {

    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
    });

  }, []);






  return (
    <div className="w-full h-screen pt-15 flex justify-center items-start sm:items-center overflow-x-hidden overflow-y-auto">
      <form
        ref={formRef}
        onSubmit={!verificationCodeField ? verifyEmail : handleRegister}
        className="max-w-220 w-full mx-3 my-5 bg-white shadow-post rounded-md overflow-hidden p-5 flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 -mt-2 -mb-1">
          Register
        </h2>

        {/* Input Fields container. */}
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-4">
          {/* Email Input field container... */}
          <div className="flex flex-col gap-1 w-full relative form-field">
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
          <div className="flex flex-col gap-1 relative form-field">
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
          <div className="flex flex-col gap-1 w-full relative form-field">
            <label className="text-md text-zinc-500 font-medium" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={registerData.name}
              onChange={handleRegisterDatachange}
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
          <div className="flex flex-col gap-1 w-full relative form-field">
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
                  onChange={handleRegisterDatachange}
                  className="size-4"
                />{" "}
                <label
                  htmlFor="male"
                  className="font-medium text-gray-600 ml-2"
                >
                  Male{" "}
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value={"female"}
                  onChange={handleRegisterDatachange}
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
                  onChange={handleRegisterDatachange}
                  className="size-4"
                />
                <label
                  htmlFor="other"
                  className="font-medium text-gray-600 ml-2"
                >
                  Other{" "}
                </label>
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
          <div className="flex flex-col gap-1 w-full relative form-field">
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
            {registerError.semesterError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {registerError.semesterError}
              </p>
            )}
          </div>

          {/* Program field continer.... */}
          <div className="flex flex-col gap-1 w-full relative form-field">
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
          <div className="flex flex-col gap-1 w-full relative form-field">
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
          <div className="flex flex-col gap-1 w-full relative form-field">
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
              className="w-full bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
            />
            {/* Show Errors If Exists.... */}
            {registerError.addressError && (
              <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                {registerError.addressError}
              </p>
            )}
          </div>

          {/* Verification Code Entering Field... */}
          {verificationCodeField && (
            <div className="border-t border-black/30 mt-1 pt-2 form-field">
              <label
                htmlFor="verification-code"
                className="text-md text-zinc-500 font-medium"
              >
                Verification Code:
              </label>

              <input
                type="number"
                id="verificationCode"
                name="verificationCode"
                value={registerData.verificationCode}
                autoFocus={true}
                onChange={handleRegisterDatachange}
                placeholder={`Code has been sent to ${registerData.email}.`}
                className="w-full bg-white-900 border-none mt-0.5 input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
              />

              {/* Show Errors If Exists.... */}
              {registerError.verificationCodeError && (
                <p className="text-red-400 font-medium text-sm line-clamp-1 -mb-2">
                  {registerError.verificationCodeError}
                </p>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loader}
          className={`w-full register-btn bg-blue-500 opacity-85 rounded-sm py-1.5 text-white ${loader ? "" : "hover:opacity-100 active:scale-97"}  ease-in focus:opacity-100 focus:outline-blue-700 duration-200 font-medium `}
        >
          {loader
            ? verificationCodeField
              ? "Registering User. Please Wait..."
              : "Sending code. Please wait..."
            : verificationCodeField
              ? "Verify Email"
              : "Register User"}
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
