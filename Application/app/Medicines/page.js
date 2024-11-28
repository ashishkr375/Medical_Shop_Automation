"use client";
import React,{ useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [medicineDetails, setMedicineDetails] = useState({});
  const router = useRouter();

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

  const handleEditClick = (medicine) => {
    setEditingMedicine(medicine._id);
    setMedicineDetails({
      name: medicine.name,
      quantity: medicine.quantity,
      price: medicine.price,
      expiryDate: medicine.expiryDate,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicineDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/medicines/${editingMedicine}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medicineDetails),
      });
      const data = await res.json();

      if (data.success) {
        setMedicines((prevMedicines) =>
          prevMedicines.map((medicine) =>
            medicine._id === editingMedicine ? { ...medicine, ...medicineDetails } : medicine
          )
        );
        setEditingMedicine(null);
      } else {
        console.error('Error updating medicine:', data.message);
      }
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

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

  if (loading) return <div className="flex items-center justify-center h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-200"> <p className="text-2xl animate-pulse">Loading...</p>;</div>

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-200">
       <Header />
      <h1 className="text-4xl font-semibold text-center mb-6 pt-5">Medicines</h1>
     

      <div className="flex justify-center mb-4 ">
        <button
          onClick={() => router.push('/Medicines/add')}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
        >
          Add New Medicine Record
        </button>
      </div>

      <table className="table-auto w-full text-left shadow-lg rounded-lg overflow-hidden bg-white">
        <thead className="bg-gray-800 text-white">
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
              <React.Fragment key={medicine._id}>
                <tr className="border-t hover:bg-gray-100">
                  <td className="px-6 py-4">{medicine.name}</td>
                  <td className="px-6 py-4">{medicine.quantity}</td>
                  <td className="px-6 py-4">{medicine.price}</td>
                  <td className="px-6 py-4">
                    {new Date(medicine.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600"
                      onClick={() => handleEditClick(medicine)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      onClick={() => handleDelete(medicine._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {/* Conditionally render the edit form directly under the medicine row */}
                {editingMedicine === medicine._id && (
                  <tr className="bg-gray-100">
                    <td colSpan="5" className="px-6 py-4">
                      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Edit Medicine</h2>
                        <div>
                          <label className="block mb-2">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={medicineDetails.name}
                            onChange={handleInputChange}
                            className="border p-3 w-full mb-4 rounded-lg shadow-sm"
                          />
                          <label className="block mb-2">Quantity</label>
                          <input
                            type="number"
                            name="quantity"
                            value={medicineDetails.quantity}
                            onChange={handleInputChange}
                            className="border p-3 w-full mb-4 rounded-lg shadow-sm"
                          />
                          <label className="block mb-2">Price</label>
                          <input
                            type="number"
                            name="price"
                            value={medicineDetails.price}
                            onChange={handleInputChange}
                            className="border p-3 w-full mb-4 rounded-lg shadow-sm"
                          />
                          <label className="block mb-2">Expiry Date</label>
                          <input
                            type="date"
                            name="expiryDate"
                            value={medicineDetails.expiryDate}
                            onChange={handleInputChange}
                            className="border p-3 w-full mb-4 rounded-lg shadow-sm"
                          />
                          <button
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600"
                            onClick={handleUpdate}
                          >
                            Update
                          </button>
                          <button
                            className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md ml-2 hover:bg-gray-600"
                            onClick={() => setEditingMedicine(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
    </div>
  );
};

export default MedicinesPage;
