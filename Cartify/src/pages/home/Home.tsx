import Header from "../../components/Header";
import Card from "./../../components/Card";
import Footer from "./../../components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="flex-col gap-8 flex p-8">
        <div></div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">Featured Products</h1>
            <h2 className="text-gray-400">Hand-picked products just for you</h2>
          </div>
          <a role="button" className="btn btn-sm">
            View All →
          </a>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-4">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
