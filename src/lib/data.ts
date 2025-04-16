
// Mock data for our eCommerce application

// Product Categories
export const categories = [
  { id: 1, name: "Electronics", slug: "electronics", image: "/placeholder.svg" },
  { id: 2, name: "Clothing", slug: "clothing", image: "/placeholder.svg" },
  { id: 3, name: "Home & Kitchen", slug: "home-kitchen", image: "/placeholder.svg" },
  { id: 4, name: "Beauty", slug: "beauty", image: "/placeholder.svg" },
  { id: 5, name: "Sports", slug: "sports", image: "/placeholder.svg" },
  { id: 6, name: "Books", slug: "books", image: "/placeholder.svg" },
  { id: 7, name: "Toys", slug: "toys", image: "/placeholder.svg" },
  { id: 8, name: "Jewelry", slug: "jewelry", image: "/placeholder.svg" },
];

// Brands
export const brands = [
  { id: 1, name: "Apple", slug: "apple" },
  { id: 2, name: "Samsung", slug: "samsung" },
  { id: 3, name: "Nike", slug: "nike" },
  { id: 4, name: "Adidas", slug: "adidas" },
  { id: 5, name: "Sony", slug: "sony" },
  { id: 6, name: "LG", slug: "lg" },
  { id: 7, name: "Zara", slug: "zara" },
  { id: 8, name: "H&M", slug: "hm" },
];

// Products
export const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",
    price: 129.99,
    discountPrice: 99.99,
    rating: 4.5,
    reviewCount: 120,
    inStock: true,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    categoryId: 1,
    brandId: 1,
    description: "High-quality wireless headphones with noise cancellation and 20-hour battery life.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: ["Black", "White", "Blue"],
    sizes: [],
    variants: [
      { id: 1, color: "Black", size: null, price: 99.99, inStock: true },
      { id: 2, color: "White", size: null, price: 99.99, inStock: true },
      { id: 3, color: "Blue", size: null, price: 99.99, inStock: false },
    ]
  },
  {
    id: 2,
    name: "Premium Slim Fit T-Shirt",
    slug: "premium-slim-fit-t-shirt",
    price: 29.99,
    discountPrice: null,
    rating: 4.2,
    reviewCount: 85,
    inStock: true,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    categoryId: 2,
    brandId: 3,
    description: "Comfortable, breathable cotton t-shirt with a modern slim fit design.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    colors: ["Black", "White", "Gray", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    variants: [
      { id: 4, color: "Black", size: "M", price: 29.99, inStock: true },
      { id: 5, color: "White", size: "L", price: 29.99, inStock: true },
      { id: 6, color: "Gray", size: "XL", price: 29.99, inStock: true },
    ]
  },
  {
    id: 3,
    name: "Smart 4K TV 55-inch",
    slug: "smart-4k-tv-55-inch",
    price: 699.99,
    discountPrice: 599.99,
    rating: 4.7,
    reviewCount: 230,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    categoryId: 1,
    brandId: 2,
    description: "55-inch 4K Ultra HD Smart TV with HDR and built-in streaming apps.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: ["Black"],
    sizes: [],
    variants: [
      { id: 7, color: "Black", size: null, price: 599.99, inStock: true },
    ]
  },
  {
    id: 4,
    name: "Professional Blender",
    slug: "professional-blender",
    price: 199.99,
    discountPrice: 169.99,
    rating: 4.4,
    reviewCount: 75,
    inStock: true,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    categoryId: 3,
    brandId: 6,
    description: "1000W professional-grade blender with multiple speed settings and pulse function.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    colors: ["Silver", "Black", "Red"],
    sizes: [],
    variants: [
      { id: 8, color: "Silver", size: null, price: 169.99, inStock: true },
      { id: 9, color: "Black", size: null, price: 169.99, inStock: true },
      { id: 10, color: "Red", size: null, price: 169.99, inStock: false },
    ]
  },
  {
    id: 5,
    name: "Running Shoes",
    slug: "running-shoes",
    price: 119.99,
    discountPrice: null,
    rating: 4.6,
    reviewCount: 142,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    categoryId: 5,
    brandId: 4,
    description: "Lightweight, breathable running shoes with responsive cushioning.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: ["Black", "Blue", "Red"],
    sizes: ["8", "9", "10", "11", "12"],
    variants: [
      { id: 11, color: "Black", size: "9", price: 119.99, inStock: true },
      { id: 12, color: "Blue", size: "10", price: 119.99, inStock: true },
      { id: 13, color: "Red", size: "11", price: 119.99, inStock: true },
    ]
  },
  {
    id: 6,
    name: "Luxury Face Cream",
    slug: "luxury-face-cream",
    price: 49.99,
    discountPrice: 39.99,
    rating: 4.3,
    reviewCount: 68,
    inStock: true,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    categoryId: 4,
    brandId: 7,
    description: "Hydrating face cream with anti-aging properties and natural ingredients.",
    images: ["/placeholder.svg"],
    colors: [],
    sizes: ["50ml", "100ml"],
    variants: [
      { id: 14, color: null, size: "50ml", price: 39.99, inStock: true },
      { id: 15, color: null, size: "100ml", price: 69.99, inStock: true },
    ]
  },
  {
    id: 7,
    name: "Classic Denim Jeans",
    slug: "classic-denim-jeans",
    price: 79.99,
    discountPrice: null,
    rating: 4.1,
    reviewCount: 95,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    categoryId: 2,
    brandId: 8,
    description: "Classic fit denim jeans with stretch comfort technology.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    colors: ["Blue", "Black"],
    sizes: ["30", "32", "34", "36"],
    variants: [
      { id: 16, color: "Blue", size: "32", price: 79.99, inStock: true },
      { id: 17, color: "Black", size: "34", price: 79.99, inStock: true },
    ]
  },
  {
    id: 8,
    name: "Best-selling Novel",
    slug: "best-selling-novel",
    price: 24.99,
    discountPrice: 19.99,
    rating: 4.8,
    reviewCount: 215,
    inStock: true,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    categoryId: 6,
    brandId: 5,
    description: "Award-winning fiction novel by a bestselling author.",
    images: ["/placeholder.svg"],
    colors: [],
    sizes: ["Hardcover", "Paperback", "eBook"],
    variants: [
      { id: 18, color: null, size: "Hardcover", price: 24.99, inStock: true },
      { id: 19, color: null, size: "Paperback", price: 14.99, inStock: true },
      { id: 20, color: null, size: "eBook", price: 9.99, inStock: true },
    ]
  },
  {
    id: 9,
    name: "Kids' Building Blocks Set",
    slug: "kids-building-blocks-set",
    price: 39.99,
    discountPrice: 29.99,
    rating: 4.5,
    reviewCount: 56,
    inStock: true,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    categoryId: 7,
    brandId: 4,
    description: "100-piece colorful building blocks set for children ages 3-8.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    colors: ["Multicolor"],
    sizes: [],
    variants: [
      { id: 21, color: "Multicolor", size: null, price: 29.99, inStock: true },
    ]
  },
  {
    id: 10,
    name: "Silver Pendant Necklace",
    slug: "silver-pendant-necklace",
    price: 89.99,
    discountPrice: null,
    rating: 4.6,
    reviewCount: 32,
    inStock: true,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    categoryId: 8,
    brandId: 5,
    description: "925 Sterling silver pendant necklace with an adjustable chain.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: ["Silver", "Gold"],
    sizes: [],
    variants: [
      { id: 22, color: "Silver", size: null, price: 89.99, inStock: true },
      { id: 23, color: "Gold", size: null, price: 119.99, inStock: true },
    ]
  },
  {
    id: 11,
    name: "Smartphone Flagship",
    slug: "smartphone-flagship",
    price: 999.99,
    discountPrice: 899.99,
    rating: 4.7,
    reviewCount: 320,
    inStock: true,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    categoryId: 1,
    brandId: 1,
    description: "Latest flagship smartphone with advanced camera system and all-day battery life.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: ["Black", "Silver", "Gold"],
    sizes: ["128GB", "256GB", "512GB"],
    variants: [
      { id: 24, color: "Black", size: "128GB", price: 899.99, inStock: true },
      { id: 25, color: "Silver", size: "256GB", price: 999.99, inStock: true },
      { id: 26, color: "Gold", size: "512GB", price: 1099.99, inStock: true },
    ]
  },
  {
    id: 12,
    name: "Gaming Console",
    slug: "gaming-console",
    price: 499.99,
    discountPrice: null,
    rating: 4.9,
    reviewCount: 187,
    inStock: false,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    categoryId: 1,
    brandId: 5,
    description: "Next-generation gaming console with 4K graphics and 1TB storage.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    colors: ["Black", "White"],
    sizes: [],
    variants: [
      { id: 27, color: "Black", size: null, price: 499.99, inStock: false },
      { id: 28, color: "White", size: null, price: 499.99, inStock: false },
    ]
  },
];

// Orders for current user
export const orders = [
  {
    id: "ORD-2023-1001",
    date: "2023-10-15",
    status: "Delivered",
    total: 129.98,
    items: [
      { productId: 2, quantity: 2, price: 29.99 },
      { productId: 6, quantity: 1, price: 49.99 },
      { productId: 8, quantity: 1, price: 19.99 }
    ],
    shipping: {
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-2023-1042",
    date: "2023-11-02",
    status: "Shipped",
    total: 699.99,
    items: [
      { productId: 3, quantity: 1, price: 599.99 },
      { productId: 6, quantity: 2, price: 39.99 }
    ],
    shipping: {
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    paymentMethod: "PayPal"
  },
  {
    id: "ORD-2023-1087",
    date: "2023-11-20",
    status: "Processing",
    total: 1299.97,
    items: [
      { productId: 11, quantity: 1, price: 899.99 },
      { productId: 5, quantity: 2, price: 119.99 },
      { productId: 10, quantity: 1, price: 89.99 }
    ],
    shipping: {
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    paymentMethod: "Credit Card"
  }
];

// Stats for admin dashboard
export const adminStats = {
  totalSales: 152648.75,
  totalOrders: 1254,
  totalUsers: 842,
  totalProducts: 136,
  recentSales: [
    { date: "Jan", amount: 12480 },
    { date: "Feb", amount: 15690 },
    { date: "Mar", amount: 18420 },
    { date: "Apr", amount: 14280 },
    { date: "May", amount: 16930 },
    { date: "Jun", amount: 19870 },
    { date: "Jul", amount: 21240 },
    { date: "Aug", amount: 19350 },
    { date: "Sep", amount: 17650 },
    { date: "Oct", amount: 18790 },
    { date: "Nov", amount: 21480 },
    { date: "Dec", amount: 23140 }
  ],
  topProducts: [
    { name: "Smartphone Flagship", sales: 284 },
    { name: "Smart 4K TV 55-inch", sales: 207 },
    { name: "Wireless Bluetooth Headphones", sales: 182 },
    { name: "Running Shoes", sales: 156 }
  ]
};

// Users data for admin
export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    joinDate: "2023-01-15",
    orders: 12,
    totalSpent: 1245.80
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    joinDate: "2023-02-20",
    orders: 8,
    totalSpent: 876.50
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    joinDate: "2022-12-10",
    orders: 0,
    totalSpent: 0
  },
  {
    id: 4,
    name: "Michael Johnson",
    email: "michael@example.com",
    role: "user",
    joinDate: "2023-03-05",
    orders: 5,
    totalSpent: 432.25
  },
  {
    id: 5,
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "user",
    joinDate: "2023-04-18",
    orders: 15,
    totalSpent: 1867.40
  }
];

// Coupons for admin
export const coupons = [
  {
    id: 1,
    code: "SUMMER2023",
    discount: 15, // percentage
    type: "percentage",
    validUntil: "2023-08-31",
    isActive: false,
    minimumPurchase: 50
  },
  {
    id: 2,
    code: "WELCOME10",
    discount: 10, // percentage
    type: "percentage",
    validUntil: "2023-12-31",
    isActive: true,
    minimumPurchase: 0
  },
  {
    id: 3,
    code: "FREESHIP",
    discount: 15, // fixed amount
    type: "fixed",
    validUntil: "2023-12-31",
    isActive: true,
    minimumPurchase: 75
  }
];

// Current user mock data (logged in user)
export const currentUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "user",
  addresses: [
    {
      id: 1,
      name: "John Doe",
      street: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      phone: "555-123-4567",
      isDefault: true
    },
    {
      id: 2,
      name: "John Doe",
      street: "456 Work Ave, Suite 200",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "USA",
      phone: "555-987-6543",
      isDefault: false
    }
  ],
  wishlist: [1, 5, 10, 11]
};

// Cart data
export const cart = {
  items: [
    {
      productId: 1,
      variantId: 1,
      quantity: 1, 
      color: "Black",
      size: null,
      price: 99.99,
      name: "Wireless Bluetooth Headphones",
      image: "/placeholder.svg"
    },
    {
      productId: 5,
      variantId: 11,
      quantity: 2,
      color: "Black",
      size: "9",
      price: 119.99,
      name: "Running Shoes",
      image: "/placeholder.svg"
    }
  ],
  subtotal: 339.97,
  shipping: 15.00,
  tax: 28.90,
  total: 383.87
};

// Reviews
export const reviews = [
  {
    id: 1,
    productId: 1,
    userId: 2,
    userName: "Jane Smith",
    rating: 5,
    title: "Excellent sound quality!",
    comment: "These headphones have amazing noise cancellation and the battery life is impressive. Definitely worth the price!",
    date: "2023-08-15",
    helpful: 24
  },
  {
    id: 2,
    productId: 1,
    userId: 4,
    userName: "Michael Johnson",
    rating: 4,
    title: "Great headphones, but a bit tight",
    comment: "Sound quality is fantastic and they look premium. My only complaint is they get a bit uncomfortable after several hours of use.",
    date: "2023-09-20",
    helpful: 12
  },
  {
    id: 3,
    productId: 1,
    userId: 5,
    userName: "Sarah Williams",
    rating: 5,
    title: "Perfect for work calls",
    comment: "The noise cancellation makes these perfect for work from home. Everyone can hear me clearly and I'm not distracted by background noise.",
    date: "2023-10-05",
    helpful: 8
  }
];

// Shipping methods
export const shippingMethods = [
  {
    id: 1,
    name: "Standard Shipping",
    price: 15.00,
    estimatedDays: "3-5 business days"
  },
  {
    id: 2,
    name: "Express Shipping",
    price: 25.00,
    estimatedDays: "1-2 business days"
  },
  {
    id: 3,
    name: "Free Shipping",
    price: 0,
    estimatedDays: "5-7 business days",
    minimumOrder: 150.00
  }
];

// Payment methods
export const paymentMethods = [
  {
    id: 1,
    name: "Credit Card",
    icon: "credit-card"
  },
  {
    id: 2,
    name: "PayPal",
    icon: "paypal"
  },
  {
    id: 3,
    name: "Apple Pay",
    icon: "apple"
  },
  {
    id: 4,
    name: "Google Pay",
    icon: "google"
  }
];
