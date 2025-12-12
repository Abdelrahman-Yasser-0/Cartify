import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FiHeart } from "react-icons/fi";
import { useWishlist } from "../../context/WishlistContext";
import Card from "../../components/Card";

const Favorites = () => {
  const { items, loading } = useWishlist();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-20">
          <span className="loading loading-spinner loading-lg text-teal-600"></span>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center py-52 px-6">
          <div className="max-w-2xl mx-auto text-center">
            {/* Empty Heart Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="relative bg-teal-100 rounded-full p-8">
                  <FiHeart className="text-6xl text-teal-600" />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Favorites List is Empty
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Start adding products to your favorites and they'll appear here
              for easy access anytime.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/product_listing"
                className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg"
              >
                Browse Products
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium px-6 py-3 rounded-lg transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <FiHeart className="text-teal-600 fill-teal-600" />
              My Favorites
            </h1>
            <p className="text-gray-600">
              {items.length} {items.length === 1 ? "item" : "items"} in your
              favorites
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>

          {/* Continue Shopping Button */}
          <div className="mt-12 text-center">
            <Link
              to="/product_listing"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium px-6 py-3 rounded-lg transition"
            >
              Continue Shopping
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
