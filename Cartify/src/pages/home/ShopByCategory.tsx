import React, { useMemo } from "react";
import CategoryCard from "../../components/categoryPanel/CategoryCard";
import { CiHeadphones } from "react-icons/ci";
import { FiWatch } from "react-icons/fi";
import { MdComputer } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";
import { CiMobile2 } from "react-icons/ci";
import { productsData } from "../productsData";

const categoryIcons: Record<string, React.ReactNode> = {
  Audio: <CiHeadphones />,
  Wearables: <FiWatch />,
  Computers: <MdComputer />,
  Photography: <IoCameraOutline />,
  Gaming: <IoGameControllerOutline />,
  Electronics: <CiMobile2 />,
};

function ShopByCategory() {
  const categories = useMemo(() => {
    const categoryCounts = productsData.reduce((acc, product) => {
      const category = product.category || "Other";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts).map(([name, itemCount]) => ({
      name,
      itemCount,
      icon: categoryIcons[name] || <CiMobile2 />,
    }));
  }, []);

  return (

    <section className="py-8 bg-gray-50		">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-base-content mb-5 mt-5">
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
