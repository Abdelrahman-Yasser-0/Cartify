import DiscoverBanner from "../../components/DiscoverBanner/DiscoverBanner";
import { useState } from "react";
import Header from "../../components/Header";
import Card from "./../../components/Card";
import Footer from "./../../components/Footer";
import { products } from "../types";
import ShopByCategory from "./ShopByCategory";

const Home = () => {
  const [products, setProducts] = useState<products[]>([
    {
      title: "Premium Wireless Headphones",
      brand: "Soundmax",
      rate: "4.8 (1247)",
      price: 299.99,
      imgurl:
        "https://images.unsplash.com/photo-1757946718516-fddeb8d3ed9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      title: "Smart Fitness Watch Ultra",
      brand: "FitTrack",
      rate: "4.9 (2134)",
      price: 399.99,
      imgurl:
        "https://images.unsplash.com/photo-1713989635340-b25bfc893f74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      title: "Ultra Slim Laptop Pro 15",
      brand: "TechBook",
      rate: "4.7 (516)",
      price: 1299.99,
      imgurl:
        "https://images.unsplash.com/flagged/photo-1576697010739-6373b63f3204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      title: "5G Smartphone Pro Max",
      brand: "TechPhone",
      rate: "4.8 (1856)",
      price: 999.99,
      imgurl:
        "https://images.unsplash.com/photo-1675953935267-e039f13ddd79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
  ]);
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
              <a role="button" className="btn btn-sm">
                View All →
              </a>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-4 h-">
              {products.map((product) => (
                <Card key={product.title} product={product} />
              ))}
            </div>
          </div>
          <div className="w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
