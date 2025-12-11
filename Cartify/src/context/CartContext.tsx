import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { IoCartOutline } from "react-icons/io5";
import { products } from "../pages/types";
import {
  buyCart,
  deleteFullCart,
  editProductQuantity,
  enrichCartEntries,
  fetchUserCart,
} from "../api/cartApi";

type CartItem = {
  productId: string;
  product: products;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: products, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: () => Promise<void>;
  totalItems: number;
  subtotal: number;
  loading: boolean;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const storageKey = "cartify.cart.v1";
const userKey = "user";
const tokenKey = "token";

const getProductId = (product: products) =>
  product.id || product.sku || product.title;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? (JSON.parse(stored) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const previousUserIdRef = useRef<string | null>(null);
  const lastAuthSnapshot = useRef<{ userId: string | null; token: string | null }>({
    userId: null,
    token: null,
  });
  const [toast, setToast] = useState<{ id: number; message: string } | null>(
    null
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const getAuth = () => {
    if (typeof window === "undefined") return { userId: null, token: null };
    const token = localStorage.getItem(tokenKey);
    const userRaw = localStorage.getItem(userKey);
    const user = userRaw ? JSON.parse(userRaw) : null;
    const userId = user?._id || user?.id || null;
    return { userId, token: token || null };
  };

  const loadRemoteCart = async () => {
    const { userId, token } = getAuth();
    if (!userId || !token) return;
    setLoading(true);
    try {
      const entries = await fetchUserCart(userId, token);
      const hydrated = await enrichCartEntries(entries);
      setItems(hydrated);
      localStorage.setItem(storageKey, JSON.stringify(hydrated));
    } catch (error) {
      console.error("Failed to load cart", error);
    } finally {
      setLoading(false);
    }
  };

  const mergeAnonymousCartIntoUser = async (
    userId: string,
    token: string,
    anonItems: CartItem[]
  ) => {
    if (!anonItems.length) return;
    try {
      await Promise.all(
        anonItems.map((item) =>
          editProductQuantity(userId, item.productId, item.quantity, token)
        )
      );
    } catch (error) {
      console.error("Failed to merge anonymous cart", error);
    } finally {
      localStorage.removeItem(storageKey);
    }
  };

  const handleAuthChange = async () => {
    const { userId, token } = getAuth();
    const prev = previousUserIdRef.current;
    lastAuthSnapshot.current = { userId, token };

    // Logout or no auth: clear cart
    if (!userId || !token) {
      if (prev) {
        setItems([]);
        localStorage.removeItem(storageKey);
      }
      previousUserIdRef.current = null;
      return;
    }

    // Login or user switch: merge anon cart then load remote
    if (!prev || prev !== userId) {
      let anonItems: CartItem[] = [];
      try {
        const stored = localStorage.getItem(storageKey);
        anonItems = stored ? (JSON.parse(stored) as CartItem[]) : [];
      } catch {
        anonItems = [];
      }
      await mergeAnonymousCartIntoUser(userId, token, anonItems);
      await loadRemoteCart();
      previousUserIdRef.current = userId;
      return;
    }

    // Same user: just refresh remote cart
    await loadRemoteCart();
  };

  const addItem = async (product: products, quantity = 1) => {
    const productId = getProductId(product);
    const { userId, token } = getAuth();
    if (userId && token) {
      try {
        await editProductQuantity(userId, productId, quantity, token);
        await loadRemoteCart();
      } catch (error) {
        console.error("Failed to add item", error);
      }
    } else {
      setItems((previous) => {
        const existing = previous.find((item) => item.productId === productId);
        if (existing) {
          return previous.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...previous, { productId, product, quantity }];
      });
    }
    setToast({ id: Date.now(), message: `${product.title} added to cart` });
  };

  const removeItem = async (productId: string) => {
    const { userId, token } = getAuth();
    if (userId && token) {
      const current = items.find((i) => i.productId === productId);
      const currentQty = current?.quantity ?? 0;
      if (currentQty > 0) {
        try {
          await editProductQuantity(userId, productId, -currentQty, token);
          await loadRemoteCart();
        } catch (error) {
          console.error("Failed to remove item", error);
        }
      }
    }
    setItems((previous) =>
      previous.filter((item) => item.productId !== productId)
    );
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 0) return;
    const current = items.find((i) => i.productId === productId);
    const currentQty = current?.quantity ?? 0;
    const delta = quantity - currentQty;
    if (delta === 0) return;

    const { userId, token } = getAuth();
    if (userId && token) {
      try {
        await editProductQuantity(userId, productId, delta, token);
        await loadRemoteCart();
      } catch (error) {
        console.error("Failed to update quantity", error);
      }
    }

    setItems((previous) =>
      previous
        .map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = async () => {
    const { userId, token } = getAuth();
    if (userId && token) {
      try {
        await deleteFullCart(userId, token);
      } catch (error) {
        console.error("Failed to clear cart", error);
      }
    }
    setItems([]);
    localStorage.removeItem(storageKey);
  };

  const checkout = async () => {
    const { userId, token } = getAuth();
    if (userId && token) {
      try {
        await buyCart(userId, token);
        // Don't clear cart - backend handles the purchase
      } catch (error) {
        console.error("Failed to buy cart", error);
        throw error; // Re-throw so CheckoutForms can handle it
      }
    } else {
      throw new Error("User not authenticated");
    }
  };

  useEffect(() => {
    handleAuthChange();
    const onStorage = (event: StorageEvent) => {
      if (event.key === userKey || event.key === tokenKey || event.key === storageKey) {
        handleAuthChange();
      }
    };
    window.addEventListener("storage", onStorage);
    const interval = window.setInterval(() => {
      const { userId, token } = getAuth();
      const snapshot = lastAuthSnapshot.current;
      if (userId !== snapshot.userId || token !== snapshot.token) {
        handleAuthChange();
      }
    }, 1000);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    checkout,
    subtotal,
    totalItems,
    loading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && (
        <div className="fixed top-24 right-6 z-50">
          <div className="bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
            <IoCartOutline className="text-xl" />
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

