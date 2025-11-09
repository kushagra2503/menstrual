import React, { useState } from 'react';
import { Menu, LogOut, BarChart3, ShoppingBag, Users, TrendingUp, Package } from 'lucide-react';
import { orders, platformMetrics, users, transactions } from '../data/mockData';
import './NGODashboard.css';

const NGODashboard = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const sellers = users.filter(u => u.role === 'seller');
  const buyers = users.filter(u => u.role === 'buyer');
  const completedOrders = orders.filter(o => o.status === 'delivered').length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  // Calculate seller earnings
  const sellerEarnings = sellers.map(seller => {
    const sellerTransactions = transactions.filter(t => t.sellerId === seller.id && t.status === 'completed');
    const totalEarning = sellerTransactions.reduce((sum, t) => sum + t.netEarning, 0);
    const orderCount = orders.filter(o => o.sellerId === seller.id).length;
    return {
      ...seller,
      totalEarning,
      orderCount
    };
  });

  return (
    <div className="dashboard-container ngo">
      {/* Header */}
      <header className="dashboard-header">
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} />
        </button>
        <h1 className="dashboard-title">
          {activeView === 'dashboard' ? 'NGO Dashboard' : activeView === 'orders' ? 'All Orders' : 'Seller Analytics'}
        </h1>
        <button className="logout-button" onClick={onLogout}>
          <LogOut size={20} />
        </button>
      </header>

      {/* Navigation Menu */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="menu-header">
              <h2>{user.name}</h2>
              <p>NGO Representative</p>
            </div>
            <nav className="menu-nav">
              <button onClick={() => { setActiveView('dashboard'); setMenuOpen(false); }}>
                <BarChart3 size={20} /> Dashboard
              </button>
              <button onClick={() => { setActiveView('orders'); setMenuOpen(false); }}>
                <ShoppingBag size={20} /> All Orders
              </button>
              <button onClick={() => { setActiveView('analytics'); setMenuOpen(false); }}>
                <TrendingUp size={20} /> Seller Analytics
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="dashboard-content ngo-content">
        {activeView === 'dashboard' && (
          <div className="ngo-dashboard-view">
            <div className="stats-grid">
              <div className="stat-card purple">
                <div className="stat-icon">
                  <ShoppingBag size={32} />
                </div>
                <div className="stat-info">
                  <h3>{totalOrders}</h3>
                  <p>Total Orders</p>
                </div>
              </div>

              <div className="stat-card green">
                <div className="stat-icon">
                  <TrendingUp size={32} />
                </div>
                <div className="stat-info">
                  <h3>₹{totalRevenue.toLocaleString('en-IN')}</h3>
                  <p>Total Revenue</p>
                </div>
              </div>

              <div className="stat-card orange">
                <div className="stat-icon">
                  <Users size={32} />
                </div>
                <div className="stat-info">
                  <h3>{sellers.length}</h3>
                  <p>Active Sellers</p>
                </div>
              </div>

              <div className="stat-card blue">
                <div className="stat-icon">
                  <Users size={32} />
                </div>
                <div className="stat-info">
                  <h3>{buyers.length}</h3>
                  <p>Total Buyers</p>
                </div>
              </div>

              <div className="stat-card teal">
                <div className="stat-icon">
                  <Package size={32} />
                </div>
                <div className="stat-info">
                  <h3>{completedOrders}</h3>
                  <p>Completed Orders</p>
                </div>
              </div>

              <div className="stat-card yellow">
                <div className="stat-icon">
                  <Package size={32} />
                </div>
                <div className="stat-info">
                  <h3>{pendingOrders}</h3>
                  <p>Pending Orders</p>
                </div>
              </div>
            </div>

            <div className="recent-orders-section">
              <h2>Recent Orders</h2>
              <div className="orders-table">
                {orders.slice(-5).reverse().map(order => (
                  <div key={order.id} className="order-row">
                    <div className="order-cell">
                      <span className="label">Order ID</span>
                      <span className="value">{order.orderNumber}</span>
                    </div>
                    <div className="order-cell">
                      <span className="label">Seller</span>
                      <span className="value">{order.sellerName}</span>
                    </div>
                    <div className="order-cell">
                      <span className="label">Product</span>
                      <span className="value">{order.productName}</span>
                    </div>
                    <div className="order-cell">
                      <span className="label">Amount</span>
                      <span className="value">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="order-cell">
                      <span className={`order-status ${order.status}`}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'orders' && (
          <div className="all-orders-view">
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>{order.orderNumber}</h3>
                    <span className={`order-status ${order.status}`}>{order.status}</span>
                  </div>
                  <div className="order-details">
                    <div className="detail-row">
                      <span className="detail-label">Seller:</span>
                      <span className="detail-value">{order.sellerName}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Buyer:</span>
                      <span className="detail-value">{order.buyerName}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Product:</span>
                      <span className="detail-value">{order.productName}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Quantity:</span>
                      <span className="detail-value">{order.quantity}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Amount:</span>
                      <span className="detail-value amount">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Customer:</span>
                      <span className="detail-value">{order.customerName}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">{new Date(order.orderDate).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'analytics' && (
          <div className="analytics-view">
            <h2>Seller Performance</h2>
            <div className="seller-analytics-list">
              {sellerEarnings.map(seller => (
                <div key={seller.id} className="seller-card">
                  <div className="seller-header">
                    <div>
                      <h3>{seller.name}</h3>
                      <p>{seller.village}, {seller.state}</p>
                    </div>
                    <div className="seller-badge">
                      {seller.orderCount} orders
                    </div>
                  </div>
                  <div className="seller-stats">
                    <div className="stat-item">
                      <span className="stat-label">Total Earnings</span>
                      <span className="stat-value">₹{seller.totalEarning.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Orders Completed</span>
                      <span className="stat-value">{seller.orderCount}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Avg. Order Value</span>
                      <span className="stat-value">
                        ₹{seller.orderCount > 0 ? Math.round(seller.totalEarning / seller.orderCount).toLocaleString('en-IN') : 0}
                      </span>
                    </div>
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

export default NGODashboard;

