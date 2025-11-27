import { useState } from "react";
import main_img from "../../images/cartify_login_img.png";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

/**
 * --------------------------------------------------------------------------
 * What happens when a usestate gets changed ???
 * --------------------------------------------------------------------------
 * 1-The pages related to this usestate gets updated
 *
 *  1.1-Every statment outside the return get reexcuted ex:All consts (validateEmail, isEmailError) are re-calculated with the new state.
 *      console.logs run again But the Use State elments dosnt get recalc it is outside of the scope.
 *
 *  1.2-The statments inside the Return also gets updated if and only if the statment is reltated to the use State directly or indirectly
 *      if there is a function use this usestate inside the componetn even if the element dosnt use the use state directly and use the function only it gets updated
 *      cuz it uses the funciton which is using the use state
 * --------------------------------------------------------------------------
 */

const Auth_Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pass_see, setPass_see] = useState<boolean>(false);
  const [emailTouched, setEmailTouched] = useState<boolean>(false); //just used to handel when the user interacted with the input or not if the user interacted it is setted to false for the rest of the run until the user refresh the website
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);

  const containWhiteSpace = (email: string): boolean => {
    const spaceRegex = /\s/;
    return spaceRegex.test(email);
  };

  const containAtSymbol = (email: string): boolean => {
    const atSymbolRegex = /@/;
    return atSymbolRegex.test(email);
  };

  // const validUserName = (email: string): boolean => {
  //   const usernameRegex = /^[a-zA-Z0-9._%+-]+@/;
  //   return usernameRegex.test(email);
  // };
  const validDomain = (email: string): boolean => {
    const domainRegex = /@(gmail|yahoo|outlook|hotmail)\.com$/i;
    return domainRegex.test(email);
  };
  const validExtinsion = (email: string): boolean => {
    const extensionRegex = /\.[a-zA-Z]{2,}$/;
    return extensionRegex.test(email);
  };

  const validateEmail = (email: string): boolean => {
    //this function checks the email and being called every time the email changes cuz the email is a usestate so every element related to it rerenders
    //the regex logic

    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return (
      !containWhiteSpace(email) &&
      containAtSymbol(email) &&
      validDomain(email) &&
      validExtinsion(email)
    );
  };

  const passLenGt8 = (password: string): boolean => {
    if (password.length >= 8) {
      return true;
    }
    return false;
  };

  const containLowerCase = (password: string): boolean => {
    const containlowercase = /[a-z]/;
    return containlowercase.test(password);
  };

  const containUpperCase = (password: string): boolean => {
    const containuppercase = /[A-Z]/;
    return containuppercase.test(password);
  };
  const containNumber = (password: string): boolean => {
    const containNumber = /\d/;
    return containNumber.test(password);
  };
  const containSpecialChar = (password: string): boolean => {
    const containspeacialchar = /[@$!%*?&]/;
    return containspeacialchar.test(password);
  };

  const vaildatePassword = (password: string): boolean => {
    //the regex logic
    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    password = password.trim();
    return (
      containLowerCase(password) &&
      containUpperCase(password) &&
      containNumber(password) &&
      containSpecialChar(password) &&
      passLenGt8(password)
    );
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //submition handelr
    e.preventDefault();
    if (validateEmail(email) && vaildatePassword(password)) {
      //send data using api
      console.log("yes valied");
    } else {
      console.log("no not valied");
    }
  };
  // console.log("Email state :" + !validateEmail(email) && emailTouched);
  // console.log("email toched :" + emailTouched);
  console.log("email valid :" + validateEmail(email));
  console.log("space :" + !containWhiteSpace(email));

  return (
    <div className="flex w-full h-screen justify-center items-center gap-24">
      <div className=" overflow-hidden max-w-md lg:block hidden  ">
        <img src={main_img} alt="img_Not_Found 404" className="w-full" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="lg:basis-[30%] lg:max-w-sm w-[80%] p-5 border rounded-2xl flex flex-col gap-5"
      >
        <Link to="/" className="flex gap-4 cursor-pointer">
          <FiShoppingCart className="text-3xl sm:text-4xl bg-teal-600 rounded-md p-2 text-white" />
          <h2 className="py-1.5">Cartify</h2>
        </Link>
        <h1 className="font-bold text-lg">Welcome back</h1>
        <p className="text-sm text-gray-500">
          Log in to your Cartify account to continue
        </p>
        <div className="flex flex-col gap-4">
          <div>
            <div className="label">
              <span
                className={`label-text ${
                  !validateEmail(email) && emailTouched && "text-red-700"
                }`}
              >
                Email
              </span>
            </div>
            <label
              className={`input input-bordered flex items-center gap-2 ${
                !validateEmail(email) && emailTouched
                  ? "input input-error"
                  : "input"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70 shrink-0"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={() => {
                  setEmailTouched(true);
                }}
              />
            </label>
            <div
              className={`w-full ${
                !validateEmail(email) && emailTouched ? "" : "hidden"
              }  bg-gray-100 rounded-lg mt-3 p-3 `}
            >
              <ul className={`flex flex-col gap-2`}>
                <li
                  className={`flex gap-2  items-center ${
                    !containWhiteSpace(email) && "hidden"
                  }`}
                >
                  {containWhiteSpace(email) && (
                    <IoMdCloseCircle className="text-red-600 text-[16px] shrink-0" />
                  )}
                  <p className="text-xs">Email address cannot contain spaces</p>
                </li>
                <li
                  className={`flex gap-2  items-center ${
                    containAtSymbol(email) && "hidden"
                  }`}
                >
                  {!containAtSymbol(email) && (
                    <IoMdCloseCircle className="text-red-600 text-[16px] shrink-0" />
                  )}
                  <p className="text-xs">Email is missing the '@' symbol</p>
                </li>
                <li
                  className={`flex gap-2  items-center ${
                    validDomain(email) && "hidden"
                  }`}
                >
                  {!validDomain(email) && (
                    <IoMdCloseCircle className="text-red-600 text-[16px] shrink-0 " />
                  )}
                  <p className="text-xs ">Please enter a valid domain</p>
                </li>
                <li
                  className={`flex gap-2  items-center ${
                    validExtinsion(email) && "hidden"
                  }`}
                >
                  {!validExtinsion(email) && (
                    <IoMdCloseCircle className="text-red-600 text-[16px] shrink-0 " />
                  )}
                  <p className="text-xs ">
                    Invalid extension. Must be at least 2 letters(e,g .com)
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="label">
              <span
                className={`label-text ${
                  !vaildatePassword(password) &&
                  passwordTouched &&
                  "text-red-700"
                }`}
              >
                Password
              </span>
            </div>
            <label
              className={`input input-bordered flex items-center gap-2 ${
                !vaildatePassword(password) && passwordTouched
                  ? "input input-error"
                  : "input"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70 shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={`${pass_see ? "text" : "password"}`}
                className="grow min-w-0"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => {
                  setPasswordTouched(true);
                }}
              />
              <button
                type="button"
                onClick={() => setPass_see((prev) => !prev)}
              >
                {pass_see ? (
                  <FaRegEye className="shrink-0" />
                ) : (
                  <FaRegEyeSlash className="shrink-0" />
                )}
              </button>
            </label>
            <div
              className={`w-full ${
                !vaildatePassword(password) && passwordTouched ? "" : "hidden"
              }  bg-gray-100 rounded-lg mt-3 p-3 `}
            >
              <ul className={`flex flex-col gap-2`}>
                <li
                  className={`flex gap-2  items-center ${
                    passLenGt8(password) && "hidden"
                  }`}
                >
                  {!passLenGt8(password) && (
                    <IoMdCloseCircle className="text-red-600 text-[16px] shrink-0" />
                  )}
                  <p className="text-xs">
                    Password must contain at least 8 char
                  </p>
                </li>
                <li
                  className={`flex gap-2  items-center ${
                    containLowerCase(password) && "hidden"
                  }`}
                >
                  {!containLowerCase(password) && (
                    <IoMdCloseCircle className="text-red-600 text-[16px] shrink-0" />
                  )}
                  <p className="text-xs">
                    Password must contain at least one Lowercase{" "}
                  </p>
                </li>
                <li
                  className={`flex gap-2  items-center ${
                    containUpperCase(password) && "hidden"
                  }`}
                >
                  {!containUpperCase(password) && (
                    <IoMdCloseCircle className="text-red-600 text-[16px] shrink-0" />
                  )}
                  <p className="text-xs">
                    Password must contain at least one Upper case char
                  </p>
                </li>
                <li
                  className={`flex gap-2  items-center ${
                    containNumber(password) && "hidden"
                  }`}
                >
                  {!containNumber(password) && (
                    <IoMdCloseCircle className="text-red-600 text-[16px] shrink-0" />
                  )}
                  <p className="text-xs">
                    Password must contain at one singel Number
                  </p>
                </li>
                <li
                  className={`flex gap-2  items-center ${
                    containSpecialChar(password) && "hidden"
                  }`}
                >
                  {!containSpecialChar(password) && (
                    <IoMdCloseCircle className="text-red-600 text-[16px] shrink-0" />
                  )}
                  <p className="text-xs">
                    Password must contain at least one Spacial
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div>
              <label className="cursor-pointer label flex gap-4">
                <input type="checkbox" className="checkbox checkbox-xs" />
                <span className="label-text">Remember me</span>
              </label>
            </div>
            <Link
              to="/auth/forgot_pass"
              className="link link-primary !no-underline !text-cyan-600 text-center p-1"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <button className="btn bg-teal-600 w-full btn-sm" type="submit">
          Log in
        </button>
        <div className="flex w-full justify-center gap-3">
          <p>Don't have an account?</p>
          <Link
            to=""
            className="link link-primary !no-underline !text-cyan-600"
          >
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Auth_Login;
