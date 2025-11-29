import { Auth_Signup_2_props } from "../types";
const Auth_Signup_2 = ({
  country,
  setCountry,
  city,
  setCity,
  apartment,
  setApartment,
  zip,
  setZip,
  phoneNumber,
  setPhoneNumber,
  streetAddress,
  setStreetAddress,
  countryTouched,
  setcountryTouched,
  cityTouched,
  setcityTouched,
  apartmentouched,
  setApartmentTouched,
  zipTouched,
  setZipTouched,
  phnoeNumberTouched,
  setPhoneNumberTouched,
  streetAddressTouched,
  setstreetAddressTouched,
}: Auth_Signup_2_props) => {
  return (
    <div>
      {/*--------------------------------Country+City-------------------------------- */}
      <div className=" w-full flex flex-col  md:flex-row gap-3 ">
        {/*--------------------------------Country-------------------------------- */}
        <div className="w-full flex-1 min-w-0">
          {/*--------------------------------Input Label Name-------------------------------- */}
          <div className="label">
            <span
              className={`label-text ${
                !(country.length > 0) && countryTouched && "text-red-700"
              }`}
            >
              Country
            </span>
          </div>
          {/*--------------------------------Input -------------------------------- */}
          <label
            className={`input input-bordered flex items-center gap-2 w-full min-w-0 ${
              !(country.length > 0) && countryTouched
                ? "input input-error"
                : "input"
            }`}
          >
            <input
              type="text"
              className="grow"
              name="country"
              autoComplete="shipping country"
              placeholder="e.g., Egypt"
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              onBlur={() => {
                setcountryTouched(true);
              }}
            />
          </label>
        </div>
        {/*--------------------------------City-------------------------------- */}
        <div className="w-full flex-1 min-w-0">
          {/*--------------------------------Input Label Name-------------------------------- */}
          <div className="label">
            <span
              className={`label-text ${
                !(city.length > 0) && cityTouched && "text-red-700"
              }`}
            >
              City
            </span>
          </div>
          {/*--------------------------------Input -------------------------------- */}
          <label
            className={`input input-bordered flex items-center gap-2  min-w-0${
              !(city.length > 0) && cityTouched ? "input input-error" : "input"
            }`}
          >
            <input
              type="text"
              className="grow"
              name="city"
              // "address-level2" is the standard code for City
              autoComplete="shipping address-level2"
              placeholder="e.g., New Cairo"
              onChange={(e) => {
                setCity(e.target.value);
              }}
              onBlur={() => {
                setcityTouched(true);
              }}
            />
          </label>
        </div>
      </div>
      {/*--------------------------------Street Address-------------------------------- */}
      <div className="w-full flex-1 min-w-0">
        {/*--------------------------------Input Label Name-------------------------------- */}
        <div className="label">
          <span
            className={`label-text ${
              !(streetAddress.length > 0) &&
              streetAddressTouched &&
              "text-red-700"
            }`}
          >
            Street Address
          </span>
        </div>
        {/*--------------------------------Input -------------------------------- */}
        <label
          className={`input input-bordered flex items-center gap-2  min-w-0${
            !(streetAddress.length > 0) && streetAddressTouched
              ? "input input-error"
              : "input"
          }`}
        >
          <input
            type="text"
            className="grow"
            name="address"
            autoComplete="shipping address-line1"
            placeholder="e.g., 123 Main Street"
            onChange={(e) => {
              setStreetAddress(e.target.value);
            }}
            onBlur={() => {
              setstreetAddressTouched(true);
            }}
          />
        </label>
      </div>
      <div className=" w-full flex flex-col  md:flex-row gap-3 ">
        {/*--------------------------------Apartment, Suite, etc.-------------------------------- */}
        <div className="w-full flex-1 min-w-0">
          {/*--------------------------------Input Label Name-------------------------------- */}
          <div className="label">
            <span
              className={`label-text ${
                !(apartment.length > 0) && apartmentouched && "text-red-700"
              }`}
            >
              Apartment, Suite, etc.
            </span>
          </div>
          {/*--------------------------------Input -------------------------------- */}
          <label
            className={`input input-bordered flex items-center gap-2 w-full min-w-0 ${
              !(apartment.length > 0) && apartmentouched
                ? "input input-error"
                : "input"
            }`}
          >
            <input
              type="text"
              className="grow"
              name="apartment"
              autoComplete="shipping address-line2"
              placeholder="e.g., 123"
              onChange={(e) => {
                setApartment(e.target.value);
              }}
              onBlur={() => {
                setApartmentTouched(true);
              }}
            />
          </label>
        </div>
        {/*--------------------------------ZIP-------------------------------- */}
        <div className="w-full flex-1 min-w-0">
          {/*--------------------------------Input Label Name-------------------------------- */}
          <div className="label">
            <span
              className={`label-text ${
                !(zip.length > 0) && zipTouched && "text-red-700"
              }`}
            >
              ZIP/ Postal Code
            </span>
          </div>
          {/*--------------------------------Input -------------------------------- */}
          <label
            className={`input input-bordered flex items-center gap-2  min-w-0${
              !(zip.length > 0) && zipTouched ? "input input-error" : "input"
            }`}
          >
            <input
              type="text"
              className="grow"
              name="zip"
              autoComplete="shipping postal-code"
              placeholder="e.g., New Cairo"
              onChange={(e) => {
                setZip(e.target.value);
              }}
              onBlur={() => {
                setZipTouched(true);
              }}
            />
          </label>
        </div>
      </div>
      {/*--------------------------------Phone Number-------------------------------- */}
      <div className="w-full flex-1 min-w-0">
        {/*--------------------------------Input Label Name-------------------------------- */}
        <div className="label">
          <span
            className={`label-text ${
              !/^01[0125][0-9]{8}$/.test(phoneNumber) &&
              phnoeNumberTouched &&
              "text-red-700"
            }`}
          >
            Phone Number
          </span>
        </div>
        {/*--------------------------------Input -------------------------------- */}
        <label
          className={`input input-bordered flex items-center gap-2  min-w-0${
            !/^(\+20|0)1[0125][0-9]{8}$/.test(phoneNumber) && phnoeNumberTouched
              ? "input input-error"
              : "input"
          }`}
        >
          <input
            type="text"
            className="grow"
            name="phone"
            autoComplete="tel"
            placeholder="+2012345678901"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            onBlur={() => {
              setPhoneNumberTouched(true);
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default Auth_Signup_2;
