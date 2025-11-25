import React from "react";
import CategoryCard from "../../components/categoryPanel/CategoryCard";
import { CiHeadphones } from "react-icons/ci";
import { FiWatch } from "react-icons/fi";
import { MdComputer } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";
import { CiMobile2 } from "react-icons/ci";

function ShopByCategory() {
  const categories = [
    { name: "Audio", itemCount: 2, icon: <CiHeadphones /> },
    { name: "Wearables", itemCount: 1, icon: <FiWatch /> },
    { name: "Computers", itemCount: 1, icon: <MdComputer /> },
    { name: "Photography", itemCount: 1, icon: <IoCameraOutline /> },
    { name: "Gaming", itemCount: 2, icon: <IoGameControllerOutline /> },
    { name: "Electronics", itemCount: 1, icon: <CiMobile2 /> },
  ];

  return (
    // <div className="flex flex-col items-center p-16">
    //   <h2 className="text-lg font-bold mb-5">Shop by Category</h2>
    //   <p className="mb-8">Explore our wide range of products</p>
    //   <div className="flex flex-row w-full justify-between	">
    //     <CategoryCard />
    //     <CategoryCard />
    //     <CategoryCard />
    //     <CategoryCard />
    //     <CategoryCard />
    //     <CategoryCard />
    //   </div>
    // </div>

    <section className="py-8 bg-gray-50		">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-base-content mb-5 mt-20">
            Shop by Category
          </h2>
          <p className="text-base-content/70 mb-16">
            Explore our wide range of products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <CategoryCard category={category} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopByCategory;
