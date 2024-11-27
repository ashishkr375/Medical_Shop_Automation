"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

function MedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "OTC",
    stockLevel: 0,
    expirationDate: "",
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Fetch all medicines
  const fetchMedicines = async () => {
    try {
      const response = await axios.get("/api/medicines");
      setMedicines(response.data.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for adding/updating
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedMedicine) {
        await axios.put(`/api/medicines/${selectedMedicine._id}`, formData);
      } else {
        await axios.post("/api/medicines", formData);
      }
      resetForm();
      fetchMedicines();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle selecting a medicine for update
  const handleSelectMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setFormData({
      name: medicine.name,
      category: medicine.category,
      stockLevel: medicine.stockLevel,
      expirationDate: medicine.expirationDate.split("T")[0],
    });
  };

  // Reset form
  const resetForm = () => {
    setSelectedMedicine(null);
    setFormData({
      name: "",
      category: "OTC",
      stockLevel: 0,
      expirationDate: "",
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Medicines</h1>
      <ul>
        {medicines.map((medicine) => (
          <li
            key={medicine._id}
            onClick={() => handleSelectMedicine(medicine)}
            style={{ marginBottom: "10px", cursor: "pointer" }}
          >
            <strong>{medicine.name}</strong> - {medicine.category} - Stock:{" "}
            {medicine.stockLevel} - Expires: {new Date(medicine.expirationDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="OTC">OTC</option>
            <option value="Prescription">Prescription</option>
            <option value="Controlled">Controlled</option>
          </select>
        </div>
        <div>
          <label>Stock Level:</label>
          <input
            type="number"
            name="stockLevel"
            value={formData.stockLevel}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Expiration Date:</label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">
          {selectedMedicine ? "Update Medicine" : "Add Medicine"}
        </button>
        {selectedMedicine && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default MedicinesPage;
