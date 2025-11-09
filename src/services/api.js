// API Service for Menstrual Health & Hygiene Marketplace

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

// Helper function to set auth token
const setAuthToken = (token) => {
  localStorage.setItem('access_token', token);
};

// Helper function to remove auth token
const removeAuthToken = () => {
  localStorage.removeItem('access_token');
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'An error occurred');
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ==================== Authentication ====================

export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.access_token) {
      setAuthToken(response.access_token);
    }
    
    return response;
  },

  // Login user
  login: async (phone, password) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
    });
    
    if (response.access_token) {
      setAuthToken(response.access_token);
    }
    
    return response;
  },

  // Logout user
  logout: () => {
    removeAuthToken();
  },

  // Get current user info
  getCurrentUser: async () => {
    return await apiRequest('/auth/me');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!getAuthToken();
  },
};

// ==================== Products ====================

export const productsAPI = {
  // Get all products or filter by seller
  getProducts: async (sellerId = null) => {
    const endpoint = sellerId ? `/products?seller_id=${sellerId}` : '/products';
    return await apiRequest(endpoint);
  },

  // Get product by ID
  getProduct: async (productId) => {
    return await apiRequest(`/products/${productId}`);
  },

  // Create new product (seller only)
  createProduct: async (productData) => {
    return await apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  // Update product (seller only)
  updateProduct: async (productId, productData) => {
    return await apiRequest(`/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  // Delete product (seller only)
  deleteProduct: async (productId) => {
    return await apiRequest(`/products/${productId}`, {
      method: 'DELETE',
    });
  },
};

// ==================== Orders ====================

export const ordersAPI = {
  // Get orders (filtered by user role)
  getOrders: async () => {
    return await apiRequest('/orders');
  },

  // Get order by ID
  getOrder: async (orderId) => {
    return await apiRequest(`/orders/${orderId}`);
  },

  // Create new order (buyer only)
  createOrder: async (orderData) => {
    return await apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  // Update order status (seller only)
  updateOrderStatus: async (orderId, status) => {
    return await apiRequest(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

// ==================== Transactions ====================

export const transactionsAPI = {
  // Get transactions (seller and NGO only)
  getTransactions: async () => {
    return await apiRequest('/transactions');
  },

  // Get seller earnings
  getEarnings: async () => {
    return await apiRequest('/transactions/earnings');
  },
};

// ==================== Analytics (NGO Only) ====================

export const analyticsAPI = {
  // Get platform metrics
  getPlatformMetrics: async () => {
    return await apiRequest('/analytics/platform-metrics');
  },

  // Get seller performance
  getSellerPerformance: async () => {
    return await apiRequest('/analytics/seller-performance');
  },
};

// ==================== Health Check ====================

export const healthAPI = {
  // Check API health
  checkHealth: async () => {
    return await apiRequest('/health');
  },
};

// Export all APIs
export default {
  auth: authAPI,
  products: productsAPI,
  orders: ordersAPI,
  transactions: transactionsAPI,
  analytics: analyticsAPI,
  health: healthAPI,
};

