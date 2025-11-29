import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import OrderSummary from "../../components/Cart/OrderSummary";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import Steps from "../../components/Checkout/Steps";
import CheckoutForms from "../../components/Checkout/CheckoutForms";

const Checkout = () => {
  const { items, updateQuantity, removeItem, subtotal, totalItems, clearCart } =
    useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState<
    "standard" | "express" | "priority"
  >("standard");

  const tax = subtotal * 0.08;

  const shippingCharge =
    subtotal > 0
      ? deliveryOption === "standard"
        ? 9.99
        : deliveryOption === "express"
        ? 19.99
        : 14.99
      : 0;
  const grandTotal = subtotal + shippingCharge + tax;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-16 px-4 sm:px-8">
        <div className="max-w-screen-2xl mx-auto flex flex-col gap-8">
          <div>
            <Link to="/cart" className="btn btn-ghost btn-sm mb-4">
              <FaArrowLeft />
              Back to Cart
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 mt-2">
              Checkout
            </h1>

            <Steps currentStep={currentStep} />
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[2fr_1fr] px-4 lg:px-40">
          <div className="bg-white p-8 border rounded-2xl flex flex-col gap-6 w-full">
            <CheckoutForms
              setStep={setCurrentStep}
              currentStep={currentStep}
              deliveryOption={deliveryOption}
              setDeliveryOption={setDeliveryOption}
            />
          </div>

          <OrderSummary
            subtotal={subtotal}
            shipping={shippingCharge}
            tax={tax}
            grandTotal={grandTotal}
            clearCart={clearCart}
            items={items}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
