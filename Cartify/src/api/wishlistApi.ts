import { products as ProductType } from "../pages/types";
import { fetchProductById } from "./productApi";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://cartifybackend.vercel.app";

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

export const fetchUserWishlist = async (
  token: string
): Promise<string[]> => {
  const res = await fetch(`${API_BASE_URL}/user/me`, {
    headers: authHeaders(token),
  });
  if (!res.ok) {
    const message = (await res.json().catch(() => ({}))).message;
    // If unauthorized or user not found, clear invalid auth data
    if (res.status === 401 || res.status === 404) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    throw new Error(message || `Failed to fetch wishlist (${res.status})`);
  }
  const data = await res.json();
  // Extract productIds from wishingList array of objects
  if (Array.isArray(data.wishingList)) {
    return data.wishingList.map((item: { productId: string }) => item.productId);
  }
  return [];
};

export const addToWishlist = async (
  productId: string,
  token: string
): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/wishingList/add/product`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) {
    const message = (await res.json().catch(() => ({}))).message;
    throw new Error(message || `Failed to add to wishlist (${res.status})`);
  }
};

export const removeFromWishlist = async (
  productId: string,
  token: string
): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/wishingList/remove/product`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) {
    const message = (await res.json().catch(() => ({}))).message;
    throw new Error(message || `Failed to remove from wishlist (${res.status})`);
  }
};

export const enrichWishlistEntries = async (
  productIds: string[]
): Promise<ProductType[]> => {
  const mapped = await Promise.all(
    productIds.map(async (id) => {
      try {
        const product = await fetchProductById(id);
        return product;
      } catch {
        return null;
      }
    })
  );
  return mapped.filter(
    (item): item is ProductType => Boolean(item)
  );
};

