import Header from "./../../components/Header";
import Account_Profile from "./Account_Profile";
import Footer from "./../../components/Footer";
import { BsFillBoxFill } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";

import Spacer from "./../home/Spacer";
import { useState } from "react";
import { profile } from "console";
import Account_Orders from "./Account_Orders";
const Account_Overview = () => {
  const [mode, setMode] = useState<string>("profile");
  console.log(mode);

  return (
    <div>
      <Header />

      <div className=" w-full flex justify-center pt-28 px-5">
        <div className="max-w-screen-2xl w-full flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-2xl">My Account</h1>
            <p className="text-sm text-gray-500">
              Manage your account settings and preferences
            </p>
          </div>
          <div className="flex w-full gap-5">
            <button
              onClick={() => {
                setMode("profile");
              }}
              className={` btn mt-4 btn-sm flex  border-0 bg-transparent  ${
                mode == "profile" ? "text-cyan-400" : "text-gray-600"
              } `}
            >
              <MdOutlineAccountCircle className="shrink-0" />
              Profile
            </button>
            <button
              onClick={() => {
                setMode("order");
              }}
              className={` btn mt-4 btn-sm flex  border-0 bg-transparent  ${
                mode == "order" ? "text-cyan-400" : "text-gray-600"
              } `}
            >
              <BsFillBoxFill className="shrink-0" />
              Order
            </button>
          </div>
        </div>
      </div>
      {mode == "profile" && <Account_Profile />}
      {mode == "order" && <Account_Orders />}
      <Spacer />
      <Footer />
    </div>
  );
};

export default Account_Overview;
