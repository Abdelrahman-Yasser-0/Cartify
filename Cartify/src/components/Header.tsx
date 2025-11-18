import { FiUser } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  return (
    <div className="navbar border border-gray-300 bg-base-100 bg-opacity-85 backdrop-blur-sm fixed z-50">
      <div className="mx-auto max-w-screen-2xl w-full px-12">
        <div className="navbar-start flex-1 w-full">
          <div className="flex items-center gap-3 select-none">
            <FiShoppingCart className="text-3xl sm:text-4xl bg-teal-600 rounded-md p-2 text-white" />
            <a className="ml-2 text-xl font-semibold">Cartify</a>
          </div>
        </div>
        <div className="navbar-center flex">
          <div className="hidden lg:flex w-96">
            <ul className="text-lg menu menu-horizontal px-1 w-full">
              <li>
                <a className="hover:text-teal-600 rounded">Home</a>
              </li>
              <li>
                <details>
                  <summary className="hover:text-teal-600 rounded">
                    Categories
                  </summary>
                  <ul className="text-sm p-1 text-left border border-gray-300 rounded-md shadow-md bg-white w-52">
                    <li>
                      <a className="rounded">Electronics</a>
                    </li>
                    <li>
                      <a className="rounded">Audio</a>
                    </li>
                    <li>
                      <a className="rounded">Wearables</a>
                    </li>
                    <li>
                      <a className="rounded">Computers</a>
                    </li>
                    <li>
                      <a className="rounded">Gaming</a>
                    </li>
                    <li>
                      <a className="rounded">Photography</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a className="hover:text-teal-600 rounded">Shop</a>
              </li>
              <li>
                <a className="hover:text-teal-600 rounded">Deals</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center flex">
          <div className="flex items-center">
            <div className="form-control flex-row h-12 items-center gap-2 rounded-md bg-gray-200 px-2 w-96 hidden md:flex">
              <FiSearch className="text-xl" />
              <input
                type="text"
                placeholder="Search products..."
                className="input w-96 md:w-auto bg-gray-200 border-none focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="navbar-end flex gap-1 text-xl w-44  justify-end">
          <a className=" text-xl hover:bg-gray-200 duration-100 rounded-md p-3">
            <FiHeart className="hidden p-0 lg:block" />
          </a>
          <a className=" text-xl hover:bg-gray-200 duration-100 rounded-md p-3">
            <FiShoppingCart />
          </a>
          <a className="text-xl hover:bg-gray-200 duration-100 rounded-md p-3">
            <FiUser />
          </a>
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
                <a>Home</a>
              </li>
              <li>
                <a>Shop</a>
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
                <a>Track Order</a>
              </li>
              <li>
                <a>FAQs</a>
              </li>
              <li>
                <a>Contact Us</a>
              </li>
              <li>
                <a>Shipping & Returns</a>
              </li>
              <div className="w-full h-px bg-gray-300"></div>

              <a className="p-3 text-gray-500">Categories</a>

              <li>
                <a>Electronics</a>
              </li>
              <li>
                <a>Audio</a>
              </li>
              <li>
                <a>Wearables</a>
              </li>
              <li>
                <a>Computers</a>
              </li>
              <li>
                <a>Gaming</a>
              </li>
              <li>
                <a>Photography</a>
              </li>
            </ul>
          </div>
        </div>
        {/* paste before this */}
      </div>
    </div>
  );
};

export default Header;
