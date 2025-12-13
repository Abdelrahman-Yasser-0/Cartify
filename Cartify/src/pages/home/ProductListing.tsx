import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiGrid, FiList, FiSliders, FiHeart } from "react-icons/fi";
import { MdOutlineStarRate } from "react-icons/md";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { fetchProducts } from "../../api/productApi";
import { products } from "../types";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

type ViewMode = "grid" | "list";

type ProductCardProps = {
  product: products;
  viewMode: ViewMode;
  onAddToCart: (product: products) => void;
};

const ProductCard = ({ product, viewMode, onAddToCart }: ProductCardProps) => {
  const {
    title,
    brand,
    rate,
    price,
    imgurl,
    discount,
    originalPrice,
    shortDescription,
  } = product;
  const parsedRating = parseFloat(rate);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl overflow-hidden transition hover:shadow-lg ${
        viewMode === "list"
          ? "flex flex-col sm:flex-row items-center gap-6 p-4"
          : "flex flex-col"
      }`}
    >
      <div
        className={`relative ${
          viewMode === "grid" ? "aspect-[4/3]" : "w-full sm:w-56 aspect-square"
        } overflow-hidden`}
      >
        {discount && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
            -{discount}%
          </span>
        )}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <FiHeart 
            className={`text-lg ${isFavorite ? 'fill-teal-600 text-teal-600' : 'text-gray-600'}`}
          />
        </button>
        <Link to={`/product_detailes/${product.id || "1"}`}>
          <img
            src={imgurl}
            alt={title}
            className="object-cover w-full h-full transition duration-200 hover:scale-105"
            loading="lazy"
          />
        </Link>
      </div>

      <div
        className={`flex flex-1 flex-col gap-3 ${
          viewMode === "grid" ? "p-5" : "w-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-sm text-teal-600 font-medium">{brand}</span>
          <div className="flex items-center gap-1 text-amber-400 text-sm font-medium">
            <MdOutlineStarRate />
            <span>{parsedRating.toFixed(1)}</span>
            <span className="text-gray-400 text-xs">
              {rate.replace(`${parsedRating}`, "")}
            </span>
          </div>
        </div>
        <Link to={`/product_detailes/${product.id || "1"}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-teal-600 transition">{title}</h3>
        </Link>
        <p className="text-sm text-gray-500">
          {shortDescription || "Discover premium tech tailored to your needs."}
        </p>
        <div className="flex items-baseline gap-3">
          <p className="text-2xl font-semibold text-gray-900">
            EGP {price.toFixed(2)}
          </p>
          {originalPrice && (
            <p className="text-sm text-gray-400 line-through">
              EGP {originalPrice.toFixed(2)}
            </p>
          )}
        </div>
        <div className="flex gap-3 pt-2 flex-wrap">
          <button
            className="btn btn-primary bg-teal-600 hover:bg-teal-500 border-none text-white"
            disabled={!product.inStock}
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
          <Link
            to={`/product_detailes/${product.id || "1"}`}
            className="btn btn-outline border-gray-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCart();
  const [allProducts, setAllProducts] = useState<products[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 0 });

  const categories = useMemo(
    () =>
      Array.from(
        new Set(allProducts.map((product) => product.category || "Other"))
      ),
    [allProducts]
  );
  const brands = useMemo(
    () => Array.from(new Set(allProducts.map((product) => product.brand))),
    [allProducts]
  );

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") ?? "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category") ? searchParams.get("category")!.split(",") : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get("brands") ? searchParams.get("brands")!.split(",") : []
  );
  const [priceFilter, setPriceFilter] = useState<number>(0);
  const [ratingFilter, setRatingFilter] = useState(
    Number(searchParams.get("rating")) || 0
  );
  const [sortOption, setSortOption] = useState(
    searchParams.get("sort") || "popular"
  );
  const [saleOnly, setSaleOnly] = useState(
    searchParams.get("sale") === "true"
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const isLoading = isFetching;

  const arraysEqual = (a: string[], b: string[]) =>
    a.length === b.length && a.every((value, index) => value === b[index]);

  useEffect(() => {
    setIsFetching(true);
    fetchProducts()
      .then((data) => {
        setAllProducts(data);
        const prices = data.map((product) => product.price);
        if (prices.length) {
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceBounds({
            min: Number.isFinite(minPrice) ? Math.floor(minPrice) : 0,
            max: Number.isFinite(maxPrice) ? Math.ceil(maxPrice) : 0,
          });
          const param = searchParams.get("maxPrice");
          const parsed = param ? Number(param) : NaN;
          const initialPrice = !isNaN(parsed)
            ? parsed
            : Number.isFinite(maxPrice)
            ? Math.ceil(maxPrice)
            : 0;
          setPriceFilter(initialPrice);
        }
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Failed to load products.";
        setError(message);
      })
      .finally(() => setIsFetching(false));
  }, []);

  useEffect(() => {
    const urlCategories = searchParams.get("category")
      ? searchParams
          .get("category")!
          .split(",")
          .filter((item) => item)
      : [];
    const urlBrands = searchParams.get("brands")
      ? searchParams
          .get("brands")!
          .split(",")
          .filter((item) => item)
      : [];
    const urlSearch = searchParams.get("q") ?? "";
    const urlRating = Number(searchParams.get("rating")) || 0;
    const maxPriceParam = searchParams.get("maxPrice");
    const parsedUrlPrice = maxPriceParam !== null ? Number(maxPriceParam) : NaN;
    const urlPrice = !isNaN(parsedUrlPrice)
      ? parsedUrlPrice
      : priceBounds.max || priceFilter;
    const urlSort = searchParams.get("sort") || "popular";
    const urlSale = searchParams.get("sale") === "true";

    if (!arraysEqual(urlCategories, selectedCategories)) {
      setSelectedCategories(urlCategories);
    }
    if (!arraysEqual(urlBrands, selectedBrands)) {
      setSelectedBrands(urlBrands);
    }
    if (urlSearch !== searchTerm) {
      setSearchTerm(urlSearch);
    }
    if (urlRating !== ratingFilter) {
      setRatingFilter(urlRating);
    }
    if (urlPrice !== priceFilter && priceBounds.max) {
      setPriceFilter(urlPrice);
    }
    if (urlSort !== sortOption) {
      setSortOption(urlSort);
    }
    if (urlSale !== saleOnly) {
      setSaleOnly(urlSale);
    }
  }, [searchParams, priceBounds.max]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategories.length) {
      params.set("category", selectedCategories.join(","));
    }
    if (selectedBrands.length) {
      params.set("brands", selectedBrands.join(","));
    }
    if (searchTerm) {
      params.set("q", searchTerm);
    }
    if (ratingFilter) {
      params.set("rating", String(ratingFilter));
    }
    if (priceFilter !== priceBounds.max && priceBounds.max > 0) {
      params.set("maxPrice", String(priceFilter));
    }
    if (sortOption !== "popular") {
      params.set("sort", sortOption);
    }
    if (saleOnly) {
      params.set("sale", "true");
    }
    setSearchParams(params, { replace: true });
  }, [
    selectedCategories,
    selectedBrands,
    searchTerm,
    ratingFilter,
    priceFilter,
    sortOption,
    saleOnly,
    priceBounds.max,
    setSearchParams,
  ]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory = selectedCategories.length
        ? selectedCategories.includes(product.category || "Other")
        : true;
      const matchesBrand = selectedBrands.length
        ? selectedBrands.includes(product.brand)
        : true;
      const matchesSearch = searchTerm
        ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesPrice = product.price <= priceFilter;
      const matchesRating = ratingFilter
        ? parseFloat(product.rate) >= ratingFilter
        : true;
      const matchesSale = saleOnly
        ? (typeof product.discount === 'number' && product.discount > 0)
        : true;
      return (
        matchesCategory &&
        matchesBrand &&
        matchesSearch &&
        matchesPrice &&
        matchesRating &&
        matchesSale
      );
    });
  }, [
    allProducts,
    selectedCategories,
    selectedBrands,
    searchTerm,
    priceFilter,
    ratingFilter,
    saleOnly,
  ]);

  const sortedProducts = useMemo(() => {
    const productsClone = [...filteredProducts];
    switch (sortOption) {
      case "priceLowHigh":
        return productsClone.sort((a, b) => a.price - b.price);
      case "priceHighLow":
        return productsClone.sort((a, b) => b.price - a.price);
      case "newest":
        return productsClone.sort(
          (a, b) => Number(b.id ?? 0) - Number(a.id ?? 0)
        );
      default:
        return productsClone;
    }
  }, [filteredProducts, sortOption]);

  const activeFilters = useMemo(() => {
    const chips: Array<{ label: string; onRemove: () => void }> = [];
    selectedCategories.forEach((category) =>
      chips.push({
        label: category,
        onRemove: () =>
          setSelectedCategories((prev) =>
            prev.filter((item) => item !== category)
          ),
      })
    );
    selectedBrands.forEach((brand) =>
      chips.push({
        label: brand,
        onRemove: () =>
          setSelectedBrands((prev) => prev.filter((item) => item !== brand)),
      })
    );
    if (ratingFilter) {
      chips.push({
        label: `${ratingFilter}+ Stars`,
        onRemove: () => setRatingFilter(0),
      });
    }
    if (priceFilter !== priceBounds.max) {
      chips.push({
        label: `≤ EGP ${priceFilter}`,
        onRemove: () => setPriceFilter(priceBounds.max),
      });
    }
    if (searchTerm) {
      chips.push({
        label: `Search: ${searchTerm}`,
        onRemove: () => setSearchTerm(""),
      });
    }
    if (saleOnly) {
      chips.push({
        label: "Sale Items Only",
        onRemove: () => setSaleOnly(false),
      });
    }
    return chips;
  }, [
    selectedCategories,
    selectedBrands,
    ratingFilter,
    priceFilter,
    priceBounds.max,
    searchTerm,
    saleOnly,
  ]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setRatingFilter(0);
    setPriceFilter(priceBounds.max || 0);
    setSearchTerm("");
    setSortOption("popular");
    setSaleOnly(false);
  };

  const Filters = (
    <aside className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button
          className="text-sm text-teal-600 font-medium hover:underline"
          onClick={clearAllFilters}
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Special Filters</h4>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-success"
              checked={saleOnly}
              onChange={(event) => setSaleOnly(event.target.checked)}
            />
            Sale Items Only
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Categories</h4>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-success"
                checked={selectedCategories.includes(category)}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setSelectedCategories((prev) =>
                    checked
                      ? [...prev, category]
                      : prev.filter((item) => item !== category)
                  );
                }}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Price Range</h4>
        <div>
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            value={priceFilter}
            step={1}
            onChange={(event) => {
              const val = event.currentTarget.valueAsNumber;
              const clamped = Math.min(
                Math.max(val, priceBounds.min),
                priceBounds.max
              );
              setPriceFilter(
                Number.isFinite(clamped) ? clamped : priceBounds.min
              );
            }}
            className="range range-success"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>EGP {priceBounds.min}</span>
            <span>EGP {priceFilter}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Minimum Rating</h4>
        <div className="flex flex-col gap-3">
          {[4.5, 4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="rating"
                className="radio radio-success radio-sm"
                checked={ratingFilter === rating}
                onChange={() => setRatingFilter(rating)}
              />
              {rating}+ Stars
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="rating"
              className="radio radio-success radio-sm"
              checked={ratingFilter === 0}
              onChange={() => setRatingFilter(0)}
            />
            Any Rating
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Brands</h4>
        <div className="flex flex-col gap-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-success"
                checked={selectedBrands.includes(brand)}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setSelectedBrands((prev) =>
                    checked
                      ? [...prev, brand]
                      : prev.filter((item) => item !== brand)
                  );
                }}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="pt-28 pb-16 px-4 sm:px-8">
        <div className="mx-auto max-w-screen-2xl flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">Home / Products</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  {saleOnly ? "Sale Items" : "All Products"}
                </h1>
                <p className="text-gray-500 text-sm">
                  Showing {sortedProducts.length} of {allProducts.length} items
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="btn btn-outline border-gray-300 lg:hidden"
                  onClick={() => setMobileFiltersOpen((previous) => !previous)}
                >
                  <FiSliders />
                  Filters
                </button>
              </div>
            </div>
            <div className="w-full flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products..."
                className="flex-1 border-none focus:outline-none focus:ring-0 text-sm bg-transparent"
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-error bg-rose-50 text-rose-700 border border-rose-200">
              <span>{error}</span>
            </div>
          )}

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((chip) => (
                <button
                  key={chip.label}
                  className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1 text-sm text-gray-600"
                  onClick={chip.onRemove}
                >
                  {chip.label}
                  <span className="text-gray-400">&times;</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-8">
            <div className="hidden lg:block w-72 shrink-0">{Filters}</div>

            <div className="flex-1 flex flex-col gap-6">
              {mobileFiltersOpen && (
                <div className="lg:hidden bg-white border border-gray-200 rounded-2xl p-6">
                  {Filters}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiSliders className="text-lg text-teal-600" />
                  <span>
                    {sortedProducts.length} products · Sorted by{" "}
                    {sortOption === "popular"
                      ? "Most Popular"
                      : sortOption === "priceLowHigh"
                      ? "Price: Low to High"
                      : sortOption === "priceHighLow"
                      ? "Price: High to Low"
                      : "Newest"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="select select-sm border-gray-300"
                    value={sortOption}
                    onChange={(event) =>
                      setSortOption(event.target.value as typeof sortOption)
                    }
                  >
                    <option value="popular">Most Popular</option>
                    <option value="priceLowHigh">Price: Low to High</option>
                    <option value="priceHighLow">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className={`px-3 py-2 text-sm flex items-center gap-1 ${
                        viewMode === "grid"
                          ? "bg-teal-50 text-teal-700"
                          : "text-gray-500"
                      }`}
                      onClick={() => setViewMode("grid")}
                    >
                      <FiGrid />
                    </button>
                    <button
                      className={`px-3 py-2 text-sm flex items-center gap-1 ${
                        viewMode === "list"
                          ? "bg-teal-50 text-teal-700"
                          : "text-gray-500"
                      }`}
                      onClick={() => setViewMode("list")}
                    >
                      <FiList />
                    </button>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-16">
                  <span className="loading loading-spinner loading-lg text-teal-600"></span>
                </div>
              ) : sortedProducts.length ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id || product.title}
                      product={product}
                      viewMode={viewMode}
                      onAddToCart={(p) => addItem(p, 1)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
                  <p className="text-xl font-semibold text-gray-800">
                    {saleOnly ? "No sale items available" : "No products match these filters"}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {saleOnly 
                      ? "Check back later for amazing deals!"
                      : "Try adjusting the filters or clear them to see all products."
                    }
                  </p>
                  <button
                    className="btn btn-primary bg-teal-600 border-none mt-6 text-white"
                    onClick={clearAllFilters}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductListing;
