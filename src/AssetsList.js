import React, { useEffect, useState } from 'react';
import { fetchAssets } from './api';
import { useNavigate } from 'react-router-dom';

const AssetsList = () => {
  const [assets, setAssets] = useState([]);
  const [role, setRole] = useState(''); // User's role (admin/responsible)
  const [userId, setUserId] = useState(null); // Logged-in user's ID
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching the role and user ID from localStorage
    const storedRole = localStorage.getItem('role'); // Assume role is saved during login
    const storedUserId = localStorage.getItem('userId'); // Assume userId is saved during login
    setRole(storedRole);
    setUserId(Number(storedUserId));

    const loadAssets = async () => {
      try {
        const { data } = await fetchAssets();
        setAssets(data);
      } catch (error) {
        console.error('Failed to fetch assets:', error);
      }
    };
    loadAssets();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('role'); // Remove role
    localStorage.removeItem('userId'); // Remove userId
    navigate('/'); // Redirect to login page
  };

  // Filter assets based on the user's role
  const filteredAssets =
    role === 'admin'
      ? assets // Admin sees all assets
      : assets.filter((asset) => asset.responsibleUserId === userId); // Others see only their assets

  return (
    <div>
      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
        Logout
      </button>
      <h1>Assets List</h1>
      {role === 'admin' && (
        <button onClick={() => navigate('/add-asset')} style={{ marginBottom: '20px' }}>
          Add New Asset
        </button>
      )}
      {filteredAssets.length === 0 ? (
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
            {filteredAssets.map((asset) => (
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

export default AssetsList;
