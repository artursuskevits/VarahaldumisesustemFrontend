import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:7277/api', // Ensure this matches your API base URL
});

// Set Authorization token dynamically
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
export const updateAsset = (id, updatedAsset) => API.put(`/varad/${id}`, updatedAsset);
export const deleteAsset = (id) => API.delete(`/varad/${id}`);

// Users Endpoints
export const fetchUsers = () => API.get('/kasutaja'); // Fetch all users
export const fetchUser = (id) => API.get(`/kasutaja/${id}`); // Fetch a specific user by ID
export const createUser = (user) => API.post('/kasutaja', user); // Create a new user
export const updateUser = (id, updatedUser) => API.put(`/kasutaja/${id}`, updatedUser); // Update user details
export const deleteUser = (id) => API.delete(`/kasutaja/${id}`); // Delete a user
export const loginUser = (credentials) => API.post('/Authentication/login', credentials); // Log in user
