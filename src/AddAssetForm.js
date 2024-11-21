import React, { useState } from 'react';
import { createAsset } from './api';
import { Link } from 'react-router-dom';

const AddAssetForm = () => {
  const [newAsset, setNewAsset] = useState({
    varNumber: '',
    name: '',
    status: 'Active',
    cost: '',
    responsibleUserId: '',
    addedDate: new Date().toISOString().split('T')[0],
  });

  const handleAddAsset = async (e) => {
    e.preventDefault();
    try {
      await createAsset(newAsset);
      setNewAsset({
        varNumber: '',
        name: '',
        status: 'Active',
        cost: '',
        responsibleUserId: '',
        addedDate: new Date().toISOString().split('T')[0],
      });
      alert('Asset added successfully!');
    } catch (error) {
      console.error('Failed to create asset:', error);
    }
  };

  return (
    <div>
      <h2>Add New Asset</h2>
      <form onSubmit={handleAddAsset}>
        <div>
          <label>Var Number:</label>
          <input
            type="text"
            value={newAsset.varNumber}
            onChange={(e) => setNewAsset({ ...newAsset, varNumber: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={newAsset.name}
            onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={newAsset.status}
            onChange={(e) => setNewAsset({ ...newAsset, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Unreadable">Unreadable</option>
          </select>
        </div>
        <div>
          <label>Cost:</label>
          <input
            type="number"
            value={newAsset.cost}
            onChange={(e) => setNewAsset({ ...newAsset, cost: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Responsible User ID:</label>
          <input
            type="number"
            value={newAsset.responsibleUserId}
            onChange={(e) => setNewAsset({ ...newAsset, responsibleUserId: e.target.value })}
          />
        </div>
        <div>
          <label>Added Date:</label>
          <input
            type="date"
            value={newAsset.addedDate}
            onChange={(e) => setNewAsset({ ...newAsset, addedDate: e.target.value })}
            required
          />
        </div>
        <button type="submit">Add Asset</button>
      </form>
      <br />
      <Link to="/assets">
        <button>Back to List</button>
      </Link>
    </div>
  );
};

export default AddAssetForm;
