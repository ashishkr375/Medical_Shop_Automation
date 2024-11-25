"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaFileDownload, 
  FaPills, 
  FaBoxOpen, 
  FaBell 
} from "react-icons/fa";
import { HiStatusOnline } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";

const MedicalDashboard = () => {
  const { data: session } = useSession();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [inventoryStats, setInventoryStats] = useState({
    lowStock: 15,
    expiredItems: 5,
    totalStock: 200,
  });

  useEffect(() => {
    // Simulate fetching inventory stats
    setInventoryStats({
      lowStock: 15,
      expiredItems: 5,
      totalStock: 200,
    });
  }, []);

  const handleDownloadReport = () => {
    // Logic to download monthly sales report
    toast.success("Downloading Monthly Sales Report...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-green-200 p-6">
      <Toaster />
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with User Details */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-teal-700">
              Welcome, {session?.user?.name || "User"}!
            </h1>
            <p className="text-gray-600">Email: {session?.user?.email || "Not Available"}</p>
            <div className="flex items-center gap-2 mt-3">
              <HiStatusOnline className="text-green-500 text-xl" />
              <span className="text-sm text-gray-500">Status: Active</span>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-lg"
          >
            Log Out
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-teal-700 mb-4">Calendar</h2>
            <Calendar
              value={currentDate}
              onChange={setCurrentDate}
              className="react-calendar m-2 p-2 md:mt-20"
              tileClassName={({ date, view }) =>
                view === "month" && date.toDateString() === new Date().toDateString()
                  ? "bg-teal-600 text-white font-bold"
                  : ""
              }
            />
          </div>

          {/* Inventory Stats */}
          <div className="bg-white shadow-lg rounded-lg p-6 md:col-span-1">
            <h2 className="text-xl font-bold text-teal-700 mb-4">Inventory Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-gray-700">Low Stock Items:</span>
                <span className="text-red-500 font-semibold">{inventoryStats.lowStock}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-gray-700">Expired Items:</span>
                <span className="text-orange-500 font-semibold">{inventoryStats.expiredItems}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-gray-700">Total Items in Stock:</span>
                <span className="text-green-600 font-semibold">{inventoryStats.totalStock}</span>
              </div>
            </div>
          </div>

          {/* Sales Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-teal-700 mb-4">Sales Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Today's Sales:</span>
                <span className="text-gray-700">₹ 5,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">This Month:</span>
                <span className="text-gray-700">₹ 1,20,000</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-gray-600">Total Revenue:</span>
                <span className="text-teal-800">₹ 12,34,567</span>
              </div>
            </div>

            <button
              onClick={handleDownloadReport}
              className="mt-4 bg-teal-800 text-white py-2 px-6 rounded-lg hover:bg-teal-900 flex items-center"
            >
              <FaFileDownload className="mr-2" /> Download Sales Report
            </button>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Details */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Customer Details</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <FaUser className="text-teal-600 text-xl" />
                <span className="font-semibold">Name:</span> {session?.user?.name || "Not Available"}
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-teal-600 text-xl" />
                <span className="font-semibold">Email:</span> {session?.user?.email || "Not Available"}
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-teal-600 text-xl" />
                <span className="font-semibold">Phone:</span> +91-9876543210
              </div>
              <div className="flex items-center gap-3">
                <FaBell className="text-teal-600 text-xl" />
                <span className="font-semibold">Notifications:</span> You have 2 pending orders
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Notifications</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FaPills className="text-green-500" />
                <span className="text-sm text-gray-700">New stock added for Paracetamol</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBoxOpen className="text-orange-500" />
                <span className="text-sm text-gray-700">Low stock alert: Cough Syrup</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBell className="text-red-500" />
                <span className="text-sm text-gray-700">Order #123 delayed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;
