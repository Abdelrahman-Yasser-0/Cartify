import { useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "./../../components/Header";
import { FiSearch } from "react-icons/fi";
import { productsData } from "../productsData";

const Admin_Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Map products data
  const products = productsData.map((product) => ({
    id: product.id,
    name: product.title,
    image: product.imgurl,
    sku: product.sku,
    category: product.category,
    stock: product.stock,
  }));

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.sku?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (stock < 10) return { text: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    if (stock < 20) return { text: "Medium Stock", color: "bg-blue-100 text-blue-800" };
    return { text: "In Stock", color: "bg-green-100 text-green-800" };
  };

  return (
    <div>
      <Header />
      <div className="flex flex-row max-w-screen-2xl mx-auto">
        <Sidebar />
        <div className="mt-24 mx-12 lg:ml-96 flex flex-col z-10 w-3/4 gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Inventory</h1>
            <p className="text-gray-500">Manage your product inventory and stock levels</p>
          </div>

          {/* Search */}
          <div className="border rounded-xl flex flex-col p-5 gap-5">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="input input-bordered w-full pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock);
                    return (
                      <tr key={product.id} className="hover">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="w-12 h-12 rounded-lg">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="object-cover"
                                />
                              </div>
                            </div>
                            <div className="font-medium">{product.name}</div>
                          </div>
                        </td>
                        <td className="text-gray-600">{product.sku}</td>
                        <td>{product.category}</td>
                        <td
                          className={
                            product.stock < 10
                              ? "text-red-600 font-semibold"
                              : product.stock < 20
                              ? "text-yellow-600 font-semibold"
                              : "text-green-600 font-semibold"
                          }
                        >
                          {product.stock}
                        </td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}
                          >
                            {stockStatus.text}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Inventory;
