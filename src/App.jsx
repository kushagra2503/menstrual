import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SellerDashboard from './components/SellerDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import NGODashboard from './components/NGODashboard';
import { users } from './data/mockData';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (phone, password) => {
    const user = users.find(u => u.phone === phone && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

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

