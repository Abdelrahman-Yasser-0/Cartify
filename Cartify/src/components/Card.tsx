import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineStarRate } from "react-icons/md";
import { Link } from "react-router-dom";
import { products } from "../pages/types";

type CardProps = {
  product: products;
};
const Card = ({
  product: { title, brand, rate, price, imgurl },
}: CardProps) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <Link to="/product_detailes ">
      <div
        className={`card bg-base-100 w-full hover:shadow-xl rounded-lg `}
        onMouseEnter={() => {
          !hover && setHover(!hover);
        }}
        onMouseLeave={() => {
          hover && setHover(!hover);
        }}
      >
        <div className="w-full overflow-hidden aspect-square ">
          <img
            src={`${imgurl}`}
            alt="Shoes"
            className={`object-cover w-full h-full  ${
              hover && "scale-110"
            } transition duration-150`}
          />
        </div>
        <div className="card-body flex-1">
          <div className="pb-5 flex flex-col ">
            <h3 className="text-gray-500 text-sm">{brand}</h3>
            <h2 className="card-title text-base">{title}</h2>
          </div>
          <div className="flex gap-5">
            <div className="flex items-center text-yellow-400">
              <MdOutlineStarRate />
              <MdOutlineStarRate />
              <MdOutlineStarRate />
            </div>
            <p className="text-gray-400 text-sm">{rate}(892)</p>
          </div>
          <p className="text-lg font-medium">${price}</p>
          <div className="card-actions justify-end">
            <button className="btn w-full btn-sm text-white bg-[#0D9488]">
              <IoCartOutline className="text-lg" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
