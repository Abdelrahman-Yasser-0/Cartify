import { useState } from "react";
import main_img from "../../images/cartify_login_img.png";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";

const Auth_Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pass_see, setPass_see] = useState<boolean>(false);
  const [emailTouched, setEmailTouched] = useState<boolean>(false); //just used to handel when the user interacted with the input or not if the user interacted it is setted to false for the rest of the run until the user refresh the website
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    //this function checks the email and being called every time the email changes cuz the email is a usestate so every element related to it rerenders
    //the regex logic
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const vaildatePassword = (password: string): boolean => {
    //the regex logic
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
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
  // console.log("email valid :" + validateEmail(email));

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
        <button
          className={`btn bg-teal-600 w-full btn-sm text-white ${
            validateEmail(email) && vaildatePassword(password)
              ? ""
              : "btn-disabled"
          }`}
          type="submit"
        >
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
