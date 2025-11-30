import { Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "./../../components/Header";
import { FaBoxOpen } from "react-icons/fa6";
import { TbAlertTriangle } from "react-icons/tb";

const Admin_Overview = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-row max-w-screen-2xl mx-auto ">
        <Sidebar />
        <div className="mt-24 mx-12 lg:ml-96 flex flex-col z-10 w-3/4 gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Overview</h1>
            <p className="text-gray-500">Monitor your store</p>
          </div>
          <div className="border rounded-xl flex flex-col p-5 gap-5">
            <h1 className="text-xl">Quick Actions</h1>
            <Link
              to="/admin/product-add-edit"
              className="btn btn-ghost border border-gray-300 text-md justify-start"
            >
              <FaBoxOpen size={25} /> Add New Product
            </Link>
            <Link
              to="/admin/inventory"
              className="btn btn-ghost border border-gray-300 text-md justify-start"
            >
              <TbAlertTriangle size={25} /> Review Low Stock Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Overview;
