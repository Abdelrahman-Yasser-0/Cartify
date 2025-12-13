import React, { useState } from "react";
import { IoIosCash } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

type Props = {
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  currentStep?: number;
  deliveryOption?: "standard" | "express" | "priority";
  setDeliveryOption?: React.Dispatch<
    React.SetStateAction<"standard" | "express" | "priority">
  >;
};

type ValidationErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  street?: string;
  building?: string;
  city?: string;
  zip?: string;
};

const CheckoutForms = (props: Props) => {
  const { checkout } = useCart();
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const [errors, setErrors] = useState<ValidationErrors>({});

  const [deliveryOptionLocal, setDeliveryOptionLocal] = useState<
    "standard" | "priority" | "express"
  >("standard");

  const deliveryOption = props.deliveryOption ?? deliveryOptionLocal;
  const setDeliveryOption = props.setDeliveryOption ?? setDeliveryOptionLocal;

  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    setDate(value);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    setDate(value);
  };

  const goNext = () => {
    if (props.setStep) props.setStep((s) => s + 1);
  };

  const goBack = () => {
    if (props.setStep) props.setStep((s) => Math.max(1, s - 1));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateZip = (zip: string): boolean => {
    const zipRegex = /^\d{4,}$/;
    return zipRegex.test(zip);
  };

  const validateShippingForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!street.trim()) {
      newErrors.street = "Street address is required";
    } else if (street.trim().length < 5) {
      newErrors.street = "Street address must be at least 5 characters";
    }

    if (!building.trim()) {
      newErrors.building = "Building number is required";
    }

    if (!city.trim()) {
      newErrors.city = "City is required";
    } else if (city.trim().length < 2) {
      newErrors.city = "City must be at least 2 characters";
    }

    if (!zip.trim()) {
      newErrors.zip = "ZIP code is required";
    } else if (!validateZip(zip)) {
      newErrors.zip = "ZIP code must be at least 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateShippingForm()) {
      return;
    }

    const data = {
      fullName,
      email,
      phone,
      street,
      building,
      city,
      zip,
      country: "Egypt",
    };
    goNext();
  };

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goNext();
  };

  const handlePlaceOrder = async (e: React.MouseEvent) => {
    e.preventDefault();
    const payload = {
      shipping: {
        fullName,
        email,
        phone,
        street,
        building,
        city,
        zip,
        country: "Egypt",
      },
      delivery: deliveryOption,
    };
    console.log("Placing order:", payload);
    
    setIsPlacingOrder(true);
    try {
      await checkout();
      navigate("/order_placed");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const step = props.currentStep ?? 1;

  return (
    <div className="w-full">
      {step === 1 && (
        <form onSubmit={handleShippingSubmit} className="flex flex-col gap-6" noValidate>
          <h2 className="text-lg">Shipping Information</h2>

          <label className="form-control w-full">
            <span className="label-text font-semibold">Full Name</span>
            <input
              type="text"
              className={`input bg-gray-100 ${errors.fullName ? "border-red-500" : ""}`}
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) {
                  setErrors({ ...errors, fullName: undefined });
                }
              }}
            />
            {errors.fullName && (
              <span className="label-text text-red-500 text-sm mt-1">{errors.fullName}</span>
            )}
          </label>

          <div className="flex flex-col gap-5 lg:flex-row">
            <label className="form-control w-full">
              <span className="label-text font-semibold">Email</span>
              <input
                type="text"
                className={`input bg-gray-100 ${errors.email ? "border-red-500" : ""}`}
                placeholder="john@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: undefined });
                  }
                }}
              />
              {errors.email && (
                <span className="label-text text-red-500 text-sm mt-1">{errors.email}</span>
              )}
            </label>

            <label className="form-control w-full">
              <span className="label-text font-semibold">Phone</span>
              <input
                type="text"
                className={`input bg-gray-100 ${errors.phone ? "border-red-500" : ""}`}
                placeholder="+20 123 456 7890"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) {
                    setErrors({ ...errors, phone: undefined });
                  }
                }}
              />
              {errors.phone && (
                <span className="label-text text-red-500 text-sm mt-1">{errors.phone}</span>
              )}
            </label>
          </div>

          <label className="form-control w-full">
            <span className="label-text font-semibold">Street Address</span>
            <input
              type="text"
              className={`input bg-gray-100 ${errors.street ? "border-red-500" : ""}`}
              placeholder="123 Main Street"
              value={street}
              onChange={(e) => {
                setStreet(e.target.value);
                if (errors.street) {
                  setErrors({ ...errors, street: undefined });
                }
              }}
            />
            {errors.street && (
              <span className="label-text text-red-500 text-sm mt-1">{errors.street}</span>
            )}
          </label>

          <div className="flex flex-col gap-5 lg:flex-row">
            <label className="form-control w-full">
              <span className="label-text font-semibold">Building Number</span>
              <input
                type="text"
                className={`input bg-gray-100 ${errors.building ? "border-red-500" : ""}`}
                placeholder="123"
                value={building}
                onChange={(e) => {
                  setBuilding(e.target.value);
                  if (errors.building) {
                    setErrors({ ...errors, building: undefined });
                  }
                }}
              />
              {errors.building && (
                <span className="label-text text-red-500 text-sm mt-1">{errors.building}</span>
              )}
            </label>

            <label className="form-control w-full">
              <span className="label-text font-semibold">City</span>
              <input
                type="text"
                className={`input bg-gray-100 ${errors.city ? "border-red-500" : ""}`}
                placeholder="Cairo"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  if (errors.city) {
                    setErrors({ ...errors, city: undefined });
                  }
                }}
              />
              {errors.city && (
                <span className="label-text text-red-500 text-sm mt-1">{errors.city}</span>
              )}
            </label>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <label className="form-control w-full">
              <span className="label-text font-semibold">ZIP Code</span>
              <input
                type="text"
                className={`input bg-gray-100 ${errors.zip ? "border-red-500" : ""}`}
                placeholder="12345"
                value={zip}
                onChange={(e) => {
                  setZip(e.target.value);
                  if (errors.zip) {
                    setErrors({ ...errors, zip: undefined });
                  }
                }}
              />
              {errors.zip && (
                <span className="label-text text-red-500 text-sm mt-1">{errors.zip}</span>
              )}
            </label>

            <label className="form-control w-full select-none">
              <span className="label-text font-semibold">Country</span>
              <input
                type="text"
                className="input bg-gray-100 disabled:text-black"
                value="Egypt"
                disabled
              />
            </label>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="btn bg-teal-600 text-white hover:bg-teal-500"
            >
              Continue to Delivery
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleDeliverySubmit} className="flex flex-col gap-6" noValidate>
          <h2 className="text-lg">Delivery Options</h2>
          <div className="flex flex-col gap-3">
            <label className="inline-flex items-center bg-gray-400/20 p-4 rounded-lg">
              <input
                type="radio"
                name="delivery"
                checked={deliveryOption === "standard"}
                onChange={() => setDeliveryOption("standard")}
                className="mr-2 accent-teal-600"
              />
              <div className="flex gap-2 items-center">
                <div className="flex-col">
                  <p className="font-semibold text-sm">Standard Delivery</p>
                  <p className="font-semibold text-sm text-gray-600">
                    5-7 business days
                  </p>
                </div>
                <p className="align-middle font-semibold text-sm">EGP 9.99</p>
              </div>
            </label>

            <label className="inline-flex items-center bg-gray-400/20 p-4 rounded-lg">
              <input
                type="radio"
                name="delivery"
                checked={deliveryOption === "priority"}
                onChange={() => setDeliveryOption("priority")}
                className="mr-2 accent-teal-600"
              />
              <div className="flex gap-2 items-center">
                <div className="flex-col">
                  <p className="font-semibold text-sm">Priority Delivery</p>
                  <p className="font-semibold text-sm text-gray-600">
                    3-4 business days
                  </p>
                </div>
                <p className="align-middle font-semibold text-sm">EGP 14.99</p>
              </div>
            </label>

            <label className="inline-flex items-center bg-gray-400/20 p-4 rounded-lg">
              <input
                type="radio"
                name="delivery"
                checked={deliveryOption === "express"}
                onChange={() => setDeliveryOption("express")}
                className="mr-2 accent-teal-600"
              />
              <div className="flex gap-2 items-center">
                <div className="flex-col">
                  <p className="font-semibold text-sm">Express Delivery</p>
                  <p className="font-semibold text-sm text-gray-600">
                    1-2 business days
                  </p>
                </div>
                <p className="align-middle font-semibold text-sm">EGP 19.99</p>
              </div>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={goBack}
              className="btn btn-ghost border-gray-200"
            >
              Back
            </button>
            <button
              type="submit"
              className="btn bg-teal-600 text-white hover:bg-teal-500"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleDeliverySubmit} className="flex flex-col gap-6" noValidate>
          <h2 className="text-lg">Delivery Options</h2>
          <div className="flex flex-col gap-3">
            <label className="inline-flex items-center bg-gray-400/20 p-4 rounded-lg">
              <input
                type="radio"
                name="delivery"
                checked={deliveryOption === "standard"}
                onChange={() => setDeliveryOption("standard")}
                className="mr-2 accent-teal-600"
              />
              <div className="flex gap-2 items-center">
                <IoIosCash className="text-teal-600" />
                <p className="font-semibold text-sm"> Cash on Delivery</p>
              </div>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={goBack}
              className="btn btn-ghost border-gray-200"
            >
              Back
            </button>
            <button
              type="submit"
              className="btn bg-teal-600 text-white hover:bg-teal-500"
            >
              Review Order
            </button>
          </div>
        </form>
      )}

      {step === 4 && (
        <div className="flex flex-col gap-6">
          <h2 className="text-lg">Review Your Order</h2>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Shipping</h3>
            <div className="bg-gray-50 p-4 rounded border">
              <p className="font-bold">{fullName}</p>
              <p className="text-gray-500 text-sm">
                {street}, {building}
              </p>
              <p className="text-gray-500 text-sm">
                {city} - {zip}
              </p>
              <p className="text-gray-500 text-sm">{phone}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Delivery</h3>
            <div className="bg-gray-50 p-4 rounded border">
              <p>
                {deliveryOption.charAt(0).toUpperCase() +
                  deliveryOption.slice(1) +
                  " Delivery"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Payment method</h3>
            <div className="bg-gray-50 p-4 rounded border">
              <p>Cash</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={goBack}
              className="btn btn-ghost border-gray-200"
              disabled={isPlacingOrder}
            >
              Back
            </button>
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="btn bg-teal-600 text-white hover:bg-teal-500"
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutForms;
