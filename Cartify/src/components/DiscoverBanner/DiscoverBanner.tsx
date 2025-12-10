import { Link } from "react-router-dom";
import bgImage from "../../images/photo-1464854860390-e95991b46441.jpeg";

const DiscoverBanner = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={bgImage}
          alt="city background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/60 to-white/40"></div>
      </div>

      <div className="max-w-screen-2xl	 mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="inline-block bg-teal-600 text-white text-sm font-semibold px-3 py-1 rounded-lg">
            New Collection 2025
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-normal leading-tight text-gray-900">
            Discover Premium Tech
            <br />
            &amp; Electronics
          </h1>

          <p className="mt-6 text-gray-500 text-sm md:text-base">
            Shop the latest gadgets, audio equipment, and smart devices. Free
            shipping on orders over $50.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/product_listing"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-3 rounded-md shadow "
            >
              Shop Now
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverBanner;
