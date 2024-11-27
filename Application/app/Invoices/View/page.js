"use client";
import { useEffect, useState } from 'react';
import { FaPlus, FaSave, FaBars ,FaUser , FaCalendarAlt,FaEnvelope ,FaCity, FaPhoneAlt, FaAddressBook, FaUserAlt } from 'react-icons/fa';
import { signOut } from "next-auth/react";
import Header from '@/components/Header';
export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

 
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

 
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('/api/invoices');
        if (!response.ok) {
          throw new Error('Failed to fetch invoices');
        }
        const data = await response.json();
        if (data.success) {
          setInvoices(data.invoices);
        } else {
          throw new Error('Error fetching invoices: ' + data.message);
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);


  const renderTable = () => {
    if (filteredInvoices.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center py-4 text-lg text-gray-500">
            No invoices found.
          </td>
        </tr>
      );
    }

    return filteredInvoices.map((invoice) => (
      <tr key={invoice._id} className="hover:bg-gray-50">
        <td className="text-center py-4">{invoice._id}</td>
        <td className="py-4">{invoice.customer.customerName}</td>
        <td className="py-4">{invoice.customer.email}</td>
        <td className="py-4 text-center">₹ {invoice.totalAmount}</td>
        <td className="py-4 text-center">₹ {invoice.discountAmount}</td>
        <td className="py-4 text-center">
          {invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : 'N/A'}
        </td>
        <td className="py-4 text-center">{invoice.paymentStatus}</td>
      </tr>
    ));
  };

  return (
    <div className="container mx-auto p-8 min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-100">
     <Header/>
      <div className="mb-8 text-center pt-5">
        <h1 className="text-4xl font-bold text-teal-800 mb-4">Invoices</h1>
        <p className="text-lg text-gray-600">Manage and view all your invoices</p>
      </div>

    
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by Customer Name or Email"
          className="w-full max-w-md p-4 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      
      {loading ? (
        <div className="text-center py-4 text-lg text-gray-500">Loading invoices...</div>
      ) : error ? (
        <div className="text-center py-4 text-lg text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          
          <table className=" max-w-7xl mx-auto bg-blue-50 shadow-md rounded-lg overflow-hidden border-2 border-gray-800">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Invoice ID</th>
                <th className="py-3 px-6 text-left">Customer Name</th>
                <th className="py-3 px-6 text-left">Customer Email</th>
                <th className="py-3 px-6 text-center">Total Amount</th>
                <th className="py-3 px-6 text-center">Discount Amount</th>
                <th className="py-3 px-6 text-center">Date</th>
                <th className="py-3 px-6 text-center">Payment Status</th>
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
