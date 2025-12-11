const API_BASE_URL =
  (import.meta.env as { VITE_API_BASE_URL?: string }).VITE_API_BASE_URL || "http://127.0.0.1:3000";

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

export type ProductStats = {
  totalProducts: { count: number }[];
  stockStats: {
    totalQuantity: number;
    totalSoldQuantity: number;
    inStockProducts: number;
    outOfStockProducts: number;
  }[];
  discountStats: {
    productsWithDiscount: number;
    avgDiscountValue: number;
  }[];
  ratingStats: {
    avgRating: number;
  }[];
  categories: { _id: string; count: number }[];
  priceStats: {
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
  }[];
  lowStock: { title: string; quantity: number }[];
};

export const getProductStats = async (token: string): Promise<ProductStats> => {
  const res = await fetch(`${API_BASE_URL}/admin/product/stats`, {
    headers: authHeaders(token),
  });
  if (!res.ok) {
    const message = (await res.json().catch(() => ({}))).message;
    throw new Error(message || `Failed to fetch stats (${res.status})`);
  }
  const data = await res.json();
  return data.stats;
};

export type CreateProductData = {
  title: string;
  brand: string;
  price: number;
  quantity: number;
  rate?: string;
  discount?: number;
  imgurl?: string;
  sku?: string;
  category?: string;
  colors?: string[];
  description?: string;
  specifications?: string[];
  shortDescription?: string;
  reviews?: Array<{
    author: string;
    rating: number;
    comment: string;
    date: string;
  }>;
};

export const createProduct = async (
  productData: CreateProductData,
  token: string
): Promise<any> => {
  const res = await fetch(`${API_BASE_URL}/admin/product`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    const message = (await res.json().catch(() => ({}))).message;
    throw new Error(message || `Failed to create product (${res.status})`);
  }
  return res.json();
};

export const deleteProduct = async (productId: string, token: string): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/admin/product`, {
    method: "DELETE",
    headers: authHeaders(token),
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) {
    const message = (await res.json().catch(() => ({}))).message;
    throw new Error(message || `Failed to delete product (${res.status})`);
  }
};

