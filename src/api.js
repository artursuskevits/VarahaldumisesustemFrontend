import axios from 'axios';

// Base URL for the API
const API = axios.create({
  baseURL: 'https://localhost:7277/api', // Ensure this is correct
});

// Dynamically set Authorization token
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

// Assets Endpoints
export const fetchAssets = () => API.get('/varad'); // Fetch all assets
export const fetchAsset = (id) => API.get(`/varad/${id}`); // Fetch a specific asset by ID
export const createAsset = (asset) => {
  const token = localStorage.getItem('token');
  return API.post('/varad', asset, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateAsset = (id, updatedAsset) =>
  API.put(`/varad/${id}`, updatedAsset, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }); // Update asset
export const deleteAsset = (id) =>
  API.delete(`/varad/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }); // Delete asset

// Users Endpoints
export const fetchUsers = () => API.get('/kasutaja/all'); // Fetch all users
export const fetchUser = (id) => API.get(`/kasutaja/${id}`); // Fetch a specific user by ID
export const createUser = (user) => API.post('/kasutaja/create', user); // Create a new user
export const updateUser = (id, updatedUser) =>
  API.put(`/kasutaja/update/${id}`, updatedUser); // Update user details
export const deleteUser = (id) => API.delete(`/kasutaja/delete/${id}`); // Delete a user
export const loginUser = (credentials) => API.post('/Authentication/login', credentials); // Log in user
