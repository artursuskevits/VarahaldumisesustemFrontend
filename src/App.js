import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AssetsList from './AssetsList';
import AddAssetForm from './AddAssetForm';
import Login from './Login';
import { setAuthToken } from './api';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Clear token and role from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');

    // Clear Authorization header
    setAuthToken(null);

    // Update authentication state and redirect to login
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  const role = localStorage.getItem('role'); // Get the role from localStorage

  return (
    <Router>
      <div>
        {isAuthenticated && (
          <button onClick={handleLogout} style={{ margin: '10px' }}>
            Logout
          </button>
        )}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/assets" /> : <Login onLoginSuccess={handleLoginSuccess} />
            }
          />
          <Route
            path="/assets"
            element={isAuthenticated ? <AssetsList /> : <Navigate to="/" />}
          />
          <Route
            path="/add-asset"
            element={
              isAuthenticated && role === 'admin' ? <AddAssetForm /> : <Navigate to="/assets" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
