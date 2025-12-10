import { products as ProductType } from "../pages/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:3000";

export type RawProduct = {
  _id?: string;
  id?: string;
  title?: string;
  brand?: string;
  price?: number;
  quantity?: number;
  rate?: string;
  discountPrice?: number;
  discount?: number;
  inStock?: boolean;
  hasDiscount?: boolean;
  imgurl?: string;
  sku?: string;
  category?: string;
  colors?: string[];
  description?: string;
  specifications?: string[] | Record<string, string>;
  reviews?: {
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  shortDescription?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
};

const normalizeSpecifications = (
  specs?: string[] | Record<string, string>
): Record<string, string> => {
  if (!specs) return {};
  if (Array.isArray(specs)) {
    return specs.reduce<Record<string, string>>((acc, item, index) => {
      if (typeof item !== "string") {
        acc[`spec-${index + 1}`] = String(item);
        return acc;
      }
      const parts = item.split(":");
      if (parts.length >= 2) {
        const key = parts.shift()?.trim() || `spec-${index + 1}`;
        acc[key] = parts.join(":").trim();
      } else {
        acc[`spec-${index + 1}`] = item;
      }
      return acc;
    }, {});
  }
  return specs;
};

export const normalizeProduct = (raw: RawProduct): ProductType => {
  const price = raw.price ?? 0;
  const discountPrice = raw.discountPrice ?? undefined;
  const hasDiscountPercent =
    typeof raw.discount === "number" && raw.discount > 0;
  const inferredOriginal =
    hasDiscountPercent && price > 0
      ? Number((price / (1 - raw.discount! / 100)).toFixed(2))
      : undefined;
  const originalPrice = discountPrice ?? inferredOriginal;
  const reviewsCount = Array.isArray(raw.reviews) ? raw.reviews.length : 0;

  const product: ProductType = {
    id: raw._id || raw.id || "",
    title: raw.title || "Untitled Product",
    brand: raw.brand || "Unknown Brand",
    rate: raw.rate
      ? reviewsCount
        ? `${raw.rate} (${reviewsCount})`
        : raw.rate
      : reviewsCount
      ? `0 (${reviewsCount})`
      : "0",
    price,
    originalPrice,
    discount: raw.discount,
    imgurl: raw.imgurl || "",
    sku: raw.sku || "",
    category: raw.category || "Uncategorized",
    colors: raw.colors && raw.colors.length ? raw.colors : ["Default"],
    shortDescription:
      raw.shortDescription || raw.description || "No description provided.",
    description: raw.description || "No description provided.",
    specifications: normalizeSpecifications(raw.specifications),
    reviews: raw.reviews || [],
    stock: raw.quantity ?? 0,
    inStock: raw.inStock ?? (raw.quantity ?? 0) > 0,
    isNew: raw.isNew,
    isBestSeller: raw.isBestSeller,
    isFeatured: raw.isFeatured,
  };
  return product;
};

export const fetchProducts = async (): Promise<ProductType[]> => {
  const response = await fetch(`${API_BASE_URL}/product`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  const data: RawProduct[] = await response.json();
  return data.map(normalizeProduct);
};

export const fetchProductById = async (id: string): Promise<ProductType> => {
  const response = await fetch(`${API_BASE_URL}/product/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product ${id}: ${response.statusText}`);
  }
  const data: RawProduct = await response.json();
  return normalizeProduct(data);
};

