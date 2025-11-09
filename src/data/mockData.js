// Mock data for the platform

export const users = [
  { id: 1, name: 'Anjali Devi', phone: '9876543210', password: 'password123', role: 'seller', village: 'Khajuraho', state: 'Madhya Pradesh' },
  { id: 2, name: 'Maya Kumari', phone: '9876543211', password: 'password123', role: 'seller', village: 'Ranchi', state: 'Jharkhand' },
  { id: 3, name: 'Priya Singh', phone: '9876543212', password: 'password123', role: 'seller', village: 'Varanasi', state: 'Uttar Pradesh' },
  { id: 6, name: 'Neha Patel', phone: '9876543220', password: 'password123', role: 'buyer', state: 'Maharashtra' },
  { id: 11, name: 'Dr. Sunita Menon', phone: '9876543230', password: 'password123', role: 'ngo', state: 'Kerala' },
];

export const products = [
  {
    id: 1,
    name: 'Reusable Pad',
    description: 'Eco-friendly cloth pad, washable and reusable for up to 2 years',
    price: 130,
    category: 'reusable_pad',
    stock: 100,
    sellerId: 1,
    sellerName: 'Anjali Devi'
  },
  {
    id: 2,
    name: 'Menstrual Cup',
    description: 'Medical grade silicone menstrual cup, lasts up to 10 years',
    price: 300,
    category: 'menstrual_cup',
    stock: 50,
    sellerId: 1,
    sellerName: 'Anjali Devi'
  },
  {
    id: 3,
    name: 'Period Underwear',
    description: 'Leak-proof period underwear, comfortable and washable',
    price: 250,
    category: 'period_underwear',
    stock: 75,
    sellerId: 2,
    sellerName: 'Maya Kumari'
  },
  {
    id: 4,
    name: 'Oridet Underwear',
    description: 'Premium period underwear with extra absorbency',
    price: 250,
    category: 'period_underwear',
    stock: 60,
    sellerId: 2,
    sellerName: 'Maya Kumari'
  },
  {
    id: 5,
    name: 'Cotton Reusable Pad',
    description: 'Soft cotton reusable pad for comfortable protection',
    price: 120,
    category: 'reusable_pad',
    stock: 110,
    sellerId: 3,
    sellerName: 'Priya Singh'
  },
];

export const orders = [
  {
    id: 1,
    orderNumber: 'ORD001',
    buyerId: 6,
    buyerName: 'Neha Patel',
    sellerId: 1,
    sellerName: 'Anjali Devi',
    productId: 1,
    productName: 'Reusable Pad',
    quantity: 50,
    totalAmount: 6500,
    customerName: 'Neha Patel',
    deliveryAddress: '123 Main St, Mumbai, Maharashtra',
    status: 'delivered',
    orderDate: '2025-10-15T10:30:00'
  },
  {
    id: 2,
    orderNumber: 'ORD002',
    buyerId: 6,
    buyerName: 'Neha Patel',
    sellerId: 1,
    sellerName: 'Anjali Devi',
    productId: 2,
    productName: 'Menstrual Cup',
    quantity: 20,
    totalAmount: 6000,
    customerName: 'Neha Patel',
    deliveryAddress: '123 Main St, Mumbai, Maharashtra',
    status: 'delivered',
    orderDate: '2025-10-20T14:20:00'
  },
  {
    id: 3,
    orderNumber: 'ORD003',
    buyerId: 6,
    buyerName: 'Ritu Malhotra',
    sellerId: 2,
    sellerName: 'Maya Kumari',
    productId: 3,
    productName: 'Period Underwear',
    quantity: 30,
    totalAmount: 7500,
    customerName: 'Ritu Malhotra',
    deliveryAddress: '456 Park Ave, Delhi',
    status: 'delivered',
    orderDate: '2025-10-25T09:15:00'
  },
  {
    id: 4,
    orderNumber: 'ORD004',
    buyerId: 6,
    buyerName: 'Ritu Malhotra',
    sellerId: 2,
    sellerName: 'Maya Kumari',
    productId: 4,
    productName: 'Oridet Underwear',
    quantity: 15,
    totalAmount: 3750,
    customerName: 'Ritu Malhotra',
    deliveryAddress: '456 Park Ave, Delhi',
    status: 'delivered',
    orderDate: '2025-11-01T11:45:00'
  },
  {
    id: 5,
    orderNumber: 'ORD005',
    buyerId: 6,
    buyerName: 'Kavita Reddy',
    sellerId: 3,
    sellerName: 'Priya Singh',
    productId: 5,
    productName: 'Cotton Reusable Pad',
    quantity: 25,
    totalAmount: 3000,
    customerName: 'Kavita Reddy',
    deliveryAddress: '789 Lake View, Hyderabad, Telangana',
    status: 'shipped',
    orderDate: '2025-11-02T16:30:00'
  },
];

export const transactions = [
  { id: 1, orderId: 1, sellerId: 1, sellerName: 'Anjali Devi', amount: 6500, commission: 650, netEarning: 5850, date: '2025-10-15', status: 'completed' },
  { id: 2, orderId: 2, sellerId: 1, sellerName: 'Anjali Devi', amount: 6000, commission: 600, netEarning: 5400, date: '2025-10-20', status: 'completed' },
  { id: 3, orderId: 3, sellerId: 2, sellerName: 'Maya Kumari', amount: 7500, commission: 750, netEarning: 6750, date: '2025-10-25', status: 'completed' },
  { id: 4, orderId: 4, sellerId: 2, sellerName: 'Maya Kumari', amount: 3750, commission: 375, netEarning: 3375, date: '2025-11-01', status: 'completed' },
  { id: 5, orderId: 5, sellerId: 3, sellerName: 'Priya Singh', amount: 3000, commission: 300, netEarning: 2700, date: '2025-11-02', status: 'pending' },
];

export const courses = [
  {
    id: 1,
    title: 'Reusable Pads Manufacturing',
    description: 'Learn how to manufacture high-quality reusable sanitary pads',
    category: 'Manufacturing',
    duration: 20
  },
  {
    id: 2,
    title: 'Social Enterprise Basics',
    description: 'Discover how to create and manage businesses for menstrual health',
    category: 'Business',
    duration: 15
  },
  {
    id: 3,
    title: 'Marketing Your Products',
    description: 'Learn effective marketing strategies for menstrual health products',
    category: 'Marketing',
    duration: 10
  },
];

export const platformMetrics = {
  totalSellers: 5,
  totalBuyers: 5,
  totalOrders: 10,
  totalRevenue: 43410,
  activeSellers: 5,
  productsSold: 240,
};

