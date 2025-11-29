import { Link } from "react-router-dom";
import { BsFillBoxFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FiFilter } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { orders } from "../productsData";

const Account_Orders = () => {
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

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order number..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <FiFilter className="text-gray-600" />
                <span className="text-sm text-gray-700">All Statuses</span>
                <FiChevronDown className="text-gray-600" />
              </button>
            </div>
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <span className="text-sm text-gray-700">All Time</span>
                <FiChevronDown className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Order List */}
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/account/orders/${order.id}`}
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
                      {order.id}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Ordered on {order.orderDate}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.itemsCount}{" "}
                    {order.itemsCount === 1 ? "item" : "items"} • Expected:{" "}
                    {order.expectedDate}
                  </p>
                </div>
              </div>

              {/* Right Side - Price and Arrow */}
              <div className="flex items-center gap-4 shrink-0">
                <span className="font-semibold text-lg text-gray-900">
                  ${order.totalPrice.toFixed(2)}
                </span>
                <FiChevronRight className="text-gray-400 text-xl" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account_Orders;
