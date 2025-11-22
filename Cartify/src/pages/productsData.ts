import { products } from "./types";

export const productsData: products[] = [
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
      "Experience crystal-clear sound with active noise cancellation and 30-hour battery life.",
    description:
      "Experience crystal-clear sound with active noise cancellation and 30-hour battery life. This premium product combines cutting-edge technology with elegant design. Perfect for professionals and enthusiasts alike, it delivers exceptional performance in a sleek, modern package.",
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Connectivity: "Bluetooth 5.0, 3.5mm Jack",
      Weight: "250g",
      "Noise Cancellation": "Active",
    },
    reviews: [
      {
        author: "John Doe",
        rating: 5,
        comment:
          "Excellent sound quality and comfortable to wear for long periods.",
        date: "2024-01-15",
      },
      {
        author: "Jane Smith",
        rating: 4,
        comment: "Great headphones, but the battery could last a bit longer.",
        date: "2024-01-20",
      },
    ],
    inStock: true,
  },
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
    colors: ["Black", "Silver", "Rose Gold"],
    shortDescription:
      "Track your fitness goals with advanced health monitoring and GPS tracking.",
    description:
      "Track your fitness goals with advanced health monitoring and GPS tracking. This smartwatch features a comprehensive suite of health metrics, including heart rate monitoring, sleep tracking, and workout detection. Stay connected with notifications and music control.",
    specifications: {
      Display: "1.4 inch AMOLED",
      "Battery Life": "7 days",
      "Water Resistance": "5 ATM",
      GPS: "Built-in",
      "Heart Rate Monitor": "Yes",
      "Sleep Tracking": "Yes",
      Compatibility: "iOS & Android",
    },
    reviews: [
      {
        author: "Mike Johnson",
        rating: 5,
        comment: "Best fitness watch I've ever owned. Highly recommend!",
        date: "2024-02-01",
      },
    ],
    inStock: true,
  },
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
    colors: ["Silver", "Space Gray"],
    shortDescription:
      "Powerful performance in an ultra-slim design with stunning display quality.",
    description:
      "Powerful performance in an ultra-slim design with stunning display quality. This laptop features the latest processor technology, ample storage, and a beautiful high-resolution display. Perfect for professionals who need power and portability.",
    specifications: {
      Processor: "Intel Core i7 12th Gen",
      RAM: "16GB",
      Storage: "512GB SSD",
      Display: "15.6 inch 4K",
      Graphics: "Integrated",
      "Battery Life": "10 hours",
      Weight: "1.5kg",
    },
    reviews: [
      {
        author: "Sarah Williams",
        rating: 5,
        comment: "Fast, lightweight, and beautiful. Perfect for my work!",
        date: "2024-02-10",
      },
    ],
    inStock: true,
  },
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
    colors: ["Black", "White", "Blue", "Purple"],
    shortDescription:
      "Next-generation smartphone with advanced camera system and lightning-fast 5G connectivity.",
    description:
      "Next-generation smartphone with advanced camera system and lightning-fast 5G connectivity. Featuring a powerful processor, stunning display, and professional-grade cameras, this device delivers an exceptional mobile experience.",
    specifications: {
      Display: "6.7 inch OLED",
      Processor: "Snapdragon 8 Gen 2",
      RAM: "12GB",
      Storage: "256GB",
      Camera: "108MP Triple Camera",
      Battery: "5000mAh",
      Charging: "Fast Wireless",
    },
    reviews: [
      {
        author: "David Lee",
        rating: 5,
        comment: "Amazing camera quality and super fast performance!",
        date: "2024-02-15",
      },
    ],
    inStock: true,
  },
];
