import React, { useState } from 'react';
import { Menu, LogOut, Package, TrendingUp, ShoppingBag } from 'lucide-react';
import { products, orders, transactions } from '../data/mockData';
import './SellerDashboard.css';

const SellerDashboard = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('catalog');
  const [menuOpen, setMenuOpen] = useState(false);

  // Filter data for current seller
  const sellerProducts = products.filter(p => p.sellerId === user.id);
  const sellerOrders = orders.filter(o => o.sellerId === user.id);
  const sellerTransactions = transactions.filter(t => t.sellerId === user.id);
  
  const totalEarnings = sellerTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.netEarning, 0);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} />
        </button>
        <h1 className="dashboard-title">
          {activeView === 'catalog' ? 'Catalog' : activeView === 'earnings' ? 'My Earnings' : 'Orders'}
        </h1>
        <button className="logout-button" onClick={onLogout}>
          <LogOut size={20} />
        </button>
      </header>

      {/* Welcome Message */}
      {activeView === 'catalog' && (
        <div className="welcome-message">
          Welcome back, {user.name}!
        </div>
      )}

      {/* Navigation Menu */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="menu-header">
              <h2>{user.name}</h2>
              <p>{user.village}, {user.state}</p>
            </div>
            <nav className="menu-nav">
              <button onClick={() => { setActiveView('catalog'); setMenuOpen(false); }}>
                <Package size={20} /> Catalog
              </button>
              <button onClick={() => { setActiveView('earnings'); setMenuOpen(false); }}>
                <TrendingUp size={20} /> My Earnings
              </button>
              <button onClick={() => { setActiveView('orders'); setMenuOpen(false); }}>
                <ShoppingBag size={20} /> Orders
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="dashboard-content">
        {activeView === 'catalog' && (
          <div className="catalog-view">
            <div className="products-grid">
              {sellerProducts.map(product => (
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
                  <p className="product-stock">Stock: {product.stock}</p>
                </div>
              ))}
            </div>
            <button className="place-order-button">
              PLACE ORDER
            </button>
          </div>
        )}

        {activeView === 'earnings' && (
          <div className="earnings-view">
            <div className="earnings-chart">
              <TrendingUp size={60} color="#FF7B5F" />
            </div>
            <div className="total-earnings">
              <h2>Total earnings:</h2>
              <h1>₹{totalEarnings.toLocaleString('en-IN')}</h1>
            </div>
            <div className="transactions-section">
              <h3>Transactions</h3>
              <div className="transactions-list">
                {sellerTransactions.map(transaction => (
                  <div key={transaction.id} className="transaction-item">
                    <div>
                      <p className="transaction-title">Order placed {transaction.sellerName}</p>
                      <p className="transaction-subtitle">Order ral {transaction.sellerName}</p>
                    </div>
                    <p className="transaction-amount">₹{transaction.netEarning.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'orders' && (
          <div className="orders-view">
            <div className="orders-list">
              {sellerOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>{order.orderNumber}</h3>
                    <span className={`order-status ${order.status}`}>{order.status}</span>
                  </div>
                  <div className="order-details">
                    <p><strong>Product:</strong> {order.productName}</p>
                    <p><strong>Quantity:</strong> {order.quantity}</p>
                    <p><strong>Amount:</strong> ₹{order.totalAmount.toLocaleString('en-IN')}</p>
                    <p><strong>Customer:</strong> {order.customerName}</p>
                    <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerDashboard;

