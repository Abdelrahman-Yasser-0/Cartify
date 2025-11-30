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
    description:
      "Immerse yourself in premium audio with the SoundMax Premium Wireless Headphones. Featuring advanced active noise cancellation technology, these headphones create a personal sound sanctuary by blocking out ambient noise. The Bluetooth 5.0 connectivity ensures stable, high-quality audio streaming with minimal latency. Engineered with premium drivers that deliver rich bass, crisp highs, and balanced mids across all music genres. The ergonomic design with plush memory foam ear cushions provides exceptional comfort for extended listening sessions. With up to 30 hours of battery life and quick charge technology, you'll never miss a beat. The intuitive touch controls allow you to manage playback, adjust volume, and answer calls effortlessly. Perfect for music lovers, professionals, and travelers seeking the ultimate audio experience.",
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
    description:
      "Take control of your health and fitness journey with the FitTrack Smart Fitness Watch Ultra. This advanced wearable device features comprehensive health monitoring including heart rate tracking, blood oxygen levels, sleep analysis, and stress monitoring. The built-in GPS accurately tracks your outdoor activities, distance, pace, and routes without needing your phone. With over 50 workout modes, from running and cycling to swimming and yoga, you can track virtually any activity. The vibrant AMOLED display is always-on and easily readable in any lighting condition. Stay connected with smart notifications, music control, and contactless payments. The durable design is water-resistant up to 50 meters, making it perfect for swimming and water sports. With up to 7 days of battery life and rapid charging, you can focus on your fitness goals without interruption. Whether you're a beginner or a professional athlete, this watch adapts to your lifestyle and helps you achieve your wellness objectives.",
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
    description:
      "Experience the perfect balance of power and portability with the TechBook Ultra Slim Laptop Pro 15. This premium laptop features the latest Intel Core i7 processor, delivering exceptional performance for demanding tasks like video editing, software development, and multitasking. The stunning 15-inch Retina display with True Tone technology provides vibrant colors and sharp details, making it ideal for creative professionals. With 16GB of unified memory and lightning-fast SSD storage, applications launch instantly and files transfer in seconds. The ultra-slim aluminum chassis is both lightweight and durable, weighing just 3.5 pounds while maintaining a premium feel. The backlit Magic Keyboard offers a comfortable typing experience, and the large Force Touch trackpad provides precise cursor control. With all-day battery life of up to 18 hours, you can work from anywhere without worrying about power. Multiple Thunderbolt 4 ports ensure fast data transfer and support for external displays. Whether you're working on the go or at your desk, this laptop delivers professional-grade performance in a beautifully designed package.",
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
    description:
      "Step into the future of mobile technology with the TechPhone 5G Smartphone Pro Max. This flagship device features cutting-edge 5G connectivity, delivering lightning-fast download speeds and seamless streaming. The revolutionary triple-camera system includes a 108MP main sensor, ultra-wide lens, and telephoto lens with 10x optical zoom, capturing stunning photos and videos in any lighting condition. The advanced Night Mode and ProRAW capabilities give you professional-grade photography tools in your pocket. The 6.7-inch Super Retina XDR display with ProMotion technology offers buttery-smooth 120Hz refresh rates and incredible color accuracy. Powered by the latest A-series chip, this phone handles the most demanding apps and games with ease. With 256GB of storage, you'll have plenty of space for photos, videos, and apps. The all-day battery life with fast charging and wireless charging keeps you connected throughout your day. The premium glass and aluminum construction feels luxurious in hand, while the IP68 water and dust resistance ensures durability. Experience the perfect combination of innovation, performance, and style.",
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
    description:
      "Elevate your gaming experience with the GameTech RGB Mechanical Gaming Keyboard. Featuring premium Cherry MX Red switches, this keyboard delivers smooth, linear keystrokes perfect for gaming and typing. The switches are rated for 50 million keystrokes, ensuring long-lasting reliability. The fully customizable RGB backlighting with 16.8 million color options allows you to create stunning lighting effects that match your setup. The per-key RGB customization lets you assign different colors to specific keys for better game awareness. The durable aluminum frame provides stability during intense gaming sessions, while the detachable USB-C cable offers easy portability. The keyboard includes dedicated media controls, a volume roller, and programmable macro keys for advanced customization. The ergonomic design with adjustable feet reduces wrist strain during extended gaming sessions. Compatible with Windows and Mac, this keyboard works seamlessly with popular gaming software for advanced customization. Whether you're a competitive esports player or a casual gamer, this keyboard delivers the precision and responsiveness you need to dominate the competition.",
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
    description:
      "Discover true wireless freedom with the SoundMax True Wireless Earbuds Pro. These premium earbuds deliver exceptional sound quality with deep bass, clear mids, and crisp highs thanks to custom-tuned 10mm dynamic drivers. The active noise cancellation technology blocks out ambient noise, allowing you to focus on your music, calls, or podcasts. With up to 24 hours of total battery life (8 hours in the earbuds plus 16 hours from the charging case), you can enjoy music all day long. The quick charge feature gives you 1 hour of playback with just 5 minutes of charging. The ergonomic design with multiple ear tip sizes ensures a secure, comfortable fit for all-day wear. The IPX7 water resistance rating protects against sweat and rain, making them perfect for workouts and outdoor activities. Advanced beamforming microphones with noise reduction ensure crystal-clear phone calls even in noisy environments. The intuitive touch controls let you manage playback, adjust volume, and activate your voice assistant with simple taps. With seamless pairing and automatic device switching, these earbuds adapt to your lifestyle. Experience premium audio quality and convenience in a compact, stylish design.",
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
    description:
      "Unleash your creative potential with the ProShot Professional Mirrorless Camera. This cutting-edge camera features a full-frame 45MP sensor that captures incredible detail and dynamic range, perfect for professional photography and videography. Record stunning 8K video at 30fps or 4K at 120fps for smooth slow-motion footage. The advanced autofocus system with 693 phase-detection points ensures sharp focus even on fast-moving subjects. The in-body image stabilization (IBIS) provides up to 5 stops of stabilization, allowing you to shoot handheld in challenging lighting conditions. The electronic viewfinder with 5.76 million dots offers a bright, clear preview of your shots. With dual memory card slots and fast write speeds, you'll never miss a moment. The weather-sealed magnesium alloy body protects against dust and moisture, making it reliable in any environment. The camera supports a wide range of professional lenses through its versatile mount system. Whether you're shooting landscapes, portraits, sports, or cinematic videos, this camera delivers exceptional image quality and professional-grade performance. Perfect for photographers and videographers who demand the best.",
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
    description:
      "Dominate the competition with the GameTech Wireless Gaming Mouse, engineered for professional esports and competitive gaming. This precision gaming mouse features an ultra-responsive 25,000 DPI sensor with zero acceleration and zero smoothing, delivering pixel-perfect accuracy. The advanced 2.4GHz wireless technology provides ultra-low latency of just 1ms, matching or exceeding wired mouse performance. The lightweight design at just 69 grams reduces hand fatigue during extended gaming sessions, while the ergonomic shape fits comfortably in your palm. The premium optical switches are rated for 80 million clicks and provide tactile feedback with minimal actuation force. The mouse includes 8 programmable buttons that can be customized with macros and shortcuts through the intuitive software. The high-speed wireless charging dock keeps your mouse powered without interrupting your gameplay. The PTFE feet ensure smooth gliding across any surface, while the textured side grips provide secure control during intense moments. With up to 70 hours of battery life and RGB lighting that can be customized to match your setup, this mouse combines performance, comfort, and style. Whether you're playing FPS, MOBA, or MMO games, this mouse gives you the competitive edge you need to win.",
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
