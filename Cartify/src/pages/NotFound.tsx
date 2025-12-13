import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FiHome, FiShoppingCart } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-20 pb-12 flex-1 flex items-center justify-center">
        <div className="max-w-screen-2xl mx-auto px-12 w-full">
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="relative mb-8">
              <h1 className="text-9xl font-bold text-gray-200 select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <FiShoppingCart className="text-6xl text-teal-600 opacity-20" />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Page Not Found
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Oops! The page you're looking for doesn't exist. It might have
                been moved or deleted.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/"
                className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-teal-700 transition"
              >
                <FiHome className="text-xl" />
                Go to Home
              </Link>
              <Link
                to="/product_listing"
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-300 transition"
              >
                <FiShoppingCart className="text-xl" />
                Browse Products
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 w-full max-w-md">
              <p className="text-sm text-gray-500 mb-4">You might be looking for:</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link
                  to="/"
                  className="text-teal-600 hover:text-teal-700 hover:underline"
                >
                  Home
                </Link>
                <Link
                  to="/product_listing"
                  className="text-teal-600 hover:text-teal-700 hover:underline"
                >
                  Shop
                </Link>
                <Link
                  to="/faqs"
                  className="text-teal-600 hover:text-teal-700 hover:underline"
                >
                  FAQs
                </Link>
                <Link
                  to="/contact-us"
                  className="text-teal-600 hover:text-teal-700 hover:underline"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
