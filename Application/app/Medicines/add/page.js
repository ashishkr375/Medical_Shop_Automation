"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

const AddMedicinePage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/medicines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, quantity, price, expiryDate }),
    });

    const data = await res.json();
    if (res.status === 200) {
      router.push('/Medicines');
    } else {
      alert('Failed to add medicine');
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-200">
      <Header/>
      <h1 className="text-4xl font-semibold text-center mb-6 pt-5">Add New Medicine</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <label className="block text-gray-600">Medicine Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Description</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Quantity</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Price</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Expiry Date</label>
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add Medicine
          </button>
          <button
            type="button"
            onClick={() => router.push('/Medicines')}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicinePage;
