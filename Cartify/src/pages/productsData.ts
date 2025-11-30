import { products } from "./types";

export const productsData: products[] = [
  // 1. Headphones (Featured & Best Seller)
  {
    id: "1",
    title: "Premium Wireless Headphones",
    brand: "SoundMax",
    rate: "4.8 (1247)",
    price: 299.99,
    originalPrice: 349.99,
    discount: 14,
    imgurl:
      "https://images.unsplash.com/photo-1757946718516-fddeb8d3ed9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sku: "AUD-HP-001",
    category: "Audio",
    colors: ["Black", "Silver", "Blue"],
    shortDescription:
      "Experience crystal-clear sound with active noise cancellation.",
    description: "Full description here...",
    specifications: { Connectivity: "Bluetooth 5.0" },
    reviews: [],
    stock: 25,
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
  },
  // 2. Watch (Featured & Best Seller)
  {
    id: "2",
    title: "Smart Fitness Watch Ultra",
    brand: "FitTrack",
    rate: "4.9 (2134)",
    price: 399.99,
    originalPrice: 449.99,
    discount: 11,
    imgurl:
      "https://images.unsplash.com/photo-1713989635340-b25bfc893f74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sku: "FIT-WT-002",
    category: "Wearables",
    colors: ["Black", "Silver"],
    shortDescription:
      "Track your fitness goals with advanced health monitoring.",
    description: "Full description here...",
    specifications: { GPS: "Yes" },
    reviews: [],
    stock: 40,
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
  },
  // 3. Laptop (Featured)
  {
    id: "3",
    title: "Ultra Slim Laptop Pro 15",
    brand: "TechBook",
    rate: "4.7 (516)",
    price: 1299.99,
    originalPrice: 1499.99,
    discount: 13,
    imgurl:
      "https://images.unsplash.com/flagged/photo-1576697010739-6373b63f3204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sku: "LAP-TB-003",
    category: "Computers",
    colors: ["Silver"],
    shortDescription: "Powerful performance in an ultra-slim design.",
    description: "Full description here...",
    specifications: { Processor: "i7" },
    reviews: [],
    stock: 15,
    inStock: true,
    isFeatured: true,
  },
  // 4. Phone (Featured & Best Seller)
  {
    id: "4",
    title: "5G Smartphone Pro Max",
    brand: "TechPhone",
    rate: "4.8 (1856)",
    price: 999.99,
    originalPrice: 1099.99,
    discount: 9,
    imgurl:
      "https://images.unsplash.com/photo-1675953935267-e039f13ddd79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sku: "PHN-TP-004",
    category: "Electronics",
    colors: ["Black", "Blue"],
    shortDescription: "Next-gen 5G connectivity with pro camera system.",
    description: "Full description here...",
    specifications: { Storage: "256GB" },
    reviews: [],
    stock: 30,
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
  },
  // 5. Keyboard (Best Seller) - NEW FROM IMAGE
  {
    id: "5",
    title: "RGB Mechanical Gaming Keyboard",
    brand: "GameTech",
    rate: "4.8 (1156)",
    price: 149.99,
    imgurl:
      "https://images.unsplash.com/photo-1643869094356-4dc3f74f22eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sku: "GT-KB-005",
    category: "Gaming",
    colors: ["Black"],
    shortDescription: "Tactile switches with customizable RGB lighting.",
    description: "Full description here...",
    specifications: { Switch: "Cherry MX Red" },
    reviews: [],
    stock: 50,
    inStock: true,
    isBestSeller: true,
  },
  // 6. Earbuds (New Arrival) - NEW FROM IMAGE
  {
    id: "6",
    title: "True Wireless Earbuds Pro",
    brand: "SoundMax",
    rate: "4.6 (897)",
    price: 179.99,
    imgurl:
      "https://images.unsplash.com/photo-1755182529034-189a6051faae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sku: "AUD-EB-006",
    category: "Audio",
    colors: ["White"],
    shortDescription: "Immersive sound with all-day battery life.",
    description: "Full description here...",
    specifications: { Battery: "24h" },
    reviews: [],
    stock: 100,
    inStock: true,
    isNew: true,
  },
  // 7. Camera (New Arrival) - NEW FROM IMAGE
  {
    id: "7",
    title: "Professional Mirrorless Camera",
    brand: "ProShot",
    rate: "5.0 (328)",
    price: 2499.99,
    imgurl:
      "https://images.unsplash.com/photo-1729857001644-ade54ca81f53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sku: "CAM-PS-007",
    category: "Photography",
    colors: ["Black"],
    shortDescription: "Capture stunning 8K video and 45MP photos.",
    description: "Full description here...",
    specifications: { Sensor: "Full Frame" },
    reviews: [],
    stock: 5,
    inStock: true,
    isNew: true,
  },
  // 8. Mouse (New Arrival) - NEW FROM IMAGE
  {
    id: "8",
    title: "Wireless Gaming Mouse",
    brand: "GameTech",
    rate: "4.6 (972)",
    price: 89.99,
    imgurl:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sku: "GT-MS-008",
    category: "Gaming",
    colors: ["White"],
    shortDescription: "Ultra-low latency for competitive gaming.",
    description: "Full description here...",
    specifications: { DPI: "25000" },
    reviews: [],
    stock: 60,
    inStock: true,
    isNew: true,
  },
];
export const orders = [
  {
    id: "ORD-2024-1156",
    status: "Delivered",
    orderDate: "Nov 10, 2024",
    itemsCount: 3,
    expectedDate: "Nov 12, 2024",
    totalPrice: 284.99,
  },
  {
    id: "ORD-2024-1134",
    status: "Shipped",
    orderDate: "Nov 5, 2024",
    itemsCount: 1,
    expectedDate: "Nov 15, 2024",
    totalPrice: 89.99,
  },
  {
    id: "ORD-2024-1098",
    status: "Processing",
    orderDate: "Oct 28, 2024",
    itemsCount: 2,
    expectedDate: "Nov 18, 2024",
    totalPrice: 156.47,
  },
  {
    id: "ORD-2024-1067",
    status: "Delivered",
    orderDate: "Oct 15, 2024",
    itemsCount: 5,
    expectedDate: "Oct 18, 2024",
    totalPrice: 429.99,
  },
  {
    id: "ORD-2024-1023",
    status: "Delivered",
    orderDate: "Oct 3, 2024",
    itemsCount: 1,
    expectedDate: "Oct 6, 2024",
    totalPrice: 67.5,
  },
];

export const orderDetails = {
  id: "ORD-2024-1156",
  status: "Delivered",
  placedAt: "Nov 10, 2024",
  expectedAt: "Nov 12, 2024",

  // User Info
  shippingAddress: {
    name: "Abdelrahman Yasser",
    street: "123 Main Street",
    city: "New Cairo",
    country: "Egypt",
    phone: "+20 101 234 5678",
  },

  // Payment Info
  paymentMethod: {
    type: "Credit Card",
    last4: "4242",
    brand: "Visa",
  },

  // The Products in this order
  items: [
    {
      id: 1,
      name: "Sony WH-1000XM4 Noise Cancelling Headphones",
      brand: "Sony",
      price: 249.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Apple AirTag (4 Pack)",
      brand: "Apple",
      price: 29.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1621259020476-e2b21b2d0764?q=80&w=1000&auto=format&fit=crop",
    },
  ],

  // Money breakdown
  summary: {
    subtotal: 278.99,
    discount: 0,
    shipping: 10.0,
    tax: 30.0,
    total: 318.99,
  },
};
