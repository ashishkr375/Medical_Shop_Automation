"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaUser, FaEnvelope, FaMoneyBillWave, FaCalendarAlt, FaFileDownload, FaBell, FaPhoneAlt } from "react-icons/fa";
import { HiStatusOnline } from "react-icons/hi";
import { IoMdCreate } from "react-icons/io";
import { BsCheckCircle, BsFillXCircleFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

const CustomerDashboard = () => {
  const { data: session } = useSession();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [menu, setMenu] = useState({});
  const [todayMenu, setTodayMenu] = useState({ breakfast: [], lunch: [], dinner: [] });

  useEffect(() => {
    // Simulate fetching data
    setMenu({}); // Add logic for fetching data in production
  }, [currentDate]);

  const handleDownloadBill = () => {
    toast.success("Downloading Invoice...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-200 p-6">
      <Toaster />
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Customer Details */}
        <div className="bg-sky-200 shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Welcome, {session?.user?.name || "Customer"}!</h1>
            <p className="text-gray-600">Email: {session?.user?.email || "Not Available"}</p>
            <div className="flex items-center gap-2 mt-3">
              <HiStatusOnline className="text-teal-500 text-xl" />
              <span className="text-sm text-gray-500">Status: Active</span>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg"
          >
            Log Out
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="bg-gray-100 shadow-lg  rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Calendar</h2>
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

          {/* Invoices */}
          <div className="bg-gray-100 shadow-lg rounded-lg p-6 md:col-span-1">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Recent Invoices</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-gray-600">Invoice #12345</h3>
                <p className="text-gray-700">Total: ₹ 500.00</p>
                <p className="text-gray-500 text-sm">Date: Nov 15, 2024</p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-600">Invoice #12346</h3>
                <p className="text-gray-700">Total: ₹ 800.00</p>
                <p className="text-gray-500 text-sm">Date: Nov 16, 2024</p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-600">Invoice #12347</h3>
                <p className="text-gray-700">Total: ₹ 300.00</p>
                <p className="text-gray-500 text-sm">Date: Nov 17, 2024</p>
              </div>
            </div>
          </div>

          {/* Billed Amount */}
          <div className="bg-gray-100 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Total Billed Amount</h2>
            <p className="text-gray-700 font-semibold text-lg">₹ 1,234.56</p>
            <div className="mt-4">
              <h3 className="font-semibold text-gray-600">Payment Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Medicine Charges:</span>
                  <span className="text-gray-700">₹ 1,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes:</span>
                  <span className="text-gray-700">₹ 100.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discounts:</span>
                  <span className="text-gray-700">- ₹ 50.00</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-gray-800">₹ 1,234.56</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleDownloadBill}
              className="mt-4 bg-teal-700 text-white py-2 px-6 rounded-lg hover:bg-teal-800 flex items-center"
            >
              <FaFileDownload className="mr-2" /> Download Invoice
            </button>
          </div>
        </div>

        {/* Additional User Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Customer Details</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <FaUser className="text-teal-500 text-xl" />
                <span className="font-semibold">Name:</span> {session?.user?.name || "Not Available"}
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-teal-500 text-xl" />
                <span className="font-semibold">Email:</span> {session?.user?.email || "Not Available"}
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-teal-500 text-xl" />
                <span className="font-semibold">Phone:</span> {session?.user?.phone || "Not Available"}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-gray-100 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Statistics</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-gray-600">Monthly Purchases</h3>
                <p className="text-gray-700">₹ 3,000.00</p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-600">Pending Payments</h3>
                <p className="text-red-600">₹ 234.56</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
