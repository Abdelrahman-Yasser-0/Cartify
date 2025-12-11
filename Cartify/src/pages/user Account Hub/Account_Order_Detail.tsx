import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { BsFillBoxFill } from "react-icons/bs";
import { useState, useEffect } from "react";

interface Purchase {
  _id: string;
  productId: string | object;
  quantity: number;
  status: string;
  date: number;
}

interface User {
  purchased?: Purchase[];
}

const Account_Order_Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read user object from localStorage
    const userRaw = localStorage.getItem("currentuser");
    if (userRaw && id) {
      try {
        const user: User = JSON.parse(userRaw);
        // Find the specific purchase by _id
        const foundPurchase = user.purchased?.find((p) => p._id === id);
        setPurchase(foundPurchase || null);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setPurchase(null);
      }
    }
    setLoading(false);
  }, [id]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getProductIdString = (productId: string | object): string => {
    if (typeof productId === "string") {
      return productId;
    }
    // If it's an object, try to get an id field or stringify it
    return (
      (productId as any)?._id ||
      (productId as any)?.id ||
      JSON.stringify(productId)
    );
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center bg-gray-50 min-h-screen">
        <div className="w-full max-w-screen-2xl px-5 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!purchase) {
    return (
      <div className="w-full flex justify-center bg-gray-50 min-h-screen">
        <div className="w-full max-w-screen-2xl px-5 py-8">
          {/* Back to Orders Button */}
          <Link
            to="/account/overview"
            className="flex items-center gap-2 text-gray-700 hover:text-cyan-600 transition-colors mb-6"
          >
            <FiArrowLeft className="text-lg" />
            <span className="text-sm font-medium">Back to Orders</span>
          </Link>

          {/* Order Not Found Message */}
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <BsFillBoxFill className="text-gray-400 text-5xl mx-auto mb-4" />
            <h2 className="font-semibold text-xl text-gray-900 mb-2">
              Order not found
            </h2>
            <p className="text-gray-600">
              The order you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-screen-2xl px-5 py-8">
        {/* Back to Orders Button */}
        <Link
          to="/account/overview"
          className="flex items-center gap-2 text-gray-700 hover:text-cyan-600 transition-colors mb-6"
        >
          <FiArrowLeft className="text-lg" />
          <span className="text-sm font-medium">Back to Orders</span>
        </Link>

        {/* Order Summary Card */}
        <div className="bg-gray-100 rounded-lg p-5 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold text-lg text-gray-900">
                Order #{purchase._id.slice(-8)}
              </h2>
              <p className="text-sm text-gray-600">
                Placed on {formatDate(purchase.date)}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(
                purchase.status
              )}`}
            >
              {purchase.status}
            </span>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="font-semibold text-lg text-gray-900 mb-6">
            Order Details
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Status:</span>
              <span
                className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(
                  purchase.status
                )}`}
              >
                {purchase.status}
              </span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Date:</span>
              <span className="text-gray-900">{formatDate(purchase.date)}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Quantity:</span>
              <span className="text-gray-900">{purchase.quantity}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Product ID:</span>
              <span className="text-gray-900 font-mono text-sm">
                {getProductIdString(purchase.productId)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account_Order_Detail;
