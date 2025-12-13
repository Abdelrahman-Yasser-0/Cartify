import { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "./../../components/Header";
import { getProductStats } from "../../api/adminApi";
import { FaBox, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Admin_Inventory = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    totalProducts: number;
    inStock: number;
    outOfStock: number;
  } | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("You must be logged in to view inventory stats");
        }
        const data = await getProductStats(token);
        setStats({
          totalProducts: data.totalProducts[0]?.count || 0,
          inStock: data.stockStats[0]?.inStockProducts || 0,
          outOfStock: data.stockStats[0]?.outOfStockProducts || 0,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load inventory stats");
        console.error("Error loading stats:", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-row max-w-screen-2xl mx-auto">
        <Sidebar />
        <div className="mt-24 mx-12 lg:ml-96 flex flex-col z-10 w-3/4 gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Inventory</h1>
            <p className="text-gray-500">View your inventory statistics and stock levels</p>
          </div>

          {loading ? (
            <div className="border rounded-xl p-8 text-center bg-white">
              <span className="loading loading-spinner loading-lg"></span>
              <p className="mt-4 text-gray-500">Loading inventory stats...</p>
            </div>
          ) : error ? (
            <div className="border rounded-xl p-8 text-center bg-white">
              <p className="text-red-600">Error: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary mt-4"
              >
                Retry
              </button>
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="border rounded-xl p-6 bg-white">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FaBox className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Products</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                      {stats.totalProducts}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">Items on website</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-xl p-6 bg-white">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FaCheckCircle className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">In Stock</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                      {stats.outOfStock}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">Available products</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-xl p-6 bg-white">
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <FaTimesCircle className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Out of Stock</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                      {stats.inStock}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">Unavailable products</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Admin_Inventory;
