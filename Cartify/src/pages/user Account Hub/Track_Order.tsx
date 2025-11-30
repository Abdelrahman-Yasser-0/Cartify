import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaEnvelopeOpenText, FaInfoCircle } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Track_Order = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!orderNumber.trim() || !email.trim()) {
      setStatusMessage("Please enter both your order number and email.");
      return;
    }
    setStatusMessage(
      "Thanks! We'll send the latest tracking updates to your inbox shortly.",
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 py-12 pt-32">
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="text-center space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
              Track Order
            </p>
            <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
              See your delivery status in real time
            </h1>
            <p className="text-gray-500">
              Enter the order number from your confirmation email along with the
              email address used at checkout.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="text-gray-600">Order Number</span>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(event) => setOrderNumber(event.target.value)}
                  placeholder="e.g., ORD-2025-001234"
                  className="input input-bordered w-full rounded-2xl border-gray-200 bg-gray-50 focus:border-teal-500 focus:bg-white"
                />
                <span className="text-xs text-gray-400">
                  Found in your order confirmation email
                </span>
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-gray-600">Email Address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="your@email.com"
                  className="input input-bordered w-full rounded-2xl border-gray-200 bg-gray-50 focus:border-teal-500 focus:bg-white"
                />
                <span className="text-xs text-gray-400">Used when placing the order</span>
              </label>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="btn flex-1 rounded-full bg-teal-600 text-white hover:bg-teal-500">
                Track Order
              </button>
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <FaInfoCircle className="text-teal-500" />
                Secure and private
              </p>
            </div>
            {statusMessage && (
              <div className="mt-6 rounded-2xl border border-teal-100 bg-teal-50 p-4 text-sm text-teal-700">
                {statusMessage}
              </div>
            )}
          </form>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-teal-600">
                  <FaBoxOpen />
                  <p className="text-sm font-semibold uppercase tracking-wider">
                    Track your package
                  </p>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Get real-time tracking updates
                </h3>
                <p className="text-sm text-gray-500">
                  Once you submit your order number, we'll surface the most recent carrier scan events and estimated delivery date.
                </p>
              </div>
              <div className="space-y-4 rounded-2xl border border-dashed border-gray-200 p-5">
                <div className="flex items-start gap-3">
                  <FaEnvelopeOpenText className="mt-1 text-teal-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Tips</p>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-gray-500">
                      <li>Check for typos in your order number.</li>
                      <li>Use the same email you used at checkout.</li>
                      <li>Allow carriers 24 hours to provide the first scan.</li>
                    </ul>
                  </div>
                </div>
                <Link
                  to="/shipping-returns"
                  className="btn btn-sm w-full rounded-full border border-teal-100 bg-teal-50 text-teal-700 hover:bg-teal-100"
                >
                  View shipping & returns policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Track_Order;
