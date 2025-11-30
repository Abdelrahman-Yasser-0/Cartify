import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const shippingMethods = [
  {
    name: "Same-Day Courier (Greater Cairo)",
    description: "Orders placed before 2 PM, delivered by 10 PM",
    price: "120 EGP",
  },
  {
    name: "Next-Day Nationwide",
    description: "Alexandria, Giza, Delta and Canal cities",
    price: "90 EGP",
  },
  {
    name: "Standard Egypt Post",
    description: "Upper Egypt & Red Sea · 2-4 business days",
    price: "60 EGP",
  },
];

const returnSteps = [
  {
    title: "Initiate Return",
    description:
      "Sign into your account and navigate to your order history. Select the order and click 'Start Return'.",
  },
  {
    title: "Print Label",
    description:
      "We'll generate a prepaid shipping label. Print it and attach it securely to your package.",
  },
  {
    title: "Drop Off",
    description:
      "Drop your package at any authorized shipping location within 14 days of approval.",
  },
  {
    title: "Receive Refund",
    description:
      "Once we receive and inspect your items, refunds are processed within 5-7 business days.",
  },
];

const eligibility = {
  eligible: [
    "Unopened and unused products in original packaging",
    "Items with tags attached",
    "Incorrect or damaged items",
  ],
  notEligible: [
    "Items marked 'Final Sale'",
    "Gift cards",
    "Products damaged after receipt",
  ],
};

const refundTimelines = [
  { method: "Credit/Debit Cards (EGP)", timeline: "3-5 banking days" },
  { method: "Meeza / Mobile Wallets", timeline: "1-2 business days" },
  { method: "Cash on Delivery refunds", timeline: "Collected in-store within 48 hrs" },
  { method: "Store Credit", timeline: "Instant once approved" },
];

const ShippingReturns = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 py-12 pt-32">
        <div className="mx-auto max-w-5xl space-y-10">
        <div className="text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
            Shipping & Returns
          </p>
          <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            Everything you need to know
          </h1>
          <p className="text-gray-500">
            Review shipping options, processing times, return eligibility, and refund timelines.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/track-order"
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
              Track your order
            </p>
            <h3 className="mt-3 text-xl font-semibold text-gray-900">
              Check your latest delivery info
            </h3>
            <p className="text-sm text-gray-500">
              Enter your order number and email to see real-time carrier updates.
            </p>
          </Link>
          <Link
            to="/contact-us"
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
              Need help?
            </p>
            <h3 className="mt-3 text-xl font-semibold text-gray-900">
              Contact our support team
            </h3>
            <p className="text-sm text-gray-500">
              We're happy to assist with shipping questions, returns, or replacements.
            </p>
          </Link>
        </div>

        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold text-gray-900">Shipping information</h2>
          <p className="mt-2 text-sm text-gray-500">
            Orders are typically processed within 1-2 business days. You will receive a shipping confirmation email with tracking information once your order ships.
          </p>
          <div className="mt-6 divide-y divide-gray-100 rounded-2xl border border-gray-100">
            {shippingMethods.map((method) => (
              <div key={method.name} className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
                <div>
                  <p className="font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
                <p className="text-base font-semibold text-gray-900">{method.price}</p>
              </div>
            ))}
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 text-teal-700">
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-sm text-gray-500">Orders over 2,500 EGP (Greater Cairo)</p>
              </div>
              <p className="text-base font-semibold">Free</p>
            </div>
          </div>
          <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Note: Orders placed after 6:00 PM or during Friday/public holidays are dispatched the next working day.
          </p>
        </section>

        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold text-gray-900">Returns & refunds</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-dashed border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Return window</h3>
              <p className="mt-2 text-sm text-gray-500">
                We offer a 30-day return window from the date of delivery. Items must be unused, in original packaging, and include accessories.
              </p>
              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <p>✔️ All returns are subject to inspection</p>
                <p>✔️ Original packaging and accessories must be included</p>
                <p>✔️ Products must show no signs of use or damage</p>
              </div>
            </div>
            <div className="rounded-2xl border border-dashed border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Eligibility</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-teal-600">Eligible</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-gray-500">
                    {eligibility.eligible.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-rose-600">Not eligible</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-gray-500">
                    {eligibility.notEligible.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {returnSteps.map((step) => (
              <div key={step.title} className="rounded-2xl border border-gray-100 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">
                  {step.title}
                </p>
                <p className="mt-2 text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold text-gray-900">Refund timelines</h2>
          <p className="mt-2 text-sm text-gray-500">
            Refunds are credited back to your original payment method. Depending on your bank or card issuer, it may take an additional 2 business days for the refund to appear on your statement.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3">Payment method</th>
                  <th className="px-6 py-3">Expected timeline</th>
                </tr>
              </thead>
              <tbody>
                {refundTimelines.map((row) => (
                  <tr key={row.method} className="border-t border-gray-100">
                    <td className="px-6 py-4 font-medium text-gray-900">{row.method}</td>
                    <td className="px-6 py-4 text-gray-500">{row.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Note: Depending on your bank or card issuer, it may take an additional 2 business days for the refund to appear on your statement.
          </p>
        </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShippingReturns;
