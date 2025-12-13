import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaCheck } from "react-icons/fa6";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";

const OrderPlaced = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    if (clearCart) clearCart();
  }, []);

  return (
    <div className="bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 min-h-screen">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
              <FaCheck size={42} className="text-green-600" />
            </div>

            <h1 className="text-lg font-semibold text-gray-900 mb-2">
              Order Placed Successfully
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            <Link
              to="/product_listing"
              className="btn btn-accent bg-teal-600 border-none text-white px-6 py-2 rounded-lg w-full"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderPlaced;
