import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { BsFillBoxFill } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { orderDetails, orders } from "../productsData";

const Account_Order_Detail = () => {
  const { id } = useParams<{ id: string }>();

  // Find the order from the orders array
  const order = orders.find((o) => o.id === id);

  // If order not found, use orderDetails as fallback (for ORD-2024-1156)
  // Otherwise, merge order data with orderDetails template
  const currentOrderDetails = order
    ? {
        ...orderDetails,
        id: order.id,
        status: order.status,
        placedAt: order.orderDate,
        expectedAt: order.expectedDate,
        summary: {
          ...orderDetails.summary,
          total: order.totalPrice,
        },
      }
    : orderDetails;
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

  // Generate delivery timeline based on order status
  const getDeliveryTimeline = () => {
    const timeline = [
      {
        status: "Processing",
        date: currentOrderDetails.placedAt,
        icon: BsFillBoxFill,
        completed: true,
      },
      {
        status: "Shipped",
        date: currentOrderDetails.placedAt, // Same day as order placed
        icon: FaTruck,
        completed: true,
      },
      {
        status: "Out for Delivery",
        date: currentOrderDetails.expectedAt,
        icon: FaHome,
        completed: currentOrderDetails.status === "Delivered",
      },
      {
        status: "Delivered",
        date:
          currentOrderDetails.status === "Delivered"
            ? currentOrderDetails.expectedAt
            : null,
        time: currentOrderDetails.status === "Delivered" ? "2:45 PM" : null,
        icon: FaCheckCircle,
        completed: currentOrderDetails.status === "Delivered",
      },
    ];
    return timeline;
  };

  const timeline = getDeliveryTimeline();

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
                Order {currentOrderDetails.id}
              </h2>
              <p className="text-sm text-gray-600">
                Placed on {currentOrderDetails.placedAt}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(
                currentOrderDetails.status
              )}`}
            >
              {currentOrderDetails.status}
            </span>
          </div>
        </div>

        {/* Delivery Status Timeline Card */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="font-semibold text-lg text-gray-900">
              Delivery Status
            </h2>
            <p className="text-sm text-gray-600">Track your order progress</p>
          </div>

          {/* Timeline */}
          <div className="relative pl-8">
            {/* Vertical Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-cyan-500"></div>

            {/* Timeline Items */}
            <div className="flex flex-col gap-8">
              {timeline.map((item, index) => {
                const IconComponent = item.icon;
                const isLast = index === timeline.length - 1;
                const isCompleted = item.completed;

                return (
                  <div
                    key={item.status}
                    className="relative flex items-start gap-4"
                  >
                    {/* Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        isCompleted
                          ? item.status === "Delivered"
                            ? "bg-green-500 text-white"
                            : "bg-cyan-100 border-2 border-cyan-500 text-cyan-600"
                          : "bg-gray-100 border-2 border-gray-300 text-gray-400"
                      }`}
                    >
                      <IconComponent className="text-sm" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium text-gray-900">
                          {item.status}
                        </h3>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        {item.date && (
                          <p className="text-sm text-gray-600">{item.date}</p>
                        )}
                        {item.status === "Delivered" && item.time && (
                          <p className="text-sm text-gray-600">
                            Delivered at {item.date} at {item.time}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Items and Price Summary Card */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="font-semibold text-lg text-gray-900 mb-6">
            Order Items
          </h2>

          {/* Items List */}
          <div className="flex flex-col gap-4 mb-6">
            {currentOrderDetails.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0"
              >
                {/* Product Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>

                {/* Price */}
                <div className="shrink-0">
                  <p className="font-semibold text-gray-900">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">
                ${currentOrderDetails.summary.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">
                ${currentOrderDetails.summary.shipping.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-900">
                ${currentOrderDetails.summary.tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-semibold text-gray-900">
                ${currentOrderDetails.summary.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Address Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="font-semibold text-lg text-gray-900 mb-4">
            Shipping Address
          </h2>
          <div className="flex flex-col gap-1 text-gray-700">
            <p className="font-medium">
              {currentOrderDetails.shippingAddress.name}
            </p>
            <p>{currentOrderDetails.shippingAddress.street}</p>
            <p>
              {currentOrderDetails.shippingAddress.city},{" "}
              {currentOrderDetails.shippingAddress.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account_Order_Detail;
