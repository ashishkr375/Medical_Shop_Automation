"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

const AddSupplierPage = () => {
  const [supplierName, setSupplierName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/supplier', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ supplierName, contactName, contactEmail, contactPhone, address }),
    });

    const data = await res.json();
    if (res.status === 200) {
      router.push('/Suppliers');
    } else {
      alert('Failed to add supplier');
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-200">
      <Header />
      <h1 className="text-4xl font-semibold text-center mb-6 pt-5">Add New Supplier</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <label className="block text-gray-600">Supplier Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Contact Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Contact Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Contact Phone</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Address</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add Supplier
          </button>
          <button
            type="button"
            onClick={() => router.push('/Suppliers')}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSupplierPage;
