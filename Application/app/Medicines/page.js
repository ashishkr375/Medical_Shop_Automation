"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // To redirect after actions like delete or edit

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMedicine, setEditingMedicine] = useState(null); // To track which medicine is being edited
  const [medicineDetails, setMedicineDetails] = useState({}); // To store edited values
  const router = useRouter();

  // Fetch medicines from the API
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await fetch('/api/medicines');
        const data = await res.json();

        if (data.success && Array.isArray(data.medicines)) {
          setMedicines(data.medicines);
        } else {
          console.error('Error: Invalid data format', data);
        }
      } catch (error) {
        console.error('Failed to fetch medicines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  // Handle edit button click
  const handleEditClick = (medicine) => {
    setEditingMedicine(medicine._id); // Set the current medicine being edited
    setMedicineDetails({
      name: medicine.name,
      quantity: medicine.quantity,
      price: medicine.price,
      expiryDate: medicine.expiryDate,
    });
  };

  // Handle form input change (for editing)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicineDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Update medicine in the database
  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/medicines/${editingMedicine}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medicineDetails),
      });
      const data = await res.json();

      if (data.success) {
        // Update the list after successful update
        setMedicines((prevMedicines) =>
          prevMedicines.map((medicine) =>
            medicine._id === editingMedicine ? { ...medicine, ...medicineDetails } : medicine
          )
        );
        setEditingMedicine(null); // Reset editing mode
      } else {
        console.error('Error updating medicine:', data.message);
      }
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  // Delete a medicine
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/medicines/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        setMedicines((prevMedicines) =>
          prevMedicines.filter((medicine) => medicine._id !== id)
        );
      } else {
        console.error('Error deleting medicine:', data.message);
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center mb-6">Medicines</h1>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Quantity</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Expiry Date</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.length > 0 ? (
            medicines.map((medicine) => (
              <tr key={medicine._id} className="border-t">
                <td className="px-6 py-4">{medicine.name}</td>
                <td className="px-6 py-4">{medicine.quantity}</td>
                <td className="px-6 py-4">{medicine.price}</td>
                <td className="px-6 py-4">
                  {new Date(medicine.expiryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleEditClick(medicine)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(medicine._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center">
                No medicines found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Medicine Form */}
      {editingMedicine && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Edit Medicine</h2>
          <div className="mt-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={medicineDetails.name}
              onChange={handleInputChange}
              className="border p-2 w-full mb-4"
            />
            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={medicineDetails.quantity}
              onChange={handleInputChange}
              className="border p-2 w-full mb-4"
            />
            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={medicineDetails.price}
              onChange={handleInputChange}
              className="border p-2 w-full mb-4"
            />
            <label className="block mb-2">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={medicineDetails.expiryDate}
              onChange={handleInputChange}
              className="border p-2 w-full mb-4"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => setEditingMedicine(null)} // Cancel edit
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicinesPage;
