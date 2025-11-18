import { IoCartOutline } from "react-icons/io5";
import { MdOutlineStarRate } from "react-icons/md";

const Card = () => {
  return (
    <div className="card bg-base-100 w-full max-w-72 shadow-xl rounded-lg ">
      <div className="w-full">
        <img
          src="https://images.unsplash.com/photo-1675953935267-e039f13ddd79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Shoes"
        />
      </div>
      <div className="card-body">
        <div className="pb-5 flex flex-col">
          <h3 className="text-gray-500 text-sm">SoundMax</h3>
          <h2 className="card-title text-base">Premium Wireless Headphones</h2>
        </div>
        <div className="flex gap-5   ">
          <div className="flex items-center text-yellow-400">
            <MdOutlineStarRate />
            <MdOutlineStarRate />
            <MdOutlineStarRate />
          </div>
          <p className="text-gray-400 text-sm">4.6(892)</p>
        </div>
        <p className="text-lg font-medium">$179.99</p>
        <div className="card-actions justify-end">
          <button className="btn w-full btn-sm text-white bg-[#0D9488]">
            <IoCartOutline className="text-lg" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
