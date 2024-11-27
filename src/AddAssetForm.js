import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './styles.css';

const AddAssetForm = () => {
  const [varNumber, setVarNumber] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [cost, setCost] = useState("");
  const [responsibleUserId, setResponsibleUserId] = useState("");
  const [addedDate, setAddedDate] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAsset = {
      varNumber,
      name,
      status,
      cost: parseFloat(cost),
      responsibleUserId: parseInt(responsibleUserId),
      addedDate: new Date(addedDate).toISOString(),
    };

    try {
      const response = await axios.post(
        "https://localhost:7277/api/varad",
        newAsset
      );
      alert("Asset added successfully!");
      console.log(response.data);

      // Redirect to the Assets List page after successful submission
      navigate("/assets");
    } catch (error) {
      console.error("Error adding asset:", error.response?.data || error.message);
      alert("Failed to add asset. Check the console for more details.");
    }
  };

  return (
    <div>
      <h1>Add New Asset</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Var Number:</label>
          <input
            type="text"
            value={varNumber}
            onChange={(e) => setVarNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label>Cost:</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Responsible User ID:</label>
          <input
            type="number"
            value={responsibleUserId}
            onChange={(e) => setResponsibleUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Added Date:</label>
          <input
            type="date"
            value={addedDate}
            onChange={(e) => setAddedDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Asset</button>
      </form>
      <button onClick={() => navigate("/assets")} style={{ marginTop: "10px" }}>
        Back to Assets List
      </button>
    </div>
  );
};

export default AddAssetForm;