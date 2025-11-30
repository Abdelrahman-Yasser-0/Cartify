import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaPaperPlane,
  FaShieldAlt,
} from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const contactMethods = [
  {
    icon: <FaEnvelope className="text-teal-600" />,
    label: "Email",
    value: "support@cartify.eg",
  },
  {
    icon: <FaPhoneAlt className="text-teal-600" />,
    label: "Phone",
    value: "+20 (02) 1234 5678",
  },
  {
    icon: <FaMapMarkerAlt className="text-teal-600" />,
    label: "Flagship Store",
    value: "Cartify Cairo, Mall of Egypt, 6th of October City, Giza",
  },
  {
    icon: <FaClock className="text-teal-600" />,
    label: "Support Hours",
    value: "Sat–Thu · 9:00 AM – 10:00 PM (EET)",
    helper: "Fri · 12:00 PM – 6:00 PM",
  },
];

const quickLinks = [
  { label: "Track Your Order", to: "/track-order" },
  { label: "Shipping & Returns", to: "/shipping-returns" },
  { label: "FAQs", to: "/faqs" },
];

const ContactUs = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 py-12 pt-32">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="text-center space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
              Contact Us
            </p>
            <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
              Have a question? We're here to help Cairo shoppers.
            </h1>
            <p className="text-gray-500">
              Send us a message and our support team will respond as soon as possible.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
              <div className="mb-8 space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Send Us a Message</h2>
                <p className="text-sm text-gray-500">
                  Please provide as many details as possible so we can assist you quickly.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    <span className="text-gray-600">First Name</span>
                    <input
                      type="text"
                      placeholder="John"
                      className="input input-bordered w-full rounded-xl border-gray-200 bg-gray-50 focus:border-teal-500 focus:bg-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="text-gray-600">Last Name</span>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="input input-bordered w-full rounded-xl border-gray-200 bg-gray-50 focus:border-teal-500 focus:bg-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="text-gray-600">Email Address</span>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="input input-bordered w-full rounded-xl border-gray-200 bg-gray-50 focus:border-teal-500 focus:bg-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="text-gray-600">
                      Phone Number <span className="text-gray-400">(Optional)</span>
                    </span>
                    <input
                      type="tel"
                      placeholder="+20 10 1234 5678"
                      className="input input-bordered w-full rounded-xl border-gray-200 bg-gray-50 focus:border-teal-500 focus:bg-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="text-gray-600">Subject</span>
                    <select className="select select-bordered w-full rounded-xl border-gray-200 bg-gray-50 text-gray-600 focus:border-teal-500 focus:bg-white">
                      <option>Select a subject</option>
                      <option>Order Status</option>
                      <option>Returns & Refunds</option>
                      <option>Product Question</option>
                      <option>Technical Support</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="text-gray-600">
                      Order Number <span className="text-gray-400">(Optional)</span>
                    </span>
                    <input
                      type="text"
                      placeholder="ORD-2025-001234"
                      className="input input-bordered w-full rounded-xl border-gray-200 bg-gray-50 focus:border-teal-500 focus:bg-white"
                    />
                    <span className="text-xs text-gray-400">If your inquiry is related to a specific order</span>
                  </label>
                </div>
                <label className="space-y-2 text-sm">
                  <span className="text-gray-600">Message</span>
                  <textarea
                    placeholder="Please describe your inquiry in detail..."
                    className="textarea textarea-bordered min-h-[130px] w-full rounded-2xl border-gray-200 bg-gray-50 focus:border-teal-500 focus:bg-white"
                  />
                  <span className="text-xs text-gray-400">Minimum 10 characters</span>
                </label>
                <button className="btn btn-lg w-full gap-2 rounded-full bg-teal-600 text-white hover:bg-teal-500">
                  <FaPaperPlane />
                  Send Message
                </button>
                <p className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <FaShieldAlt />
                  By submitting this form, you agree to our
                  <Link to="/privacy-policy" className="font-medium text-teal-600">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-6 text-lg font-semibold text-gray-900">Contact Information</h3>
                <div className="space-y-5">
                  {contactMethods.map((method) => (
                    <div key={method.label} className="flex items-start gap-4">
                      <div className="rounded-2xl bg-teal-50 p-3">{method.icon}</div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">{method.label}</p>
                        <p className="text-gray-900">{method.value}</p>
                        {method.helper && (
                          <p className="text-xs text-gray-400">{method.helper}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-6 text-center shadow-sm">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Store Location</h3>
                <p className="mb-4 text-sm text-gray-500">
                  Visit our Mall of Egypt branch for bilingual support, device demos, and pickup orders across Cairo, Giza, and Sheikh Zayed.
                </p>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 py-12 text-gray-400">
                  Map preview
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Links</h3>
                <div className="space-y-3">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-teal-100 hover:bg-teal-50 hover:text-teal-700"
                    >
                      {link.label}
                      <FaArrowRight />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
