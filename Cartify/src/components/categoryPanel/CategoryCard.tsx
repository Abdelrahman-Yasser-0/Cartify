import React from "react";
import { CiHeadphones } from "react-icons/ci";

function CategoryCard({
  category,
  index,
}: {
  category: { name: string; itemCount: number; icon: React.ReactNode };
  index: number;
}) {
  return (
    // <div className="card bg-base-100 w-1/6 mx-5 shadow-xl">
    //   <figure className="px-10 pt-10">
    //     <CiHeadphones />
    //   </figure>
    //   <div className="card-body items-center text-center">
    //     <h2 className="card-title">Audio</h2>
    //     <p>2 items</p>
    //   </div>
    // </div>
    <div
      key={index}
      className="bg-zinc-100 rounded-lg p-4 text-center hover:bg-base-300 transition-colors duration-200 cursor-pointer border border-base-300"
    >
      <p className="text-teal-600		 flex justify-center items-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
        {category.icon}
      </p>
      <h3 className="font-semibold text-base-content mb-1">{category.name}</h3>
      <p className="text-sm text-base-content/60">
        {category.itemCount} item{category.itemCount !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

export default CategoryCard;
