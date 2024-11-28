"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderingSupplier, setOrderingSupplier] = useState(null);  // For tracking the supplier being ordered from
  const [orderDetails, setOrderDetails] = useState({ medicineName: '', quantity: 1 }); // Default to 1 quantity
  const router = useRouter();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch('/api/supplier');
        const data = await res.json();

        if (data.success && Array.isArray(data.suppliers)) {
          setSuppliers(data.suppliers);
        } else {
          console.error('Error: Invalid data format', data);
        }
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleOrderClick = (supplier) => {
    setOrderingSupplier(supplier._id); // Set the supplier for ordering
    setOrderDetails({ medicineName: '', quantity: 1 }); // Reset order details for this supplier
  };

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    if (orderDetails.quantity <= 0 || !orderDetails.medicineName) {
      alert("Please enter a valid medicine name and quantity.");
      return;
    }

    try {
      const res = await fetch(`/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supplierId: orderingSupplier, ...orderDetails }),
      });
      const data = await res.json();

      if (data.success) {
        alert('Order placed successfully!');
        setOrderingSupplier(null); // Close the order modal after success
      } else {
        console.error('Error placing order:', data.message);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-200"> <p className="text-2xl animate-pulse">Loading...</p>;</div>;

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-200">
      <Header />
      <h1 className="text-4xl font-semibold text-center mb-6 pt-5">Suppliers</h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => router.push('/suppliers/add')}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
        >
          Add New Supplier
        </button>
      </div>

      <table className="table-auto w-full text-left shadow-lg rounded-lg overflow-hidden bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-4">Supplier Name</th>
            <th className="px-6 py-4">Contact Name</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Phone</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <React.Fragment key={supplier._id}>
                <tr className="border-t hover:bg-gray-100">
                  <td className="px-6 py-4">{supplier.supplierName}</td>
                  <td className="px-6 py-4">{supplier.contactName}</td>
                  <td className="px-6 py-4">{supplier.contactEmail}</td>
                  <td className="px-6 py-4">{supplier.contactPhone}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600"
                      onClick={() => handleOrderClick(supplier)}
                    >
                      Order
                    </button>
                  </td>
                </tr>

                {/* Conditionally render the order form for this supplier */}
                {orderingSupplier === supplier._id && (
                  <tr className="bg-gray-100">
                    <td colSpan="5" className="px-6 py-4">
                      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Place Order for {supplier.supplierName}</h2>
                        <div>
                          <label className="block mb-2">Medicine Name</label>
                          <input
                            type="text"
                            name="medicineName"
                            value={orderDetails.medicineName}
                            onChange={handleOrderInputChange}
                            className="border p-3 w-full mb-4 rounded-lg shadow-sm"
                            placeholder="Enter medicine name"
                          />
                          <label className="block mb-2">Quantity</label>
                          <input
                            type="number"
                            name="quantity"
                            value={orderDetails.quantity}
                            onChange={handleOrderInputChange}
                            className="border p-3 w-full mb-4 rounded-lg shadow-sm"
                            min="1"
                          />
                          <button
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600"
                            onClick={handlePlaceOrder}
                          >
                            Place Order
                          </button>
                          <button
                            className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md ml-2 hover:bg-gray-600"
                            onClick={() => setOrderingSupplier(null)}
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
                No suppliers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SuppliersPage;
