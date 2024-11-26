import React from 'react';
import AssetsList from './AssetsList';
import AddAssetForm from './AddAssetForm';

const Assets = ({ onLogout }) => {
  const handleAssetAdded = () => {
    window.location.reload(); // Reload the page after adding a new asset
  };

  return (
    <div>
      <button onClick={onLogout} style={{ marginBottom: '10px' }}>
        Logout
      </button>
      <AssetsList />
      <AddAssetForm onAssetAdded={handleAssetAdded} />
    </div>
  );
};

export default Assets;
