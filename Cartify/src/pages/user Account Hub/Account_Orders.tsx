import { Link, useNavigate } from "react-router-dom";
import { BsFillBoxFill } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";
import { useState, useEffect } from "react";

type Product = {
  _id: string;
  title: string;
  brand: string;
  price: number;
  imgurl: string;
  description: string;
  category: string;
};

type Purchase = {
  _id: string;
  productId: Product;
  quantity: number;
  status: string;
  date: string;
};

const Account_Orders = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/auth/login");
        return;
      }

      try {
        const response = await fetch(
          "https://cartifybackend.vercel.app/purchased",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.status == 200) {
          const purchasesData = data.userpurchased;
          console.log(purchasesData);

          setPurchases(purchasesData || []);
        } else {
          console.log("Failed to fetch purchases");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-screen-2xl px-5 py-8">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="font-semibold text-2xl">Order History</h1>
          <p className="text-sm text-gray-500">
            View and track all your orders
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading orders...</p>
            </div>
          ) : purchases.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            purchases.map((purchase) => (
              <Link
                key={purchase._id}
                to={`/account/orders/${purchase._id}`}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-4 flex-1">
                  {purchase.productId?.imgurl ? (
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100 relative">
                      <img
                        src={purchase.productId.imgurl}
                        alt={purchase.productId.title || "Product"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget
                            .nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                      <div className="hidden w-full h-full absolute inset-0 bg-cyan-50 border-2 border-cyan-200 rounded-lg items-center justify-center">
                        <BsFillBoxFill className="text-cyan-600 text-xl" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-cyan-50 border-2 border-cyan-200 rounded-lg flex items-center justify-center shrink-0">
                      <BsFillBoxFill className="text-cyan-600 text-xl" />
                    </div>
                  )}
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-base text-gray-900">
                        {purchase.productId?.title ||
                          `Order #${purchase._id.slice(-8)}`}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          purchase.status
                        )}`}
                      >
                        {purchase.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Ordered on {formatDate(purchase.date)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {purchase.quantity}{" "}
                      {purchase.quantity === 1 ? "item" : "items"} • $
                      {(
                        (purchase.productId?.price || 0) * purchase.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-semibold text-lg text-gray-900">
                    $
                    {(
                      (purchase.productId?.price || 0) * purchase.quantity
                    ).toFixed(2)}
                  </span>
                  <FiChevronRight className="text-gray-400 text-xl" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Account_Orders;
