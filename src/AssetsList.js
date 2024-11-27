import React, { useEffect, useState } from 'react';
import { fetchAssets, fetchUsers, deleteAsset, updateAsset } from './api'; // Ensure API methods are implemented
import { useNavigate } from 'react-router-dom';
import './styles.css';

const AssetsList = () => {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]); // Store users
  const [role, setRole] = useState(''); // User's role (admin/responsible)
  const [userId, setUserId] = useState(null); // Logged-in user's ID
  const [editAsset, setEditAsset] = useState(null); // Asset being edited
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // Sorting state
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedUserId = localStorage.getItem('userId');
    setRole(storedRole);
    setUserId(Number(storedUserId));

    // Fetch assets and users
    const loadData = async () => {
      try {
        const [assetsResponse, usersResponse] = await Promise.all([
          fetchAssets(),
          fetchUsers(),
        ]);

        setAssets(assetsResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleDelete = async (id) => {
    try {
      await deleteAsset(id);
      setAssets((prevAssets) => prevAssets.filter((asset) => asset.id !== id));
    } catch (error) {
      console.error('Failed to delete asset:', error);
    }
  };

  const handleEdit = (asset) => {
    setEditAsset(asset);
  };

  const handleSave = async () => {
    try {
      await updateAsset(editAsset.id, editAsset);
      setAssets((prevAssets) =>
        prevAssets.map((asset) =>
          asset.id === editAsset.id ? editAsset : asset
        )
      );
      setEditAsset(null);
    } catch (error) {
      console.error('Failed to update asset:', error);
    }
  };

  const getUserEmail = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.email : 'Unknown';
  };

  const sortAssets = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedAssets = [...assets].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setAssets(sortedAssets);
  };

  const filteredAssets =
    role === 'admin'
      ? assets
      : assets.filter((asset) => asset.responsibleUserId === userId);

  return (
    <div>
     
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
              <th onClick={() => sortAssets('id')}>ID</th>
              <th onClick={() => sortAssets('varNumber')}>Var Number</th>
              <th onClick={() => sortAssets('name')}>Name</th>
              <th onClick={() => sortAssets('status')}>Status</th>
              <th onClick={() => sortAssets('cost')}>Cost</th>
              <th onClick={() => sortAssets('responsibleUserId')}>Responsible User Email</th>
              <th onClick={() => sortAssets('addedDate')}>Added Date</th>
              {role === 'admin' && <th>Actions</th>}
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
                <td>{getUserEmail(asset.responsibleUserId)}</td>
                <td>{new Date(asset.addedDate).toLocaleDateString()}</td>
                {role === 'admin' && (
                  <td>
                    <button onClick={() => handleEdit(asset)}>Edit</button>
                    <button onClick={() => handleDelete(asset.id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editAsset && (
        <div className="modal">
          <h2>Edit Asset</h2>
          <label>
            Var Number:
            <input
              type="text"
              value={editAsset.varNumber}
              onChange={(e) => setEditAsset({ ...editAsset, varNumber: e.target.value })}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              value={editAsset.name}
              onChange={(e) => setEditAsset({ ...editAsset, name: e.target.value })}
            />
          </label>
          <label>
            Status:
            <input
              type="text"
              value={editAsset.status}
              onChange={(e) => setEditAsset({ ...editAsset, status: e.target.value })}
            />
          </label>
          <label>
            Cost:
            <input
              type="number"
              value={editAsset.cost}
              onChange={(e) => setEditAsset({ ...editAsset, cost: parseFloat(e.target.value) })}
            />
          </label>
          <label>
            Responsible User:
            <select
              value={editAsset.responsibleUserId || ''}
              onChange={(e) =>
                setEditAsset({
                  ...editAsset,
                  responsibleUserId: Number(e.target.value),
                })
              }
            >
              <option value="" disabled>
                Select User
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email}
                </option>
              ))}
            </select>
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditAsset(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AssetsList;
