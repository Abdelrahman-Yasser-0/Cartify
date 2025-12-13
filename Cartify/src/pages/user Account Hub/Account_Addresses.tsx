import { Auth_Signup_2_props } from "../types";
const Account_Addresses = ({
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
  isEditing,
}: Auth_Signup_2_props) => {
  return (
    <div className="">
      <div className=" w-full flex flex-col  md:flex-row gap-3 ">
        <div className="w-full flex-1 min-w-0">
          <div className="label">
            <span
              className={`label-text ${
                !(country.length > 0) && countryTouched && "text-red-700"
              }`}
            >
              Country
            </span>
          </div>
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
              disabled={!isEditing}
              value={country}
            />
          </label>
        </div>
        <div className="w-full flex-1 min-w-0">
          <div className="label">
            <span
              className={`label-text ${
                !(city.length > 0) && cityTouched && "text-red-700"
              }`}
            >
              City
            </span>
          </div>
          <label
            className={`input input-bordered flex items-center gap-2  min-w-0${
              !(city.length > 0) && cityTouched ? "input input-error" : "input"
            }`}
          >
            <input
              type="text"
              className="grow"
              name="city"
              autoComplete="shipping address-level2"
              placeholder="e.g., New Cairo"
              onChange={(e) => {
                setCity(e.target.value);
              }}
              onBlur={() => {
                setcityTouched(true);
              }}
              disabled={!isEditing}
              value={city}
            />
          </label>
        </div>
      </div>
      <div className="w-full flex-1 min-w-0">
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
            disabled={!isEditing}
            value={streetAddress}
          />
        </label>
      </div>
      <div className=" w-full flex flex-col  md:flex-row gap-3 ">
        <div className="w-full flex-1 min-w-0">
          <div className="label">
            <span
              className={`label-text ${
                !(apartment.length > 0) && apartmentouched && "text-red-700"
              }`}
            >
              Apartment, Suite, etc.
            </span>
          </div>
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
              placeholder="e.g., Egypt"
              onChange={(e) => {
                setApartment(e.target.value);
              }}
              onBlur={() => {
                setApartmentTouched(true);
              }}
              disabled={!isEditing}
              value={apartment}
            />
          </label>
        </div>
        <div className="w-full flex-1 min-w-0">
          <div className="label">
            <span
              className={`label-text ${
                !(zip.length > 0) && zipTouched && "text-red-700"
              }`}
            >
              ZIP/ Postal Code
            </span>
          </div>
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
              disabled={!isEditing}
              value={zip}
            />
          </label>
        </div>
      </div>
      <div className="w-full flex-1 min-w-0">
        <div className="label">
          <span
            className={`label-text ${
              !/^(\+20\s?0?|0)1[0125][0-9]{8}$/.test(phoneNumber) &&
              phnoeNumberTouched &&
              "text-red-700"
            }`}
          >
            Phone Number
          </span>
        </div>
        <label
          className={`input input-bordered flex items-center gap-2  min-w-0${
            !/^(\+20\s?0?|0)1[0125][0-9]{8}$/.test(phoneNumber) &&
            phnoeNumberTouched
              ? "input input-error"
              : "input"
          }`}
        >
          <input
            type="text"
            className="grow"
            name="phone"
            autoComplete="tel"
            placeholder="+20 01011550362"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            onBlur={() => {
              setPhoneNumberTouched(true);
            }}
            disabled={!isEditing}
            value={phoneNumber}
          />
        </label>
      </div>
    </div>
  );
};

export default Account_Addresses;
