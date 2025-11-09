import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, ChevronDown } from 'lucide-react';
import { products } from '../data/mockData';
import './BuyerDashboard.css';

const BuyerDashboard = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('catalog');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderForm, setOrderForm] = useState({
    quantity: 50,
    customerName: '',
    address: ''
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handlePlaceOrder = () => {
    setActiveView('place-order');
    setSelectedProduct(products[0]);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    // Simulate order submission
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setActiveView('catalog');
      setOrderForm({ quantity: 50, customerName: '', address: '' });
    }, 2000);
  };

  return (
    <div className="dashboard-container buyer">
      {activeView === 'catalog' ? (
        <>
          {/* Header */}
          <header className="dashboard-header">
            <button className="menu-button" onClick={onLogout}>
              <ArrowLeft size={24} />
            </button>
            <h1 className="dashboard-title">Catalog</h1>
            <div style={{ width: '40px' }}></div>
          </header>

          {/* Welcome Message */}
          <div className="welcome-message">
            Welcome back!
          </div>

          {/* Main Content */}
          <main className="dashboard-content">
            <div className="catalog-view">
              <div className="products-grid">
                {products.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-icon">
                      {product.category === 'reusable_pad' && (
                        <svg viewBox="0 0 100 120" fill="none">
                          <path d="M30 20 C30 10, 40 5, 50 5 C60 5, 70 10, 70 20 L70 100 C70 110, 60 115, 50 115 C40 115, 30 110, 30 100 Z" 
                                stroke="#FF7B5F" strokeWidth="2" fill="#FFE5E0"/>
                          <ellipse cx="50" cy="35" rx="15" ry="8" fill="#FF9A7B"/>
                        </svg>
                      )}
                      {product.category === 'menstrual_cup' && (
                        <svg viewBox="0 0 100 120" fill="none">
                          <path d="M35 20 L35 70 C35 85, 42.5 95, 50 95 C57.5 95, 65 85, 65 70 L65 20" 
                                stroke="#FF7B5F" strokeWidth="2" fill="#FFE5E0"/>
                          <ellipse cx="50" cy="20" rx="15" ry="5" fill="#FF9A7B"/>
                        </svg>
                      )}
                      {product.category === 'period_underwear' && (
                        <svg viewBox="0 0 120 100" fill="none">
                          <path d="M20 20 L40 20 L45 60 L35 90 L25 90 L20 60 Z M100 20 L80 20 L75 60 L85 90 L95 90 L100 60 Z M40 20 C40 20, 50 15, 60 15 C70 15, 80 20, 80 20" 
                                stroke="#FF7B5F" strokeWidth="2" fill="#FFE5E0"/>
                        </svg>
                      )}
                    </div>
                    <h3>{product.name}</h3>
                    <p className="product-price">₹{product.price}</p>
                  </div>
                ))}
              </div>
              <button className="place-order-button" onClick={handlePlaceOrder}>
                PLACE ORDER
              </button>
            </div>
          </main>
        </>
      ) : (
        <>
          {/* Place Order View */}
          <header className="dashboard-header">
            <button className="menu-button" onClick={() => setActiveView('catalog')}>
              <ArrowLeft size={24} />
            </button>
            <h1 className="dashboard-title">Place Order</h1>
            <div style={{ width: '40px' }}></div>
          </header>

          <main className="dashboard-content">
            <form className="order-form" onSubmit={handleSubmitOrder}>
              <div className="form-group">
                <label>Product</label>
                <div className="select-wrapper">
                  <select 
                    value={selectedProduct?.id || ''}
                    onChange={(e) => setSelectedProduct(products.find(p => p.id === parseInt(e.target.value)))}
                  >
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={20} className="select-icon" />
                </div>
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  value={orderForm.quantity}
                  onChange={(e) => setOrderForm({ ...orderForm, quantity: e.target.value })}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  value={orderForm.customerName}
                  onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Delivery Address</label>
                <textarea
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                  placeholder="Enter delivery address"
                  rows="3"
                  required
                />
              </div>

              {selectedProduct && (
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Unit Price:</span>
                    <span>₹{selectedProduct.price}</span>
                  </div>
                  <div className="summary-row">
                    <span>Quantity:</span>
                    <span>{orderForm.quantity}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total Amount:</span>
                    <span>₹{(selectedProduct.price * orderForm.quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}

              <button type="submit" className="submit-order-button">
                SUBMIT ORDER
              </button>

              {orderSuccess && (
                <div className="success-message">
                  Order placed successfully! 🎉
                </div>
              )}
            </form>
          </main>
        </>
      )}
    </div>
  );
};

export default BuyerDashboard;

