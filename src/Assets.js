import React, { useEffect, useState } from 'react';
import { fetchAssets } from './api';

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is logged in by verifying token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    setIsAuthenticated(true);
    loadAssets();
  }, []);

  // Fetch assets from the API
  const loadAssets = async () => {
    try {
      const { data } = await fetchAssets();
      setAssets(data);
    } catch (error) {
      console.error('Failed to fetch assets:', error);
    }
  };

  // If not logged in, display a message
  if (!isAuthenticated) {
    return <h1>Please log in to view assets.</h1>;
  }

  return (
    <div>
      <h1>Assets List</h1>
      {assets.length === 0 ? (
        <p>No assets found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Var Number</th>
              <th>Name</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Responsible User ID</th>
              <th>Added Date</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.varNumber}</td>
                <td>{asset.name}</td>
                <td>{asset.status}</td>
                <td>{asset.cost}</td>
                <td>{asset.responsibleUserId}</td>
                <td>{new Date(asset.addedDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Assets;
