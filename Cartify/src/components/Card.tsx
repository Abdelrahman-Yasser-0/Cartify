import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineStarRate } from "react-icons/md";

type CardProps = {};
const Card = () => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <div
      className={`card bg-base-100 w-full hover:shadow-xl  rounded-lg`}
      onMouseEnter={() => {
        !hover && setHover(!hover);
      }}
      onMouseLeave={() => {
        hover && setHover(!hover);
      }}
    >
      <div className="w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1757946718516-fddeb8d3ed9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Shoes"
          className={`object-cover ${
            hover && "scale-110"
          } transition duration-150`}
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
