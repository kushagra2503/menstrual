# Frontend API Integration Guide

## Setup

### 1. Create environment file

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000/api
```

### 2. API Service is ready

The API service is located at `src/services/api.js` and provides all necessary methods to interact with the backend.

## Integration Examples

### Login Component Integration

Update `src/components/Login.jsx`:

```javascript
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { authAPI } from '../services/api';
import './Login.css';

const Login = ({ onLogin }) => {
  const [userType, setUserType] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Map user types to their phone numbers (for demo)
  const userTypeToPhone = {
    'seller': '9876543210',
    'buyer': '9876543220',
    'ngo': '9876543230'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!userType) {
      setError('Please select a user type');
      setLoading(false);
      return;
    }
    
    try {
      const phone = userTypeToPhone[userType];
      const response = await authAPI.login(phone, password);
      
      // Call parent component's onLogin with user data
      onLogin(response.user);
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... existing JSX with loading state on button
    <button type="submit" className="login-button" disabled={loading}>
      {loading ? 'LOGGING IN...' : 'LOGIN'}
    </button>
  );
};
```

### App.jsx Integration

Update `src/App.jsx` to use the API:

```javascript
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SellerDashboard from './components/SellerDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import NGODashboard from './components/NGODashboard';
import { authAPI } from './services/api';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      if (authAPI.isAuthenticated()) {
        try {
          const user = await authAPI.getCurrentUser();
          setCurrentUser(user);
        } catch (error) {
          console.error('Auth check failed:', error);
          authAPI.logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    authAPI.logout();
    setCurrentUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            currentUser ? (
              <Navigate to={`/${currentUser.role}`} replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } 
        />
        <Route 
          path="/seller" 
          element={
            currentUser && currentUser.role === 'seller' ? (
              <SellerDashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/buyer" 
          element={
            currentUser && currentUser.role === 'buyer' ? (
              <BuyerDashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/ngo" 
          element={
            currentUser && currentUser.role === 'ngo' ? (
              <NGODashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
```

### BuyerDashboard Integration

Example of fetching products and creating orders:

```javascript
import React, { useState, useEffect } from 'react';
import { productsAPI, ordersAPI } from '../services/api';

const BuyerDashboard = ({ user, onLogout }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderForm, setOrderForm] = useState({
    quantity: 50,
    customerName: '',
    address: ''
  });

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    try {
      const orderData = {
        product_id: selectedProduct.id,
        quantity: parseInt(orderForm.quantity),
        customer_name: orderForm.customerName,
        delivery_address: orderForm.address,
        buyer_id: user.id,
        seller_id: selectedProduct.seller_id
      };

      const newOrder = await ordersAPI.createOrder(orderData);
      
      // Show success message
      setOrderSuccess(true);
      
      // Reset form
      setTimeout(() => {
        setOrderSuccess(false);
        setActiveView('catalog');
        setOrderForm({ quantity: 50, customerName: '', address: '' });
      }, 2000);
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Failed to place order: ' + error.message);
    }
  };

  // ... rest of component
};
```

### SellerDashboard Integration

Example of fetching seller's products and orders:

```javascript
import React, { useState, useEffect } from 'react';
import { productsAPI, ordersAPI, transactionsAPI } from '../services/api';

const SellerDashboard = ({ user, onLogout }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch seller's products
        const productsData = await productsAPI.getProducts(user.id);
        setProducts(productsData);

        // Fetch seller's orders
        const ordersData = await ordersAPI.getOrders();
        setOrders(ordersData);

        // Fetch earnings
        const earningsData = await transactionsAPI.getEarnings();
        setEarnings(earningsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await ordersAPI.updateOrderStatus(orderId, newStatus);
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update order status');
    }
  };

  // ... rest of component
};
```

### NGODashboard Integration

Example of fetching analytics:

```javascript
import React, { useState, useEffect } from 'react';
import { analyticsAPI, ordersAPI } from '../services/api';

const NGODashboard = ({ user, onLogout }) => {
  const [metrics, setMetrics] = useState(null);
  const [sellerPerformance, setSellerPerformance] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch platform metrics
        const metricsData = await analyticsAPI.getPlatformMetrics();
        setMetrics(metricsData);

        // Fetch seller performance
        const performanceData = await analyticsAPI.getSellerPerformance();
        setSellerPerformance(performanceData);

        // Fetch all orders
        const ordersData = await ordersAPI.getOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ... rest of component
};
```

## Error Handling

Add global error handling:

```javascript
// src/utils/errorHandler.js
export const handleAPIError = (error) => {
  if (error.message.includes('401') || error.message.includes('Unauthorized')) {
    // Redirect to login
    authAPI.logout();
    window.location.href = '/';
  } else if (error.message.includes('403')) {
    alert('You do not have permission to perform this action');
  } else if (error.message.includes('404')) {
    alert('Resource not found');
  } else {
    alert('An error occurred: ' + error.message);
  }
};
```

## Loading States

Add loading indicators:

```javascript
{loading ? (
  <div className="loading-spinner">Loading...</div>
) : (
  // Your content here
)}
```

## Testing the Integration

1. Start the backend server:
```bash
cd backend
./start.sh  # or start.bat on Windows
```

2. Start the frontend:
```bash
npm run dev
```

3. Open http://localhost:5173 and test:
   - Login with demo credentials
   - View products
   - Create orders
   - Check analytics (NGO)

## Troubleshooting

### CORS Errors
Make sure backend `main.py` includes your frontend URL:
```python
allow_origins=["http://localhost:5173"]
```

### 401 Unauthorized
- Check that token is being saved in localStorage
- Verify token is being sent in Authorization header
- Token might be expired (30 min default)

### Connection Refused
- Ensure backend is running on port 8000
- Check VITE_API_URL in .env file

## Next Steps

1. ✅ Backend API created
2. ✅ Frontend API service created
3. 📝 Update components to use API
4. 🧪 Test all functionality
5. 🎨 Add loading states and error handling
6. 🚀 Deploy to production

For complete API documentation, visit http://localhost:8000/docs when backend is running.

