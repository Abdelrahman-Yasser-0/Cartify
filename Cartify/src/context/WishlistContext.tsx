import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { FiHeart } from "react-icons/fi";
import { products } from "../pages/types";
import {
  addToWishlist,
  enrichWishlistEntries,
  fetchUserWishlist,
  removeFromWishlist,
} from "../api/wishlistApi";

type WishlistContextValue = {
  items: products[];
  addItem: (product: products) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
  loading: boolean;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

const storageKey = "cartify.wishlist.v1";
const userKey = "user";
const tokenKey = "token";

const getProductId = (product: products) =>
  product.id || product.sku || product.title;

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<products[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? (JSON.parse(stored) as products[]) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);

  const getInitialUserId = () => {
    if (typeof window === "undefined") return null;
    try {
      const userRaw = localStorage.getItem(userKey);
      const user = userRaw ? JSON.parse(userRaw) : null;
      return user?._id || user?.id || null;
    } catch {
      return null;
    }
  };
  const previousUserIdRef = useRef<string | null>(getInitialUserId());
  const lastAuthSnapshot = useRef<{ userId: string | null; token: string | null }>({
    userId: null,
    token: null,
  });
  const [toast, setToast] = useState<{ id: number; message: string; type: 'add' | 'remove' } | null>(
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

  const loadRemoteWishlist = async () => {
    const { userId, token } = getAuth();
    if (!userId || !token) return;
    setLoading(true);
    try {
      const productIds = await fetchUserWishlist(token);
      const hydrated = await enrichWishlistEntries(productIds);
      setItems(hydrated);
      localStorage.setItem(storageKey, JSON.stringify(hydrated));
    } catch (error) {
      console.error("Failed to load wishlist", error);
      // If user not found or auth error, clear local storage
      if (error instanceof Error && (error.message.includes("User not found") || error.message.includes("404"))) {
        setItems([]);
        localStorage.removeItem(storageKey);
      }
    } finally {
      setLoading(false);
    }
  };

  const mergeAnonymousWishlistIntoUser = async (
    token: string,
    anonItems: products[]
  ) => {
    if (!anonItems.length) return;
    try {
      // Try to add each item individually, ignoring "already exists" errors
      await Promise.allSettled(
        anonItems.map(async (item) => {
          try {
            await addToWishlist(getProductId(item), token);
          } catch (error) {
            // Ignore "already exists" errors, but log others
            if (error instanceof Error && !error.message.includes("already exists")) {
              console.error(`Failed to add ${item.title} to wishlist:`, error);
            }
          }
        })
      );
    } catch (error) {
      console.error("Failed to merge anonymous wishlist", error);
    } finally {
      localStorage.removeItem(storageKey);
    }
  };

  const handleAuthChange = async () => {
    const { userId, token } = getAuth();
    const prev = previousUserIdRef.current;
    lastAuthSnapshot.current = { userId, token };

    // Logout or no auth: clear wishlist
    if (!userId || !token) {
      if (prev) {
        setItems([]);
        localStorage.removeItem(storageKey);
      }
      previousUserIdRef.current = null;
      return;
    }

    // Login or user switch: merge anon wishlist then load remote
    if (!prev || prev !== userId) {
      let anonItems: products[] = [];
      try {
        const stored = localStorage.getItem(storageKey);
        anonItems = stored ? (JSON.parse(stored) as products[]) : [];
      } catch {
        anonItems = [];
      }
      try {
        await mergeAnonymousWishlistIntoUser(token, anonItems);
        await loadRemoteWishlist();
      } catch (error) {
        console.error("Failed to sync wishlist on auth change", error);
        // Keep local items if sync fails
      }
      previousUserIdRef.current = userId;
      return;
    }

    // Same user: just refresh remote wishlist (but don't fail if it errors)
    try {
      await loadRemoteWishlist();
    } catch (error) {
      console.error("Failed to refresh wishlist", error);
    }
  };

  const addItem = async (product: products) => {
    const productId = getProductId(product);
    const { userId, token } = getAuth();
    
    if (userId && token) {
      try {
        await addToWishlist(productId, token);
        await loadRemoteWishlist();
        setToast({ id: Date.now(), message: `${product.title} added to favorites`, type: 'add' });
      } catch (error) {
        console.error("Failed to add item to wishlist", error);
        // If product already exists, still show success (it's already in favorites)
        if (error instanceof Error && error.message.includes("already exists")) {
          setToast({ id: Date.now(), message: `${product.title} is already in favorites`, type: 'add' });
        }
      }
    } else {
      setItems((previous) => {
        const existing = previous.find((item) => getProductId(item) === productId);
        if (existing) {
          setToast({ id: Date.now(), message: `${product.title} is already in favorites`, type: 'add' });
          return previous;
        }
        setToast({ id: Date.now(), message: `${product.title} added to favorites`, type: 'add' });
        return [...previous, product];
      });
    }
  };

  const removeItem = async (productId: string) => {
    const { userId, token } = getAuth();
    const removedProduct = items.find((item) => getProductId(item) === productId);
    
    if (userId && token) {
      try {
        await removeFromWishlist(productId, token);
        await loadRemoteWishlist();
        if (removedProduct) {
          setToast({ id: Date.now(), message: `${removedProduct.title} removed from favorites`, type: 'remove' });
        }
      } catch (error) {
        console.error("Failed to remove item from wishlist", error);
      }
    } else {
      setItems((previous) =>
        previous.filter((item) => getProductId(item) !== productId)
      );
      if (removedProduct) {
        setToast({ id: Date.now(), message: `${removedProduct.title} removed from favorites`, type: 'remove' });
      }
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some((item) => getProductId(item) === productId);
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

  const totalItems = useMemo(() => items.length, [items]);

  const value: WishlistContextValue = {
    items,
    addItem,
    removeItem,
    isInWishlist,
    totalItems,
    loading,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
      {toast && (
        <div className="fixed top-24 right-6 z-50">
          <div className="bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
            <FiHeart className={`text-xl ${toast.type === 'add' ? 'fill-teal-400 text-teal-400' : ''}`} />
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

