import React from "react";
import { Link } from "react-router-dom";

function CategoryCard({
  category,
  index,
}: {
  category: { name: string; itemCount: number; icon: React.ReactNode };
  index: number;
}) {
  return (
    <Link
      to={`/product_listing?category=${encodeURIComponent(category.name)}`}
      key={index}
      className="bg-zinc-100 rounded-lg p-4 text-center hover:bg-base-300 transition-colors duration-200 cursor-pointer border border-base-300"
    >
      <p className="text-teal-600		 flex justify-center items-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
        {category.icon}
      </p>
      <h3 className="font-semibold text-base-content mb-1">{category.name}</h3>
    </Link>
  );
}

export default CategoryCard;
