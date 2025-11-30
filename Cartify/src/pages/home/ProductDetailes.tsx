import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { productsData } from "../productsData";
import { FiHeart, FiShare2 } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineStarRate } from "react-icons/md";
import { FiTruck, FiCheckCircle, FiRefreshCw } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

const ProductDetailes = () => {
  const { id } = useParams<{ id: string }>();
  const product = productsData.find((p) => p.id === id) || productsData[0];
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0] || ""
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "specifications" | "reviews"
  >("description");

  // Scroll to top when component mounts or product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const rating = parseFloat(product.rate.split(" ")[0]);
  // Extract review count from rate string (format: "4.8 (1247)" or just "4.8")
  const reviewCountMatch = product.rate.match(/\((\d+)\)/);
  const reviewCount = reviewCountMatch ? reviewCountMatch[1] : "0";
  const reviewCountNum = parseInt(reviewCount, 10);

  // Generate sample reviews if review count is high but reviews array is empty
  const reviewsToDisplay = useMemo(() => {
    if (product.reviews && product.reviews.length > 0) {
      return product.reviews;
    }

    if (reviewCountNum <= 3) {
      return [];
    }

    // Generate 3 sample reviews
    const sampleReviews = [];
    const names = ["Alex M.", "Sarah K.", "Michael T.", "Emma L.", "David R."];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Generate reviews based on product category
    const categoryReviews: Record<string, string[]> = {
      Audio: [
        "The sound quality is absolutely incredible! Crystal clear audio with deep bass. Best purchase I've made this year.",
        "Comfortable to wear for hours and the noise cancellation works perfectly. Battery life is impressive too.",
        "Great value for money. The build quality feels premium and the sound is amazing for the price point."
      ],
      Wearables: [
        "Tracks all my activities accurately. The health monitoring features are spot-on and the battery lasts a week!",
        "Love the design and how lightweight it is. The GPS tracking is very precise and the app is user-friendly.",
        "Excellent fitness companion. The heart rate monitor is accurate and the sleep tracking gives great insights."
      ],
      Computers: [
        "Lightning fast performance! Handles all my work tasks effortlessly. The display is crisp and colors are vibrant.",
        "Sleek design and powerful specs. Perfect for both work and entertainment. Battery life is decent for a laptop.",
        "Great build quality and the keyboard is comfortable to type on. No lag or heating issues even with heavy usage."
      ],
      Electronics: [
        "Outstanding camera quality! Photos are sharp and detailed. The performance is smooth and responsive.",
        "Fast charging is a game changer. The display is beautiful and the overall user experience is excellent.",
        "Well worth the investment. Great features and the build quality feels premium. Highly recommend!"
      ],
      Gaming: [
        "Responsive and precise. The RGB lighting looks amazing and the build quality is solid. Perfect for gaming!",
        "Comfortable grip and excellent tracking. Battery life is great and the customization options are fantastic.",
        "Best gaming peripheral I've owned. The performance is top-notch and it feels great in hand during long sessions."
      ],
      Photography: [
        "Stunning image quality! The autofocus is fast and accurate. Professional results every time.",
        "Excellent camera for both photos and video. The low-light performance is impressive and the build is solid.",
        "Worth every penny. The image stabilization works great and the color reproduction is accurate and vibrant."
      ]
    };

    const reviews = categoryReviews[product.category] || [
      "Excellent product! Exceeded my expectations. Great quality and fast shipping.",
      "Very satisfied with this purchase. Works perfectly and looks great too!",
      "Highly recommend! Great value for money and the quality is top-notch."
    ];

    // Use product ID as seed for consistent reviews per product
    const seed = parseInt(product.id, 10);
    for (let i = 0; i < 3; i++) {
      const nameIndex = (seed + i) % names.length;
      const monthIndex = (seed + i * 2) % months.length;
      const day = ((seed + i * 3) % 28) + 1;
      const reviewRating = rating - 0.2 + ((seed + i) % 5) * 0.1;
      
      sampleReviews.push({
        author: names[nameIndex],
        rating: Math.max(4, Math.min(5, Math.round(reviewRating * 2) / 2)),
        comment: reviews[i] || reviews[0],
        date: `${months[monthIndex]} ${day}, 2024`
      });
    }

    return sampleReviews;
  }, [product.id, product.category, product.reviews, reviewCountNum, rating]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <MdOutlineStarRate
          key={i}
          className="text-yellow-400 fill-yellow-400"
        />
      );
    }
    if (hasHalfStar && fullStars < 5) {
      stars.push(
        <MdOutlineStarRate
          key="half"
          className="text-yellow-400 fill-yellow-400 opacity-50"
        />
      );
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      stars.push(<MdOutlineStarRate key={i} className="text-gray-300" />);
    }
    return stars;
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleBuyNow = () => {
    if (product.inStock) {
      addItem(product, quantity);
      navigate("/checkout");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-20 pb-12 flex-1 mt-4">
        <div className="max-w-screen-2xl mx-auto px-12">
          {/* Breadcrumbs */}
          <div className="mb-6 text-sm text-gray-600">
            <Link to="/" className="hover:text-teal-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Products</span>
            {product.category && (
              <>
                <span className="mx-2">/</span>
                <span>{product.category}</span>
              </>
            )}
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.title}</span>
          </div>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="w-full">
              <div className="bg-white rounded-lg p-8 flex items-center justify-center aspect-square">
                <img
                  src={product.imgurl}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col gap-6">
              {/* Brand */}
              <h3 className="text-gray-500 text-lg">{product.brand}</h3>

              {/* Title with Icons */}
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold">{product.title}</h1>
                <div className="flex gap-3">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition">
                    <FiHeart className="text-xl" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition">
                    <FiShare2 className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">{renderStars(rating)}</div>
                <span className="text-gray-600">
                  {product.rate.includes("(")
                    ? product.rate
                    : `${rating} (${reviewCount} reviews)`}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    {product.discount && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                        -{product.discount}%
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Availability */}
              {product.inStock ? (
                <div className="text-green-600 font-medium">In Stock</div>
              ) : (
                <div className="text-red-600 font-medium">Out of Stock</div>
              )}

              {/* SKU */}
              {product.sku && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">SKU:</span> {product.sku}
                </div>
              )}

              {/* Short Description */}
              {product.shortDescription && (
                <p className="text-gray-700 leading-relaxed">
                  {product.shortDescription}
                </p>
              )}

              {/* Color Options */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className="font-medium">Color</span>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-2 border-2 rounded transition ${
                          selectedColor === color
                            ? "border-teal-600 bg-teal-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex flex-col gap-3">
                <span className="font-medium">Quantity</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 border-2 border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 border-2 border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  className="flex-1 bg-teal-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-teal-700 transition disabled:opacity-50"
                  onClick={() => addItem(product, quantity)}
                  disabled={!product.inStock}
                >
                  <IoCartOutline className="text-xl" />
                  Add to Cart
                </button>
                <button
                  className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-lg font-semibold hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Buy Now
                </button>
              </div>

              {/* Additional Services */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div className="flex items-start gap-3">
                  <FiTruck className="text-2xl text-teal-600 mt-1" />
                  <div>
                    <div className="font-medium">Free Shipping</div>
                    <div className="text-sm text-gray-600">
                      On orders over $50
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-2xl text-teal-600 mt-1" />
                  <div>
                    <div className="font-medium">Warranty</div>
                    <div className="text-sm text-gray-600">
                      1 year guarantee
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiRefreshCw className="text-2xl text-teal-600 mt-1" />
                  <div>
                    <div className="font-medium">Easy Returns</div>
                    <div className="text-sm text-gray-600">30 days return</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t pt-8">
            <div className="flex gap-8 border-b mb-6">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-4 px-2 font-medium transition ${
                  activeTab === "description"
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`pb-4 px-2 font-medium transition ${
                  activeTab === "specifications"
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 px-2 font-medium transition ${
                  activeTab === "reviews"
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Reviews ({reviewCount})
              </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
              {activeTab === "description" && (
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>{product.shortDescription}</p>
                  {product.description && <p>{product.description}</p>}
                </div>
              )}

              {activeTab === "specifications" && product.specifications && (
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="flex border-b pb-2">
                        <div className="w-1/3 font-medium text-gray-700">
                          {key}
                        </div>
                        <div className="flex-1 text-gray-600">{value}</div>
                      </div>
                    )
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {reviewsToDisplay.length > 0 ? (
                    <>
                      {reviewsToDisplay.map((review, index) => (
                        <div key={index} className="border-b pb-6 last:border-0">
                          <div className="flex items-center gap-4 mb-2">
                            <div className="font-semibold">{review.author}</div>
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {review.date}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                      {reviewCountNum > 3 && (
                        <div className="pt-4 text-center">
                          <p className="text-gray-500 italic text-sm">
                            ...and {reviewCountNum - 3} more {reviewCountNum - 3 === 1 ? 'review' : 'reviews'} from satisfied customers
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-600">
                      No reviews yet. Be the first to review this product!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailes;
