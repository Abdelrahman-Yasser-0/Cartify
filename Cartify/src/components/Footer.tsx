import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="flex flex-col p-10 gap-5 ">
        <div className="footer text-base-content ">
          <div className="grid grid-flow-row gap-4">
            <nav>
              <h6 className="footer-title font-bold !text-neutral-700 opacity-100">
                Cartify
              </h6>

              <p className="text-gray-500">
                Your one-stop shop for premium electronics, gadgets, and tech
                accessories. Quality products, fast shipping, excellent service.
              </p>
            </nav>

            <div className="flex gap-10">
              <a>
                <FaFacebook className="text-[#1877F2] text-xl" />
              </a>
              <a>
                <FaInstagram className="text-[#E4405F] text-xl" />
              </a>
              <a>
                <FaTwitter className="text-[#1DA1F2] text-xl" />
              </a>
              <a>
                <FaYoutube className="text-[#FF0000] text-xl" />
              </a>
            </div>
          </div>
          <nav>
            <h6 className="footer-title font-bold !text-neutral-700 opacity-100">
              Shop
            </h6>
            <a className="link link-hover text-gray-500	">New Arrivals</a>
            <a className="link link-hover text-gray-500	">Best Sellers</a>
            <a className="link link-hover text-gray-500	">Sale</a>
            <a className="link link-hover text-gray-500	">All Products</a>
          </nav>
          <nav>
            <h6 className="footer-title font-bold !text-neutral-700 opacity-100">
              Support
            </h6>
            <Link to="/contact-us" className="link link-hover text-gray-500">
              Contact us
            </Link>
            <a className="link link-hover text-gray-500">FAQs</a>
            <a className="link link-hover text-gray-500">Shipping & Returns</a>
            <a className="link link-hover text-gray-500">Track Order</a>
          </nav>
          <nav>
            <h6 className="footer-title font-bold !text-neutral-700 opacity-100">
              Legal
            </h6>
            <a className="link link-hover text-gray-500">Legal Hub</a>
            <a className="link link-hover text-gray-500">Privacy and Policy</a>
            <a className="link link-hover text-gray-500">Terms of Service</a>
            <a className="link link-hover text-gray-500">Cookie Policy </a>
            <a className="link link-hover text-gray-500">Accessibility </a>
          </nav>
        </div>
        <div className="w-full h-[0.2px] bg-gray-300 mb-10"></div>
        <div className="flex justify-center w-full">
          <p className="text-gray-500 text-xs">
            © 2025 Cartify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
