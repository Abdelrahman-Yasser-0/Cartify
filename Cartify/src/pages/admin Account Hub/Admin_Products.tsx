import { Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "./../../components/Header";
import { FaBoxOpen } from "react-icons/fa6";
import { FiSearch, FiFilter, FiDownload, FiMoreVertical } from "react-icons/fi";
import { useState, useEffect } from "react";
import { fetchProducts } from "../../api/productApi";
import { deleteProduct } from "../../api/adminApi";
import { products } from "../types";

const Admin_Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [products, setProducts] = useState<products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const mappedProducts = products.map((product) => ({
    id: product.id,
    name: product.title,
    image: product.imgurl,
    sku: product.sku,
    category: product.category,
    quantity: product.quantity,
    price: product.price,
    status: product.quantity !== 0
      ? product.quantity > 10
        ? "Active"
        : "Low Stock"
      : "Out of Stock",
  }));

  const handleDelete = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete products");
      return;
    }

    try {
      await deleteProduct(productId, token);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete product");
      console.error("Error deleting product:", err);
    }
  };

  const filteredProducts = mappedProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.sku?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || product.status === statusFilter;
    const matchesCategory =
      categoryFilter === "All Categories" ||
      product.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(
    new Set(mappedProducts.map((p) => p.category))
  ).sort();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-row max-w-screen-2xl mx-auto">
        <Sidebar />
        <div className="mt-24 mx-12 lg:ml-96 flex flex-col z-10 w-3/4 gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Products</h1>
            <p className="text-gray-500">Manage your product catalog</p>
          </div>

          <div className="flex justify-end">
            <Link
              to="/admin/product-add-edit"
              className="btn  text-white bg-teal-600 hover:bg-teal-700"
            >
              <FaBoxOpen size={20} /> + Add Product
            </Link>
          </div>

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
              <div className="flex gap-2">
                <select
                  className="select select-bordered"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Out of Stock</option>
                  <option>Low Stock</option>
                </select>
                <select
                  className="select select-bordered"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option>All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="border rounded-xl overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <span className="loading loading-spinner loading-lg"></span>
                <p className="mt-4 text-gray-500">Loading products...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-red-600">Error: {error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-primary mt-4"
                >
                  Retry
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No products found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th>Product</th>
                      <th>SKU</th>
                      <th>Category</th>
                      <th>Stock</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
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
                          product.quantity < 10 ? "text-red-600 font-semibold" : ""
                        }
                      >
                        {product.quantity}
                      </td>
                      <td>EGP {product.price.toFixed(2)}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            product.status
                          )}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td>
                        <div className="dropdown dropdown-end">
                          <label
                            tabIndex={0}
                            className="btn btn-ghost btn-sm btn-circle"
                          >
                            <FiMoreVertical size={18} />
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow border border-gray-200"
                          >
                            <li>
                              <Link
                                to={`/admin/product-add-edit/${product.id}`}
                              >
                                Edit
                              </Link>
                            </li>
                            <li>
                              <a
                                className="text-red-600"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDelete(product.id);
                                }}
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Products;
