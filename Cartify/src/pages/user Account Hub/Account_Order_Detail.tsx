import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { BsFillBoxFill } from "react-icons/bs";
import { useState, useEffect } from "react";

type Product = {
  _id: string;
  title: string;
  brand: string;
  price: number;
  imgurl: string;
  description: string;
  category: string;
};

type Purchase = {
  _id: string;
  productId: Product;
  quantity: number;
  status: string;
  date: string;
};

const Account_Order_Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchase = async () => {
      const token = localStorage.getItem("token");

      if (!token || !id) {
        setPurchase(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:3000/purchased", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status == 200) {
          const allPurchases = data.userpurchased;
          // Find the specific purchase by _id from the list
          const foundPurchase = allPurchases?.find(
            (p: Purchase) => p._id === id
          );

          console.log(foundPurchase);
          setPurchase(foundPurchase || null);
        } else {
          console.log("Failed to fetch purchase");
          setPurchase(null);
        }
      } catch (error) {
        console.log(error);
        setPurchase(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchase();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

          {purchase.productId ? (
            <div className="flex flex-col gap-6">
              {/* Product Image and Basic Info */}
              <div className="flex gap-4 pb-4 border-b border-gray-200">
                {purchase.productId.imgurl ? (
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    <img
                      src={purchase.productId.imgurl}
                      alt={purchase.productId.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget
                          .nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div className="hidden w-full h-full bg-cyan-50 border-2 border-cyan-200 rounded-lg items-center justify-center">
                      <BsFillBoxFill className="text-cyan-600 text-2xl" />
                    </div>
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-cyan-50 border-2 border-cyan-200 rounded-lg flex items-center justify-center shrink-0">
                    <BsFillBoxFill className="text-cyan-600 text-2xl" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600 mb-1">
                    {purchase.productId.brand}
                  </p>
                  <h3 className="font-semibold text-base text-gray-900 mb-2">
                    {purchase.productId.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {purchase.productId.description}
                  </p>
                </div>
              </div>

              {/* Order Information */}
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
                  <span className="text-gray-900">
                    {formatDate(purchase.date)}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Quantity:</span>
                  <span className="text-gray-900">{purchase.quantity}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Unit Price:</span>
                  <span className="text-gray-900">
                    ${purchase.productId.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-900 font-semibold text-lg">
                    Total Price:
                  </span>
                  <span className="text-gray-900 font-semibold text-lg">
                    $
                    {(
                      (purchase.productId.price || 0) * purchase.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
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
                <span className="text-gray-900">
                  {formatDate(purchase.date)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Quantity:</span>
                <span className="text-gray-900">{purchase.quantity}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account_Order_Detail;
