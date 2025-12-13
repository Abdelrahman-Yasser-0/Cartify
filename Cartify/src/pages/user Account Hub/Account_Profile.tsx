import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import Account_Addresses from "./Account_Addresses";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { json } from "stream/consumers";

const Account_Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [fullName, setfullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pass_see, setPass_see] = useState<boolean>(false);
  const [emailTouched, setEmailTouched] = useState<boolean>(false); //just used to handel when the user interacted with the input or not if the user interacted it is setted to false for the rest of the run until the user refresh the website
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);
  const [fullNameTouched, setfullNameTouched] = useState<boolean>(false);
  const [countryTouched, setcountryTouched] = useState<boolean>(false);
  const [cityTouched, setcityTouched] = useState<boolean>(false);
  const [apartmentouched, setApartmentTouched] = useState<boolean>(false);
  const [zipTouched, setZipTouched] = useState<boolean>(false);
  const [phnoeNumberTouched, setPhoneNumberTouched] = useState<boolean>(false);
  const [streetAddressTouched, setstreetAddressTouched] =
    useState<boolean>(false);
  const [validemail, setValidEmail] = useState<boolean>(true);

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
  const validateFullName = (fullName: string): boolean => {
    const validFullName = /^[a-zA-Z\u00C0-\u00FF\s-]{2,30}$/;
    return validFullName.test(fullName);
  };

  const vaildatePassword = (password: string): boolean => {
    password = password.trim();
    return (
      containLowerCase(password) &&
      containUpperCase(password) &&
      containNumber(password) &&
      containSpecialChar(password) &&
      passLenGt8(password)
    );
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("currentuser");
    navigate("/auth/login");
  };
  console.log(saving);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      validateEmail(email) &&
      country.length > 0 &&
      city.length > 0 &&
      streetAddress.length > 0 &&
      apartment.length > 0 &&
      zip.length > 0 &&
      /^(\+20\s?0?|0)1[0125][0-9]{8}$/.test(phoneNumber)
    ) {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }
      const requestBody = {
        name: fullName,
        email: email,
        phone: phoneNumber,
        password: password.length > 0 ? password : "",
        shippingAddress: {
          country: country,
          city: city,
          streetAddress: streetAddress,
          apartment: apartment,
          zip: zip,
        },
      };

      try {
        setSaving(true);
        const response = await fetch(
          "https://cartifybackend.vercel.app/user/me",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
          }
        );

        const data = await response.json();

        if (response.status == 200) {
          setSaving(false);
          console.log("Update Successful", data);

          localStorage.setItem("user", JSON.stringify(data.user));

          setIsEditing(false);
        } else if (response.status == 400) {
          setSaving(false);
          setValidEmail(false);
          console.log("it is already used");
          console.log(validemail);
        } else {
          setSaving(false);
          console.log("Update failed:", data.message);
        }
      } catch (error) {
        setSaving(false);
        console.log("Network error", error);
      }
    } else {
      console.log("Validation Failed: Check empty fields");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/auth/login");
        return;
      }

      try {
        const response = await fetch(
          "https://cartifybackend.vercel.app/user/me",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.status == 200) {
          const cuurentuser = data;
          console.log(cuurentuser);

          setfullName(cuurentuser.name || "");
          setEmail(cuurentuser.email || "");
          setPhoneNumber(cuurentuser.phone || "");

          if (cuurentuser.shippingAddress) {
            setCountry(cuurentuser.shippingAddress.country || "");
            setCity(cuurentuser.shippingAddress.city || "");
            setStreetAddress(cuurentuser.shippingAddress.streetAddress || "");
            setApartment(cuurentuser.shippingAddress.apartment || "");
            setZip(cuurentuser.shippingAddress.zip || "");
          }
          localStorage.setItem("currentuser", JSON.stringify(cuurentuser));
        } else {
          console.log("Failed to fetch user");
          navigate("/auth/login");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>
          Loding Profile
          <span className="loading loading-spinner loading-md"></span>
        </p>
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-screen-2xl min-h-screen ">
        <form
          onSubmit={handleSubmit}
          className={`max-w-screen-2xl p-5 flex flex-col gap-5`}
        >
          <div className={`flex flex-col gap-4  border rounded-2xl p-5`}>
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-base">Personal Information </h1>
              <p className="text-sm text-gray-500">
                Update your personal details and your Address Information
              </p>
            </div>
            <div>
              <div className="label">
                <span
                  className={`label-text ${
                    !validateFullName(fullName) &&
                    fullNameTouched &&
                    "text-red-700"
                  }`}
                >
                  Full Name
                </span>
              </div>
              <label
                className={`input input-bordered flex items-center gap-2 ${
                  !validateFullName(fullName) && fullNameTouched
                    ? "input input-error"
                    : "input"
                }`}
              >
                <RiAccountCircleFill className="text-gray-600" />
                <input
                  type="text"
                  className="grow"
                  name="name"
                  autoComplete="name"
                  placeholder="Enter Your Full Name"
                  onChange={(e) => {
                    setfullName(e.target.value);
                  }}
                  onBlur={() => {
                    setfullNameTouched(true);
                  }}
                  disabled={!isEditing}
                  value={fullName}
                />
              </label>
              <div
                className={`w-full ${
                  !validateFullName(fullName) && fullNameTouched ? "" : "hidden"
                }  bg-gray-100 rounded-lg mt-3 p-3 `}
              >
                <ul className={`flex flex-col gap-2`}>
                  <li
                    className={`flex gap-2  items-center ${
                      validateEmail(fullName) && "hidden"
                    }`}
                  >
                    {!validateEmail(fullName) && (
                      <IoClose className="text-red-600 text-[16px] shrink-0 self-start " />
                    )}
                    <div className="flex flex-col gap-1">
                      <p className="text-xs ">Please enter a valid Full name</p>
                      <p className="text-xs ">
                        A valid name cannot contain a Number or a Special
                        character(ex:@,#,$.... )
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
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
                  (!validateEmail(email) || !validemail) && emailTouched
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
                  name="email"
                  autoComplete="username"
                  placeholder="Enter Your Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setValidEmail(true);
                  }}
                  onBlur={() => {
                    setEmailTouched(true);
                  }}
                  disabled={!isEditing}
                  value={email}
                />
              </label>
              <div
                className={`w-full ${
                  (!validateEmail(email) || !validemail) && emailTouched
                    ? ""
                    : "hidden"
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
                    <p className="text-xs">
                      Email address cannot contain spaces
                    </p>
                  </li>
                  <li
                    className={`flex gap-2  items-center ${
                      validemail && "hidden"
                    }`}
                  >
                    {!validemail && (
                      <IoClose className="text-red-600 text-[16px] shrink-0" />
                    )}
                    <p className="text-xs">Email is already in use</p>
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
                  name="password"
                  autoComplete="new-password"
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => {
                    setPasswordTouched(true);
                  }}
                  disabled={!isEditing}
                  value={password}
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
                  <li
                    className={`flex gap-2  items-center ${
                      containSpecialChar(password) && "hidden"
                    }`}
                  >
                    {!containSpecialChar(password) && (
                      <IoClose className="text-red-600 text-[16px] shrink-0" />
                    )}
                    <p className="text-xs">
                      Password must contain at least one Special character
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`w-full flex flex-col gap-4  border rounded-2xl mt-5 p-5`}
          >
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-base">Shipping Address </h1>
              <p className="text-sm text-gray-500">
                This will be your default shipping address
              </p>
            </div>
            <Account_Addresses
              country={country}
              setCountry={setCountry}
              city={city}
              setCity={setCity}
              apartment={apartment}
              setApartment={setApartment}
              zip={zip}
              setZip={setZip}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              streetAddress={streetAddress}
              setStreetAddress={setStreetAddress}
              countryTouched={countryTouched}
              setcountryTouched={setcountryTouched}
              cityTouched={cityTouched}
              setcityTouched={setcityTouched}
              apartmentouched={apartmentouched}
              setApartmentTouched={setApartmentTouched}
              zipTouched={zipTouched}
              setZipTouched={setZipTouched}
              phnoeNumberTouched={phnoeNumberTouched}
              setPhoneNumberTouched={setPhoneNumberTouched}
              streetAddressTouched={streetAddressTouched}
              setstreetAddressTouched={setstreetAddressTouched}
              isEditing={isEditing}
            />
          </div>

          <div className={` flex flex-1 min-w-0  gap-5 justify-between `}>
            <div>
              {!isEditing ? (
                <button
                  className="btn bg-teal-600 btn-sm text-white"
                  type="button"
                  onClick={(e) => {
                    setIsEditing(true);
                    e.preventDefault(); // Prevents default form actions
                    e.stopPropagation(); // Stops the click from bubbling up
                  }}
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  className="btn bg-teal-600 btn-sm text-white"
                  type="submit"
                  disabled={saving}
                >
                  {saving ? (
                    <div className="flex items-center gap-2">
                      Saving
                      <span className="loading loading-dots loading-sm"></span>
                    </div>
                  ) : (
                    "Save Edit"
                  )}
                </button>
              )}
            </div>

            <button
              className="btn btn-error text-white btn-sm"
              type="button"
              onClick={() => logout()}
            >
              <CiLogout className="shrink-0" /> Log Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account_Profile;
