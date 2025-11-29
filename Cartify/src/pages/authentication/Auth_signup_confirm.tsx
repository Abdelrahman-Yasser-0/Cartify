import { FaCircleCheck } from "react-icons/fa6";
import { IoMdReturnLeft } from "react-icons/io";
import { Link } from "react-router-dom";

const Auth_signup_confirm = ({ stepper }: { stepper: number }) => {
  return (
    <div
      className={`lg:basis-[30%] lg:max-w-sm w-[80%] p-5 border rounded-2xl flex flex-col gap-5 ${
        stepper != 3 && "hidden"
      }`}
    >
      {/*--------------------------------Stepper-------------------------------- */}
      <ul className="steps steps-horizontal">
        <li className="step step-accent">Account</li>
        <li className={`step ${stepper >= 2 && "step-accent"}`}>
          Address Details
        </li>
        <li
          data-content="✓"
          className={`step  ${stepper >= 3 && "step-accent"}`}
        >
          Done
        </li>
      </ul>
      {/*--------------------------------Congrats Message-------------------------------- */}
      <div className="w-full h-full flex flex-col items-center pt-4 text-center text-xl">
<<<<<<< HEAD
        <FaCircleCheck className="text-accent text-5xl shrink-0 pb-3" />
=======
        <FaCircleCheck className="text-accent text-5xl shrink-0 " />
>>>>>>> main
        <p>
          Your Account Have been created
          <span className="text-accent"> Successfully!</span>
        </p>
        <Link to="/auth/login">
          <button
            className="btn mt-4 btn-sm flex-auto bg-teal-300 flex text-gray-600 "
            type="button"
          >
            <IoMdReturnLeft className="shrink-0" />
            Return to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Auth_signup_confirm;
