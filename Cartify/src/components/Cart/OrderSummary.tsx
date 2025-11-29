import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

type Props = {
  subtotal: number;
  shipping: number;
  tax: number;
  grandTotal: number;
  clearCart: () => void;
  items: any[];
};

const OrderSummary = (props: Props) => {
  const location = useLocation();
  const { subtotal, shipping, tax, grandTotal, clearCart, items } = props;
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Estimated Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="w-full h-px bg-gray-200" />
      <div className="flex justify-between text-lg font-semibold text-gray-900">
        <span>Total</span>
        <span>${grandTotal.toFixed(2)}</span>
      </div>
      {location.pathname !== "/checkout" && (
        <div>
          <Link
            to="/checkout"
            className="btn btn-accent bg-teal-600 border-none mt-2 text-white"
          >
            Proceed to Checkout
          </Link>
          <button
            className="btn btn-ghost"
            onClick={clearCart}
            disabled={items.length === 0}
          >
            Clear Cart
          </button>
          <Link
            to="/product_listing"
            className="text-sm text-teal-600 font-medium text-center mt-2"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
