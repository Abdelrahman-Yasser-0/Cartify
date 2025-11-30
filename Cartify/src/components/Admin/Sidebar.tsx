import React from "react";
import { Link } from "react-router-dom";
import { CiGrid42 } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { LuWarehouse } from "react-icons/lu";
import { GoGear } from "react-icons/go";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="drawer lg:drawer-open fixed z-0">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side mt-16">
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 border border-r-gray-300 ">
          {/* Sidebar content here */}
          <li>
            <Link
              to="/admin/overview"
              className="text-xl flex items-center gap-2"
            >
              <CiGrid42 size={30} />
              Overview
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="text-xl flex items-center gap-2"
            >
              <BsCart2 size={30} />
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/inventory"
              className="text-xl flex items-center gap-2"
            >
              <LuWarehouse size={30} />
              Inventory
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className="text-xl flex items-center gap-2"
            >
              <GoGear size={30} />
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
