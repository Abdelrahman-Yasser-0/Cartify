import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeItem, subtotal, totalItems, clearCart } =
    useCart();
  const shipping = subtotal > 0 ? 15 : 0;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-16 px-4 sm:px-8">
        <div className="max-w-screen-2xl mx-auto flex flex-col gap-8">
          <div>
            <p className="text-sm text-gray-500">Home / Cart</p>
            <h1 className="text-3xl font-semibold text-gray-900 mt-2">
              Shopping Cart
            </h1>
            <p className="text-gray-500 text-sm">
              {totalItems} item{totalItems === 1 ? "" : "s"} in your cart
            </p>
          </div>

          {items.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
              <p className="text-xl font-semibold text-gray-800">
                Your cart is empty
              </p>
              <p className="text-gray-500 mt-2">
                Browse the catalog and add products to your cart.
              </p>
              <Link
                to="/product_listing"
                className="btn btn-accent bg-teal-600 border-none mt-6 text-white"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-6">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex flex-col gap-4 border-b border-gray-100 pb-6 last:border-b-0 last:pb-0 md:flex-row md:items-center"
                  >
                    <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-gray-100">
                      <img
                        src={item.product.imgurl}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <div>
                          <p className="text-sm text-gray-500">
                            {item.product.brand}
                          </p>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.product.title}
                          </h3>
                        </div>
                        <button
                          className="text-sm text-gray-400 hover:text-red-500"
                          onClick={() => removeItem(item.productId)}
                        >
                          Remove
                        </button>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                        <span className="text-sm text-gray-500 ml-2">
                          ${item.product.price.toFixed(2)} each
                        </span>
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-200 rounded-xl">
                          <button
                            className="px-4 py-2 text-lg"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span className="px-4 py-2 text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            className="px-4 py-2 text-lg"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm text-gray-500">
                          SKU: {item.product.sku || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Order Summary
                </h2>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
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
                <button className="btn btn-accent bg-teal-600 border-none mt-2 text-white">
                  Proceed to Checkout
                </button>
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
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
