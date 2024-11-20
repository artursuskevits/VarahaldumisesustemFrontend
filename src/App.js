import React, { useState, useEffect } from 'react';
import Login from './Login';
import Assets from './Assets';
import { setAuthToken } from './api';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setIsAuthenticated(false);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <Assets />
        </div>
      )}
    </div>
  );
};

export default App;
