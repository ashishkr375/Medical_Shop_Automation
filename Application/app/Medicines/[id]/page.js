"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const MedicineDetailPage = () => {
  const [medicine, setMedicine] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    const fetchMedicine = async () => {
      const res = await fetch(`/api/medicines/${id}`);
      const data = await res.json();
      setMedicine(data);
    };
    fetchMedicine();
  }, [id]);

  const handleDelete = async () => {
    const res = await fetch(`/api/medicines/${id}`, { method: 'DELETE' });
    if (res.status === 204) {
      router.push('/medicines');
    } else {
      alert('Failed to delete medicine');
    }
  };

  if (!medicine) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center mb-6">Medicine Details</h1>
      <div className="space-y-4 max-w-md mx-auto">
        <div>
          <label className="block text-gray-600">Name</label>
          <p className="p-3 border border-gray-300 rounded-lg">{medicine.name}</p>
        </div>
        <div>
          <label className="block text-gray-600">Description</label>
          <p className="p-3 border border-gray-300 rounded-lg">{medicine.description}</p>
        </div>
        <div>
          <label className="block text-gray-600">Quantity</label>
          <p className="p-3 border border-gray-300 rounded-lg">{medicine.quantity}</p>
        </div>
        <div>
          <label className="block text-gray-600">Price</label>
          <p className="p-3 border border-gray-300 rounded-lg">${medicine.price}</p>
        </div>
        <div>
          <label className="block text-gray-600">Expiry Date</label>
          <p className="p-3 border border-gray-300 rounded-lg">{new Date(medicine.expiryDate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="mt-6 flex gap-4 justify-center">
        <button
          onClick={() => router.push(`/medicines/edit/${medicine._id}`)}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MedicineDetailPage;
