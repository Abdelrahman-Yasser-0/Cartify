import { useState } from "react";
import main_img from "../../images/cartify_login_img.png";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { users } from "../usersData";
import { METHODS } from "http";

const Auth_Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pass_see, setPass_see] = useState<boolean>(false);
  const [emailTouched, setEmailTouched] = useState<boolean>(false); //just used to handel when the user interacted with the input or not if the user interacted it is setted to false for the rest of the run until the user refresh the website
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<boolean>(false);

  const containWhiteSpace = (email: string): boolean => {
    const spaceRegex = /\s/;
    return spaceRegex.test(email);
  };

  const containAtSymbol = (email: string): boolean => {
    const atSymbolRegex = /@/;
    return atSymbolRegex.test(email);
  };

  const validDomain = (email: string): boolean => {
    const domainRegex = /@(gmail|yahoo|outlook|hotmail|example)\.com$/i;
    return domainRegex.test(email);
  };
  const validExtinsion = (email: string): boolean => {
    const extensionRegex = /\.[a-zA-Z]{2,}$/;
    return extensionRegex.test(email);
  };

  const validateEmail = (email: string): boolean => {
    return true;
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

  const vaildatePassword = (password: string): boolean => {
    password = password.trim();
    if (password == "adminpassword") {
      return true;
    }
    return (
      containLowerCase(password) &&
      containUpperCase(password) &&
      containNumber(password) &&
      passLenGt8(password)
    );
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateEmail(email) && vaildatePassword(password)) {
      try {
        setLoading(true);
        const response = await fetch(
          "https://cartifybackend.vercel.app/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
          }
        );
        const data = await response.json();

        if (response.status == 200) {
          setLoading(false);
          setLoginError(false);
          console.log("Login is Correct", data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        } else if (response.status == 404) {
          setLoading(false);
          console.log("the user is not created");
          setLoginError(true);
        } else if (response.status == 401) {
          setLoading(false);
          setLoginError(true);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <div className="flex w-full min-h-screen justify-center items-center gap-24p pt-10">
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
                type="email"
                className="grow"
                placeholder="Email"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLoginError(false);
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
                    <IoClose className="text-red-600 text-[16px] shrink-0" />
                  )}
                  <p className="text-xs">Email address cannot contain spaces</p>
                </li>
                <li
                  className={`flex gap-2  items-center ${
                    containAtSymbol(email) && "hidden"
                  }`}
                >
                  {!containAtSymbol(email) && (
                    <IoClose className="text-red-600 text-[16px] shrink-0" />
                  )}
                  <p className="text-xs">Email is missing the '@' symbol</p>
                </li>
                <li
                  className={`flex gap-2  items-center ${
                    validDomain(email) && "hidden"
                  }`}
                >
                  {!validDomain(email) && (
                    <IoClose className="text-red-600 text-[16px] shrink-0 " />
                  )}
                  <p className="text-xs ">Please enter a valid domain</p>
                </li>
                <li
                  className={`flex gap-2  items-center ${
                    validExtinsion(email) && "hidden"
                  }`}
                >
                  {!validExtinsion(email) && (
                    <IoClose className="text-red-600 text-[16px] shrink-0 " />
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
                name="password"
                autoComplete="new-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError(false);
                }}
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
                    <IoClose className="text-red-600 text-[16px] shrink-0" />
                  )}
                  <p className="text-xs">
                    Password must contain at least 8 character
                  </p>
                </li>
                <li
                  className={`flex gap-2  items-center ${
                    containLowerCase(password) && "hidden"
                  }`}
                >
                  {!containLowerCase(password) && (
                    <IoClose className="text-red-600 text-[16px] shrink-0" />
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
                    <IoClose className="text-red-600 text-[16px] shrink-0" />
                  )}
                  <p className="text-xs">
                    Password must contain at least one Uppercase character
                  </p>
                </li>
                <li
                  className={`flex gap-2  items-center ${
                    containNumber(password) && "hidden"
                  }`}
                >
                  {!containNumber(password) && (
                    <IoClose className="text-red-600 text-[16px] shrink-0" />
                  )}
                  <p className="text-xs">
                    Password must contain at one single Number
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
        <p
          className={`text-red-600 flex w-full justify-center items-center gap-4 ${
            !loginError && "hidden  "
          }`}
        >
          <span>
            <IoClose className="text-red-600 text-[16px] shrink-0" />
          </span>
          Incorrect email or password.
        </p>
        <button
          className={`btn bg-teal-600 w-full btn-sm text-white ${
            validateEmail(email) && vaildatePassword(password)
              ? ""
              : "btn-disabled"
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              Validating
              <span className="loading loading-dots loading-sm"></span>
            </div>
          ) : (
            "Log in"
          )}
        </button>

        <div className="flex w-full justify-center gap-3">
          <p>Don't have an account?</p>
          <Link
            to="/auth/signup"
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
