import { FormEvent, useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const navCategories = [
  "Electronics",
  "Audio",
  "Wearables",
  "Computers",
  "Gaming",
  "Photography",
];

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("q") ?? "");
  }, [location.search]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchTerm.trim();
    const destination = trimmed
      ? `/product_listing?q=${encodeURIComponent(trimmed)}`
      : "/product_listing";
    navigate(destination);
  };

  const currentuser = localStorage.getItem("user");
  return (
    <div className="navbar border border-gray-300 bg-base-100 bg-opacity-85 backdrop-blur-sm fixed z-50">
      <div className="mx-auto max-w-screen-2xl w-full px-12">
        <div className="navbar-start flex-1 w-full">
          <Link to="/" className="flex items-center gap-3 select-none">
            <FiShoppingCart className="text-3xl sm:text-4xl bg-teal-600 rounded-md p-2 text-white" />
            <span className="ml-2 text-xl font-semibold">Cartify</span>
          </Link>
        </div>
        <div className="navbar-center flex">
          <div className="hidden lg:flex w-96">
            <ul className="text-lg menu menu-horizontal px-1 w-full">
              <li>
                <Link to="/" className="hover:text-teal-600 rounded">
                  Home
                </Link>
              </li>
              <li>
                <details>
                  <summary className="hover:text-teal-600 rounded">
                    Categories
                  </summary>
                  <ul className="text-sm p-1 text-left border border-gray-300 rounded-md shadow-md bg-white w-52">
                    {navCategories.map((category) => (
                      <li key={category}>
                        <Link
                          className="rounded"
                          to={`/product_listing?category=${encodeURIComponent(
                            category
                          )}`}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
              <li>
                <Link
                  to="/product_listing"
                  className="hover:text-teal-600 rounded"
                >
                  Shop
                </Link>
              </li>
              <li>
                <a className="hover:text-teal-600 rounded">Deals</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center flex">
          <div className="flex items-center">
            <form
              onSubmit={handleSearchSubmit}
              className="form-control flex-row h-12 items-center gap-2 rounded-md bg-gray-200 px-2 w-96 hidden md:flex"
            >
              <FiSearch className="text-xl" />
              <input
                type="text"
                placeholder="Search products..."
                className="input w-96 md:w-auto bg-gray-200 border-none focus:outline-none"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="navbar-end flex gap-1 text-xl w-44  justify-end">
          <a className=" text-xl hover:bg-gray-200 duration-100 rounded-md p-3">
            <FiHeart className="hidden p-0 lg:block" />
          </a>
          <Link
            to="/cart"
            className="relative text-xl hover:bg-gray-200 duration-100 rounded-md p-3"
          >
            <FiShoppingCart />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] font-semibold bg-teal-600 text-white rounded-full px-1.5 ">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            to={`${currentuser ? "/account/overview" : "/auth/login"}`}
            className="text-xl hover:bg-gray-200 duration-100 rounded-md p-3"
          >
            <FiUser />
          </Link>
        </div>

        <div className="drawer drawer-end justify-end w-7">
          <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer-5" className="drawer- lg:hidden">
              <FiMenu className="" />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-5"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4 text-black">
              {/* Sidebar content here */}
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/product_listing">Shop</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <div className="w-full h-px bg-gray-300"></div>

              <a className="p-3 text-gray-500">Account</a>

              <li>
                <a>My Profile</a>
              </li>
              <li>
                <a>My Orders</a>
              </li>
              <div className="w-full h-px bg-gray-300"></div>

              <a className="p-3 text-gray-500">Help Center</a>

              <li>
                <Link to="/track-order">Track Order</Link>
              </li>
              <li>
                <Link to="/faqs">FAQs</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link to="/shipping-returns">Shipping & Returns</Link>
              </li>
              <div className="w-full h-px bg-gray-300"></div>

              <a className="p-3 text-gray-500">Categories</a>

              {navCategories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/product_listing?category=${encodeURIComponent(
                      category
                    )}`}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* paste before this */}
      </div>
    </div>
  );
};

export default Header;
