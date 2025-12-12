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

const CheckoutForms = (props: Props) => {
  const { checkout } = useCart();
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  // Shipping state (persists across steps since same component remains mounted)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  // Delivery state (local fallback if parent doesn't provide)
  const [deliveryOptionLocal, setDeliveryOptionLocal] = useState<
    "standard" | "priority" | "express"
  >("standard");

  const deliveryOption = props.deliveryOption ?? deliveryOptionLocal;
  const setDeliveryOption = props.setDeliveryOption ?? setDeliveryOptionLocal;

  // Payment state
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, ""); // only numbers

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    setDate(value);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, ""); // only numbers

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

  // Handlers for each step
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    // console.log("Saved Shipping Info:", data);
    goNext();
  };

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Delivery option:", deliveryOption);
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
        <form onSubmit={handleShippingSubmit} className="flex flex-col gap-6">
          <h2 className="text-lg">Shipping Information</h2>

          <label className="form-control w-full">
            <span className="label-text font-semibold">Full Name</span>
            <input
              type="text"
              className="input bg-gray-100"
              placeholder="John Doe"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>

          <div className="flex flex-col gap-5 lg:flex-row">
            <label className="form-control w-full">
              <span className="label-text font-semibold">Email</span>
              <input
                type="email"
                className="input bg-gray-100"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text font-semibold">Phone</span>
              <input
                type="text"
                className="input bg-gray-100"
                placeholder="+20 123 456 7890"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>

          <label className="form-control w-full">
            <span className="label-text font-semibold">Street Address</span>
            <input
              type="text"
              className="input bg-gray-100"
              placeholder="123 Main Street"
              required
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </label>

          <div className="flex flex-col gap-5 lg:flex-row">
            <label className="form-control w-full">
              <span className="label-text font-semibold">Building Number</span>
              <input
                type="text"
                className="input bg-gray-100"
                placeholder="123"
                required
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text font-semibold">City</span>
              <input
                type="text"
                className="input bg-gray-100"
                placeholder="Cairo"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <label className="form-control w-full">
              <span className="label-text font-semibold">ZIP Code</span>
              <input
                type="text"
                className="input bg-gray-100"
                placeholder="12345"
                required
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
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
        <form onSubmit={handleDeliverySubmit} className="flex flex-col gap-6">
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
                <p className="align-middle font-semibold text-sm">$9.99</p>
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
                <p className="align-middle font-semibold text-sm">$14.99</p>
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
                <p className="align-middle font-semibold text-sm">$19.99</p>
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
        <form onSubmit={handleDeliverySubmit} className="flex flex-col gap-6">
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
