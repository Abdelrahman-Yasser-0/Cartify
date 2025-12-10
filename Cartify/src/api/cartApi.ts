import { products as ProductType } from "../pages/types";
import { fetchProductById } from "./productApi";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:3000";

type CartEntry = { productId: string; quantity: number };

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

export const fetchUserCart = async (
  token: string
): Promise<CartEntry[]> => {
  const res = await fetch(`${API_BASE_URL}/cart`, {
    headers: authHeaders(token),
  });
  if (!res.ok) {
    const message = (await res.json().catch(() => ({}))).message;
    throw new Error(message || `Failed to fetch cart (${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data.userCart) ? data.userCart : [];
};

export const editProductQuantity = async (
  productId: string,
  delta: number,
  token: string
): Promise<CartEntry[]> => {
  const res = await fetch(`${API_BASE_URL}/cart/editProductQuantity`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify({ productId, quantity: delta }),
  });
  if (!res.ok) {
    const message = (await res.json().catch(() => ({}))).message;
    throw new Error(message || `Failed to update cart (${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data.cart) ? data.cart : [];
};

export const deleteFullCart = async (
  token: string
): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/cart/delete`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok) {
    const message = (await res.json().catch(() => ({}))).message;
    throw new Error(message || `Failed to clear cart (${res.status})`);
  }
};

export const buyCart = async (
  token: string
): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/cart/buy`, {
    method: "PUT",
    headers: authHeaders(token),
  });
  if (!res.ok) {
    const message = (await res.json().catch(() => ({}))).message;
    throw new Error(message || `Failed to buy cart (${res.status})`);
  }
};

export const enrichCartEntries = async (
  entries: CartEntry[]
): Promise<{ productId: string; product: ProductType; quantity: number }[]> => {
  const mapped = await Promise.all(
    entries.map(async (entry) => {
      try {
        const product = await fetchProductById(entry.productId);
        return { productId: entry.productId, product, quantity: entry.quantity };
      } catch {
        return null;
      }
    })
  );
  return mapped.filter(
    (item): item is { productId: string; product: ProductType; quantity: number } =>
      Boolean(item)
  );
};

