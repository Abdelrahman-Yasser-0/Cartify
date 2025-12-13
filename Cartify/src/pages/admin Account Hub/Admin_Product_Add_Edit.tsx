import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "./../../components/Header";
import { FiArrowLeft, FiX, FiPlus } from "react-icons/fi";
import { products } from "../types";
import { createProduct } from "../../api/adminApi";
import { fetchProducts, fetchProductById } from "../../api/productApi";

type TabType = "basic" | "media" | "pricing" | "inventory" | "colors";

const Admin_Product_Add_Edit = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [activeTab, setActiveTab] = useState<TabType>("basic");
  const [formData, setFormData] = useState<Partial<products>>({
    title: "",
    brand: "",
    rate: "0",
    price: 0,
    originalPrice: undefined,
    discount: undefined,
    imgurl: "",
    sku: "",
    quantity: 0,
    category: "",
    colors: [],
    description: "",
    specifications: [],
    reviews: [],
    shortDescription: "",
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
  });

  const [images, setImages] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState<
    { key: string; value: string }[]
  >([]);
  const categories: string[] = ["Electronics", "Audio", "Wearables", "Computers", "Gaming", "Photography"];
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);


  useEffect(() => {
    if (isEditMode && id) {
      const loadProduct = async () => {
        try {
          const product = await fetchProductById(id);
          setFormData({
            ...product,
            isNew: product.isNew || false,
            isBestSeller: product.isBestSeller || false,
            isFeatured: product.isFeatured || false,
            originalPrice: product.originalPrice,
            discount: product.discount,
          });
          setImages(product.imgurl ? [product.imgurl] : []);
          if (product.specifications) {
            if (Array.isArray(product.specifications)) {
              setSpecifications(
                product.specifications.map((spec) => {
                  if (typeof spec === "string" && spec.includes(":")) {
                    const [key, ...valueParts] = spec.split(":");
                    return { key: key.trim(), value: valueParts.join(":").trim() };
                  }
                  return { key: "", value: spec };
                })
              );
            } else {
              setSpecifications(
                Object.entries(product.specifications).map(([key, value]) => ({
                  key,
                  value: String(value),
                }))
              );
            }
          }
        } catch (err) {
          console.error("Error loading product:", err);
          alert("Failed to load product. Redirecting...");
          navigate("/admin/products");
        }
      };
      loadProduct();
    }
  }, [id, isEditMode, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "price" || name === "originalPrice" || name === "quantity" || name === "discount"
          ? parseFloat(value) || 0
          : name === "rate"
          ? value
          : value,
    }));
  };

  const addImage = (url: string) => {
    if (url.trim()) {
      setImages((prev) => [...prev, url.trim()]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateImage = (index: number, url: string) => {
    setImages((prev) => prev.map((img, i) => (i === index ? url.trim() : img)));
  };

  const addSpecification = () => {
    setSpecifications((prev) => [...prev, { key: "", value: "" }]);
  };

  const updateSpecification = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    setSpecifications((prev) =>
      prev.map((spec, i) => (i === index ? { ...spec, [field]: value } : spec))
    );
  };

  const removeSpecification = (index: number) => {
    setSpecifications((prev) => prev.filter((_, i) => i !== index));
  };

  const [newColorInput, setNewColorInput] = useState("");

  const addColor = () => {
    if (newColorInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        colors: [...(prev.colors || []), newColorInput.trim()],
      }));
      setNewColorInput("");
    }
  };

  const removeColor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors?.filter((_, i) => i !== index) || [],
    }));
  };

  const addReview = () => {
    setFormData((prev) => ({
      ...prev,
      reviews: [
        ...(prev.reviews || []),
        {
          author: "",
          rating: 5,
          comment: "",
          date: new Date().toISOString().split("T")[0],
        },
      ],
    }));
  };

  const updateReview = (
    index: number,
    field: "author" | "rating" | "comment" | "date",
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      reviews: prev.reviews?.map((review, i) =>
        i === index ? { ...review, [field]: value } : review
      ) || [],
    }));
  };

  const removeReview = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      reviews: prev.reviews?.filter((_, i) => i !== index) || [],
    }));
  };

  const handlePublish = async () => {
    if (!formData.title || !formData.price || !formData.brand) {
      alert(
        "Please fill in all required fields (Product Name, Brand, Price)"
      );
      return;
    }

    if (!formData.quantity && formData.quantity !== 0) {
      alert("Please enter stock quantity");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create products");
      return;
    }

    setLoading(true);
    try {
      const specsArray = specifications
        .filter((spec) => spec.key && spec.value)
        .map((spec) => `${spec.key}: ${spec.value}`);

      const productData = {
        title: formData.title!,
        brand: formData.brand!,
        price: formData.price!,
        quantity: formData.quantity || 0,
        rate: formData.rate || "0",
        imgurl: images[0] || "",
        category: formData.category,
        sku: formData.sku || "",
        colors: formData.colors || [],
        description: formData.description || "",
        specifications: specsArray,
        reviews: formData.reviews || [],
        shortDescription: formData.shortDescription || ""
      };

      await createProduct(productData, token);
      alert("Product created successfully!");
      navigate("/admin/products");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create product");
      console.error("Error creating product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-row max-w-screen-2xl mx-auto">
        <Sidebar />
        <div className="mt-24 mx-12 lg:ml-96 flex flex-col z-10 w-full gap-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Link
                to="/admin/products"
                className="btn btn-ghost btn-sm btn-circle"
              >
                <FiArrowLeft size={20} />
              </Link>
              <h1 className="text-2xl font-semibold">
                {isEditMode ? "Edit Product" : "Add New Product"}
              </h1>
            </div>
            <p className="text-gray-500 ml-10">
              {isEditMode
                ? "Update product information in your catalog"
                : "Create a new product in your catalog"}
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handlePublish}
              disabled={loading}
              className="btn bg-teal-600 text-white hover:bg-teal-700"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating...
                </>
              ) : (
                "Publish Product"
              )}
            </button>
          </div>

          <div className="border-b border-gray-200">
            <div className="flex gap-6">
              {[
                { id: "basic" as TabType, label: "Basic Info" },
                { id: "media" as TabType, label: "Media" },
                { id: "pricing" as TabType, label: "Pricing" },
                { id: "inventory" as TabType, label: "Inventory" },
                { id: "colors" as TabType, label: "Colors" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 px-1 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-teal-600 text-teal-600 font-medium"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border rounded-xl p-6 bg-white">
            {activeTab === "basic" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Product Information
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Basic details about your product
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        Product Name *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g. Wireless Headphones"
                      className="input input-bordered w-full"
                      value={formData.title || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        Description
                      </span>
                    </label>
                    <textarea
                      name="description"
                      placeholder="Describe your product..."
                      className="textarea textarea-bordered w-full h-32"
                      value={formData.description || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        Short Description
                      </span>
                    </label>
                    <textarea
                      name="shortDescription"
                      placeholder="Brief description for product cards..."
                      className="textarea textarea-bordered w-full h-24"
                      value={formData.shortDescription || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">
                          Category *
                        </span>
                      </label>
                      <select
                        name="category"
                        className="select select-bordered w-full"
                        value={formData.category || ""}
                        onChange={handleInputChange}
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text font-medium">Brand *</span>
                      </label>
                      <input
                        type="text"
                        name="brand"
                        placeholder="e.g. Apple"
                        className="input input-bordered w-full"
                        value={formData.brand || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">Rating</span>
                      </label>
                      <input
                        type="text"
                        name="rate"
                        placeholder="e.g. 4.5"
                        className="input input-bordered w-full"
                        value={formData.rate || "0"}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text font-medium">SKU</span>
                      </label>
                      <input
                        type="text"
                        name="sku"
                        placeholder="e.g. PROD-001"
                        className="input input-bordered w-full"
                        value={formData.sku || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <label className="label">
                      <span className="label-text font-medium">Product Flags</span>
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isNew"
                          className="checkbox checkbox-primary"
                          checked={formData.isNew || false}
                          onChange={handleInputChange}
                        />
                        <span className="label-text">New Product</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isBestSeller"
                          className="checkbox checkbox-primary"
                          checked={formData.isBestSeller || false}
                          onChange={handleInputChange}
                        />
                        <span className="label-text">Best Seller</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isFeatured"
                          className="checkbox checkbox-primary"
                          checked={formData.isFeatured || false}
                          onChange={handleInputChange}
                        />
                        <span className="label-text">Featured</span>
                      </label>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-3">
                      <label className="label">
                        <span className="label-text font-medium">
                          Specifications
                        </span>
                      </label>
                      <button
                        onClick={addSpecification}
                        className="btn btn-sm btn-outline"
                        type="button"
                      >
                        <FiPlus size={16} />
                        Add Specification
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      {specifications.map((spec, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder="Key (e.g. Processor)"
                            className="input input-bordered flex-1"
                            value={spec.key}
                            onChange={(e) =>
                              updateSpecification(index, "key", e.target.value)
                            }
                          />
                          <input
                            type="text"
                            placeholder="Value (e.g. Intel Core i7)"
                            className="input input-bordered flex-1"
                            value={spec.value}
                            onChange={(e) =>
                              updateSpecification(
                                index,
                                "value",
                                e.target.value
                              )
                            }
                          />
                          <button
                            onClick={() => removeSpecification(index)}
                            className="btn btn-sm btn-ghost text-error"
                            type="button"
                          >
                            <FiX size={18} />
                          </button>
                        </div>
                      ))}
                      {specifications.length === 0 && (
                        <p className="text-gray-400 text-sm">
                          No specifications added. Click "Add Specification" to
                          add one.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-3">
                      <label className="label">
                        <span className="label-text font-medium">Reviews</span>
                      </label>
                      <button
                        onClick={addReview}
                        className="btn btn-sm btn-outline"
                        type="button"
                      >
                        <FiPlus size={16} />
                        Add Review
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      {formData.reviews && formData.reviews.length > 0 ? (
                        formData.reviews.map((review, index) => (
                          <div
                            key={index}
                            className="border rounded-lg p-4 bg-gray-50"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                              <div>
                                <label className="label py-1">
                                  <span className="label-text text-xs">Author</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="Author name"
                                  className="input input-bordered w-full input-sm"
                                  value={review.author}
                                  onChange={(e) =>
                                    updateReview(index, "author", e.target.value)
                                  }
                                />
                              </div>
                              <div>
                                <label className="label py-1">
                                  <span className="label-text text-xs">Rating (1-5)</span>
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  max="5"
                                  placeholder="5"
                                  className="input input-bordered w-full input-sm"
                                  value={review.rating}
                                  onChange={(e) =>
                                    updateReview(
                                      index,
                                      "rating",
                                      parseInt(e.target.value) || 5
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="mb-3">
                              <label className="label py-1">
                                <span className="label-text text-xs">Comment</span>
                              </label>
                              <textarea
                                placeholder="Review comment"
                                className="textarea textarea-bordered w-full textarea-sm"
                                rows={2}
                                value={review.comment}
                                onChange={(e) =>
                                  updateReview(index, "comment", e.target.value)
                                }
                              />
                            </div>
                            <div className="flex justify-between items-center">
                              <input
                                type="date"
                                className="input input-bordered input-sm"
                                value={review.date}
                                onChange={(e) =>
                                  updateReview(index, "date", e.target.value)
                                }
                              />
                              <button
                                onClick={() => removeReview(index)}
                                className="btn btn-sm btn-ghost text-error"
                                type="button"
                              >
                                <FiX size={18} />
                                Remove
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-sm">
                          No reviews added. Click "Add Review" to add one.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "media" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Product Images</h2>
                  <p className="text-gray-500 text-sm">
                    Add image URLs for your product
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {images.length === 0 ? (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="https://example.com/image.jpg"
                        className="input input-bordered w-full"
                        value=""
                        onChange={(e) => {
                          if (e.target.value.trim()) {
                            addImage(e.target.value);
                          }
                        }}
                        onBlur={(e) => {
                          if (e.target.value.trim()) {
                            addImage(e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                    </div>
                  ) : (
                    images.map((img, index) => (
                      <div key={index} className="flex flex-col gap-2">
                        <div className="flex gap-2 items-start">
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="https://example.com/image.jpg"
                              className="input input-bordered w-full"
                              value={img}
                              onChange={(e) =>
                                updateImage(index, e.target.value)
                              }
                            />
                          </div>
                          <button
                            onClick={() => removeImage(index)}
                            className="btn btn-sm btn-ghost text-error"
                          >
                            <FiX size={18} />
                          </button>
                        </div>
                        {img && (
                          <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                            <img
                              src={img}
                              alt={`Product ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='14' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EInvalid URL%3C/text%3E%3C/svg%3E";
                              }}
                            />
                            {index === 0 && (
                              <span className="absolute bottom-1 left-1 bg-teal-600 text-white text-xs px-2 py-0.5 rounded">
                                Primary
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                  {images.length > 0 && (
                    <button
                      onClick={() => addImage("")}
                      className="btn btn-outline border-dashed w-full"
                    >
                      <FiPlus size={18} />
                      Add Another Image URL
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === "pricing" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Pricing Information
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Set the price for your product
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Price *</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        EGP
                      </span>
                      <input
                        type="number"
                        name="price"
                        placeholder="0.00"
                        step="0.01"
                        className="input input-bordered w-full pl-12"
                        value={formData.price || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Discount %</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="discount"
                        placeholder="0"
                        step="0.01"
                        className="input input-bordered w-full pr-8"
                        value={formData.discount || ""}
                        onChange={handleInputChange}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "inventory" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Inventory Management
                  </h2>
                  <p className="text-gray-500 text-sm">Manage stock levels</p>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">
                      Stock Quantity *
                    </span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="0"
                    min="0"
                    className="input input-bordered w-full"
                    value={formData.quantity || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {activeTab === "colors" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Product Colors</h2>
                  <p className="text-gray-500 text-sm">
                    Add available colors for your product
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {formData.colors && formData.colors.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {formData.colors.map((color, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg"
                        >
                          <span className="font-medium">{color}</span>
                          <button
                            onClick={() => removeColor(index)}
                            className="btn btn-sm btn-ghost text-error p-0 min-h-0 h-auto"
                          >
                            <FiX size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">
                      No colors added yet. Enter a color name below and click
                      "Add Color" to add one.
                    </p>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter color name (e.g. Black, Red, Blue)"
                      className="input input-bordered flex-1"
                      value={newColorInput}
                      onChange={(e) => setNewColorInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addColor();
                        }
                      }}
                    />
                    <button onClick={addColor} className="btn btn-primary">
                      <FiPlus size={18} />
                      Add Color
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Product_Add_Edit;
