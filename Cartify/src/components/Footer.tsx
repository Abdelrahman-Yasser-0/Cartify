import { FaInstagram, FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", to: "/product_listing" },
      { label: "Best Sellers", to: "/product_listing" },
      { label: "Sale", to: "/product_listing" },
      { label: "All Products", to: "/product_listing" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", to: "/contact-us" },
      { label: "FAQs", to: "/faqs" },
      { label: "Shipping & Returns", to: "/shipping-returns" },
      { label: "Track Order", to: "/track-order" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Legal Hub", to: "/legal-hub" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Service", to: "/terms-of-service" },
      { label: "Cookie Policy", to: "/cookie-policy" },
      { label: "Accessibility", to: "/accessibility" },
    ],
  },
];

const socialLinks = [
  {
    icon: <FaFacebook className="text-xl text-[#1877F2]" />,
    href: "https://facebook.com",
  },
  {
    icon: <FaInstagram className="text-xl text-[#E4405F]" />,
    href: "https://instagram.com",
  },
  {
    icon: <FaTwitter className="text-xl text-[#1DA1F2]" />,
    href: "https://twitter.com",
  },
  {
    icon: <FaYoutube className="text-xl text-[#FF0000]" />,
    href: "https://youtube.com",
  },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="flex w-full  flex-col gap-10 px-6 py-12 lg:px-12 justify-center">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <h6 className="text-lg font-semibold text-slate-900">Cartify</h6>
            <p className="text-sm text-gray-500">
              Your one-stop shop for premium electronics, gadgets, and tech
              accessories. Quality products, fast shipping, excellent service.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-gray-200 p-2 transition hover:border-teal-200 hover:bg-teal-50"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} className="space-y-3">
              <h6 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                {column.title}
              </h6>
              <ul className="space-y-2 text-sm text-gray-500">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="transition hover:text-teal-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-gray-200" />

        <div className="flex flex-col gap-4 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Cartify. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy-policy" className="hover:text-teal-600">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="hover:text-teal-600">
              Terms
            </Link>
            <Link to="/cookie-policy" className="hover:text-teal-600">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
