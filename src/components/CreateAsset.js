import React, { useState } from 'react';
import { createAsset } from '../api';

const CreateAsset = () => {
  const [formData, setFormData] = useState({
    varNumber: '',
    name: '',
    status: 'Active',
    cost: '',
    addedDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAsset(formData);
      alert('Asset created successfully!');
    } catch (error) {
      console.error('Error creating asset:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Asset</h2>
      <label>
        Var Number:
        <input name="varNumber" value={formData.varNumber} onChange={handleChange} required />
      </label>
      <label>
        Name:
        <input name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Status:
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>
      <label>
        Cost:
        <input name="cost" value={formData.cost} onChange={handleChange} type="number" required />
      </label>
      <label>
        Added Date:
        <input name="addedDate" value={formData.addedDate} onChange={handleChange} type="date" required />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateAsset;
