import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FiHeart } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";

const Favorites = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex items-center justify-center pt-20 pb-12 px-6 mt-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated Heart Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-teal-100 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-teal-600 rounded-full p-8">
                <FiHeart className="text-6xl text-white animate-pulse" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Coming Soon
          </h1>
          <p className="text-xl text-gray-600 mb-2">Your Favorites Section</p>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            We're working hard to bring you an amazing favorites feature. Save
            your favorite products and access them anytime, anywhere.
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-12">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FiHeart className="text-teal-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Save Favorites
              </h3>
              <p className="text-sm text-gray-600">
                Keep track of products you love
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FiShoppingCart className="text-teal-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Access</h3>
              <p className="text-sm text-gray-600">
                Find your saved items instantly
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
              <p className="text-sm text-gray-600">
                Get notified about price drops
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/product_listing"
              className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg"
            >
              Continue Shopping
              <span aria-hidden>→</span>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium px-6 py-3 rounded-lg transition"
            >
              Back to Home
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center gap-2">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
                style={{ animationDelay: `${dot * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
