import { MouseEvent, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineStarRate } from "react-icons/md";
import { Link } from "react-router-dom";
import { products } from "../pages/types";
import { useCart } from "../context/CartContext";

type CardProps = {
  product: products;
};
const Card = ({ product }: CardProps) => {
  const { title, brand, rate, price, imgurl, id } = product;
  const [hover, setHover] = useState<boolean>(false);
  const { addItem } = useCart();

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addItem(product);
  };
  return (
    <Link
      to={`/product_detailes/${id || "1"}`}
      className="flex flex-col h-full"
    >
      <div
        className={`card bg-base-100 w-full hover:shadow-xl rounded-lg h-full `}
        onMouseEnter={() => {
          !hover && setHover(!hover);
        }}
        onMouseLeave={() => {
          hover && setHover(!hover);
        }}
      >
        <figure className="w-full overflow-hidden aspect-square ">
          <img
            src={`${imgurl}`}
            alt="Shoes"
            className={`object-cover w-full h-full ${
              hover && "scale-110"
            } transition duration-150`}
          />
        </figure>
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

            <p className="text-gray-400 text-sm">{rate}</p>
          </div>
          <p className="text-lg font-medium">${price.toFixed(2)}</p>

          <div className="card-actions justify-end ">
            <button
              type="button"
              className="btn w-full btn-sm text-white bg-[#0D9488] btn-accent"
              onClick={handleAddToCart}
            >
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
