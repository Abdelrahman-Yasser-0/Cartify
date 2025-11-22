import DiscoverBanner from "../../components/DiscoverBanner/DiscoverBanner";
import Header from "../../components/Header";
import Card from "./../../components/Card";
import Footer from "./../../components/Footer";
import { productsData } from "../productsData";

const Home = () => {
  const products = productsData;
  return (
    <div>
      <Header />
      <DiscoverBanner />
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
