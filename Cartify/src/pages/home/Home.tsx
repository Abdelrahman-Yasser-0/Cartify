import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DiscoverBanner from "../../components/DiscoverBanner/DiscoverBanner";
import Header from "../../components/Header";
import Card from "./../../components/Card";
import Footer from "./../../components/Footer";
import { fetchProducts } from "../../api/productApi";
import { products } from "../types";
import ShopByCategory from "./ShopByCategory";
import Spacer from "./Spacer";

const Home = () => {
  const [productsList, setProductsList] = useState<products[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProductsList(data))
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Failed to load products.";
        setError(message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const featured = useMemo(() => {
    const flagged = productsList.filter((product) => product.isFeatured);
    if (flagged.length) return flagged;
    return productsList.slice(0, 4);
  }, [productsList]);

  const bestSellers = useMemo(() => {
    const flagged = productsList.filter((product) => product.isBestSeller);
    if (flagged.length) return flagged;
    return productsList.slice(0, 4);
  }, [productsList]);

  const newArrivals = useMemo(() => {
    const flagged = productsList.filter((product) => product.isNew);
    if (flagged.length) return flagged;
    return productsList.slice(0, 4);
  }, [productsList]);

  return (
    <div>
      <Header />
      <DiscoverBanner />
      <ShopByCategory />
      <div className="flex justify-center">
        <div className="p-12 max-w-screen-2xl">
          <div className="flex-col gap-8 flex ">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Featured Products</h1>
                <h2 className="text-gray-400">
                  Hand-picked products just for you
                </h2>
              </div>
              <Link to="/product_listing" className="btn btn-sm">
                View All →
              </Link>
            </div>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg text-teal-600"></span>
              </div>
            ) : error ? (
              <div className="alert alert-error bg-rose-50 text-rose-700 border border-rose-200">
                <span>{error}</span>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-4 h-">
                {featured.map((product) => (
                  <Card key={product.id || product.title} product={product} />
                ))}
              </div>
            )}
          </div>
          <Spacer />
          <div className="flex-col gap-8 flex ">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Featured Products</h1>
                <h2 className="text-gray-400">
                  Hand-picked products just for you
                </h2>
              </div>
              <Link to="/product_listing" className="btn btn-sm">
                View All →
              </Link>
            </div>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg text-teal-600"></span>
              </div>
            ) : error ? (
              <div className="alert alert-error bg-rose-50 text-rose-700 border border-rose-200">
                <span>{error}</span>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-4 h-">
                {bestSellers.map((product) => (
                  <Card key={product.id || product.title} product={product} />
                ))}
              </div>
            )}
          </div>
          <div className="flex-col gap-8 flex ">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Featured Products</h1>
                <h2 className="text-gray-400">
                  Hand-picked products just for you
                </h2>
              </div>
              <Link to="/product_listing" className="btn btn-sm">
                View All →
              </Link>
            </div>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg text-teal-600"></span>
              </div>
            ) : error ? (
              <div className="alert alert-error bg-rose-50 text-rose-700 border border-rose-200">
                <span>{error}</span>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-4 h-">
                {newArrivals.map((product) => (
                  <Card key={product.id || product.title} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
