import { Link } from "react-router-dom";
import { BsFillBoxFill } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";
import { useState, useEffect } from "react";

type Purchase = {
  _id: string;
  productId: string | object;
  quantity: number;
  status: string;
  date: number;
};

type User = {
  purchased?: Purchase[];
};

const Account_Orders = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    // Read user object from localStorage
    const userRaw = localStorage.getItem("currentuser");
    if (userRaw) {
      try {
        const user: User = JSON.parse(userRaw);
        setPurchases(user.purchased || []);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setPurchases([]);
      }
    }
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-screen-2xl px-5 py-8">
        {/* Header Section */}
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="font-semibold text-2xl">Order History</h1>
          <p className="text-sm text-gray-500">
            View and track all your orders
          </p>
        </div>

        {/* Order List */}
        <div className="flex flex-col gap-4">
          {purchases.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            purchases.map((purchase) => (
              <Link
                key={purchase._id}
                to={`/account/orders/${purchase._id}`}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Left Side - Order Details */}
                <div className="flex items-center gap-4 flex-1">
                  {/* Package Icon */}
                  <div className="w-12 h-12 bg-cyan-50 border-2 border-cyan-200 rounded-lg flex items-center justify-center shrink-0">
                    <BsFillBoxFill className="text-cyan-600 text-xl" />
                  </div>

                  {/* Order Info */}
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-base text-gray-900">
                        Order #{purchase._id.slice(-8)}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          purchase.status
                        )}`}
                      >
                        {purchase.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Ordered on {formatDate(purchase.date)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {purchase.quantity}
                    </p>
                  </div>
                </div>

                {/* Right Side - Arrow */}
                <div className="flex items-center gap-4 shrink-0">
                  <FiChevronRight className="text-gray-400 text-xl" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Account_Orders;
