import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AssetsList from "./AssetsList";
import AddAssetForm from "./AddAssetForm";
import Login from "./Login";
import './styles.css';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user"));

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Clear all stored data
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
  };

  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/assets" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/assets"
          element={
            isAuthenticated ? (
              <>
                <button onClick={handleLogout}>Logout</button>
                <AssetsList />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/add-asset"
          element={
            isAuthenticated && role === "admin" ? (
              <AddAssetForm />
            ) : (
              <Navigate to="/assets" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;