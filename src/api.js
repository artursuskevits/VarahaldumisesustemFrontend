import axios from 'axios';



const API = axios.create({
  baseURL: 'https://localhost:7277/api', // Ensure this matches your API base URL
});

export const fetchAssets = () => API.get('/varad'); // Adjust the endpoint if necessary

export const fetchAsset = (id) => API.get(`/varad/${id}`);
export const createAsset = (asset) => API.post('/varad', asset);
export const updateAsset = (id, updatedAsset) => API.put(`/varad/${id}`, updatedAsset);
export const deleteAsset = (id) => API.delete(`/varad/${id}`);

// Users Endpoints
export const fetchUsers = () => API.get('/kasutaja');
export const fetchUser = (id) => API.get(`/kasutaja/${id}`);
export const createUser = (user) => API.post('/kasutaja', user);
export const updateUser = (id, updatedUser) => API.put(`/kasutaja/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/kasutaja/${id}`);
export const loginUser = (credentials) => API.post('/Authentication/login', credentials);

export const setAuthToken = (token) => {
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common['Authorization'];
    }
  };
