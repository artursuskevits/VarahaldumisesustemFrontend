import React, { useEffect, useState } from 'react';
import { fetchAssets } from '../api'; // Ensure this function is correctly pointing to your API endpoint

const AssetsList = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      const { data } = await fetchAssets(); // Fetch assets from API
      setAssets(data); // Update state with API data
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  return (
    <div>
      <h2>Assets List</h2>
      <ul>
        {assets.map((asset) => (
          <li key={asset.id}>
            <strong>{asset.varNumber}</strong> - {asset.name} - {asset.status} - ${asset.cost} - Added on {new Date(asset.addedDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetsList;
