"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaUser, FaBars, FaEnvelope, FaMoneyBillWave, FaCalendarAlt, FaFileDownload, FaBell, FaPhoneAlt, FaPills, FaSearch, FaBoxOpen, FaListAlt, FaCog, FaUserPlus } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { IoMdCreate } from "react-icons/io";
import { BsCheckCircle, BsFillXCircleFill } from "react-icons/bs";
import Header from "./Header";

const MedicalShopDashboard = () => {
  const { data: session } = useSession();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  
  const [staff, setStaff] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleDownloadBill = () => {
    toast.success("Downloading Invoice...");
  };

  const handleStaffAttendanceChange = (staffId, status) => {
    const updatedAttendance = attendance.map((entry) =>
      entry.staffId === staffId ? { ...entry, status } : entry
    );
    setAttendance(updatedAttendance);
  };

  useEffect(() => {
    
    setStaff([
      { id: 1, name: "Ravi Kumar", position: "Pharmacist" },
      { id: 2, name: "Priya Sharma", position: "Manager" },
      { id: 3, name: "Amit Verma", position: "Cashier" },
      { id: 4, name: "Rajesh Yadav", position: "Security" },
      { id: 5, name: "Sita Patel", position: "Assistant" },
      { id: 6, name: "Neha Singh", position: "Cleaner" },
      { id: 7, name: "Rahul Sharma", position: "Pharmacist" },
      { id: 8, name: "Priya Singh", position: "Manager" },
      
    ]);
    setAttendance([
      { staffId: 1, status: "Present" },
      { staffId: 2, status: "Absent" },
      { staffId: 3, status: "Present" },
      { staffId: 4, status: "Present" },
      { staffId: 5, status: "Absent" },
      { staffId: 6, status: "Present" },
      { staffId: 7, status: "Present" },
      { staffId: 8, status: "Absent" },
      
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-200 p-6 text-black">
      <Toaster />
      <div className="max-w-7xl mx-auto space-y-8">
      <Header/>


   
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Your Details</h2>
            <div className="space-y-4">
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
          </section>

         
<section id="invoice" className="bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-blue-800 mb-4">Invoice Generation</h2>
  
 
  <div className="space-y-4 mb-6">
    <div className="flex flex-col">
      <label htmlFor="billNumber" className="text-gray-700 font-semibold mb-2">
        Enter Bill Number
      </label>
      <input
        id="billNumber"
        type="text"
        placeholder="Enter Bill No."
        className="w-full  py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  </div>

  
  <div className="flex gap-4">
    
    <button
      onClick={() => toast.success("Payment has been marked as done.")}
      className="bg-green-500 text-neutral-800 py-2 px-6 rounded-lg hover:bg-green-700 hover:text-white flex items-center justify-center w-full font-semibold"
    >
      <BsCheckCircle className="mr-2" /> Make Payment
    </button>
    
    
    <button
      onClick={handleDownloadBill}
      className="bg-teal-500 text-neutral-800 py-2 px-6 rounded-lg hover:bg-teal-800 hover:text-white flex items-center justify-center w-full"
    >
      <FaFileDownload className="mr-2" /> Generate Invoice
    </button>
  </div>
</section>


         
          <section id="medicine-check" className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Medicine Check</h2>
            <div className="flex items-center">
              <FaPills className="text-purple-500 text-xl mr-2" />
              <input
                type="text"
                placeholder="Search Medicine"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mt-4">
              <button className="w-full bg-purple-500 text-neutral-800 py-2 rounded-lg hover:bg-purple-600 transition duration-200 flex items-center justify-center">
                <FaSearch className="mr-2" /> Search
              </button>
            </div>
          </section>

<section id="staff-management" className="bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-blue-800 mb-4">Staff Management</h2>
  

  <div className="space-y-4 mb-6">
    
    <div className="flex items-center gap-3">
      <FaListAlt className="text-yellow-500 text-xl" />
      <span className="font-semibold"> Download Staff List 📩</span>
    </div>
  </div>

  <div className="space-y-4 mb-6">
    <div className="flex flex-col">
      <label htmlFor="name" className="text-gray-700 font-semibold mb-2">Name</label>
      <input
        id="name"
        type="text"
        placeholder="Enter Staff Name"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
    
    <div className="flex flex-col">
      <label htmlFor="email" className="text-gray-700 font-semibold mb-2">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Enter Staff Email"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
    
    <div className="flex flex-col">
      <label htmlFor="phone" className="text-gray-700 font-semibold mb-2">Phone Number</label>
      <input
        id="phone"
        type="tel"
        placeholder="Enter Staff Phone Number"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
    
    <div className="flex flex-col">
      <label htmlFor="department" className="text-gray-700 font-semibold mb-2">Department</label>
      <select
        id="department"
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option value="Pharmacy">Pharmacy</option>
        <option value="Management">Management</option>
        <option value="Sales">Sales</option>
        <option value="Security">Security</option>
        <option value="Cleaning">Cleaning</option>
        <option value="Assistant">Assistant</option>
      </select>
    </div>
  </div>
  


  <button className="w-full bg-green-500 text-neutral-800 py-2 rounded-lg hover:bg-green-600 transition duration-200 flex items-center justify-center">
    <FaUserPlus className="mr-2" /> Add Staff
  </button>
</section>


         
          <section id="attendance-management" className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Staff Attendance</h2>
            
            <div className="space-y-4">
              {staff.map((member) => (
                <div key={member.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <FaUser className="text-teal-500 text-xl" />
                    <span className="font-semibold">{member.name} ({member.position})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className={`${
                        attendance.find((entry) => entry.staffId === member.id)?.status === "Present"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white px-4 py-2 rounded-lg`}
                      onClick={() => handleStaffAttendanceChange(member.id, attendance.find((entry) => entry.staffId === member.id)?.status === "Present" ? "Absent" : "Present")}
                    >
                      {attendance.find((entry) => entry.staffId === member.id)?.status === "Present"
                        ? "Mark Absent"
                        : "Mark Present"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

         
          <section id="calendar" className="bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-blue-800 mb-4">Calendar</h2>
  <Calendar
    value={currentDate}
    onChange={setCurrentDate}
    className="react-calendar p-2"
    tileClassName={({ date, view }) =>
      view === "month" && date.toDateString() === new Date().toDateString()
        ? "bg-teal-600 text-neutral-800 font-bold px-2 mx-2 p-2 m-2"
        : ""
    }
  />

  <div className="mt-2 space-y-4">
    <h3 className="text-sm font-semibold text-blue-800">Upcoming Events</h3>

    
    <div className="bg-gray-100 p-4 rounded-lg shadow-md text-sm">
      <h4 className="font-semibold text-blue-800">Staff Meeting</h4>
      <p className="text-gray-700">Date: December 1, 2024</p>
      <p className="text-gray-600">Time: 10:00 AM</p>
      <p className="text-gray-600">Description: Monthly staff meeting to discuss goals, issues, and improvements.</p>
    </div>

   
  </div>
</section>


         
          <section className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-blue-500 text-neutral-800 py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center">
                <FaListAlt className="mr-2" /> Generate Report
              </button>
              <button className="bg-blue-500 text-neutral-800 py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center">
                <FaBell className="mr-2" /> Notifications
              </button>
              <button className="bg-blue-500 text-neutral-800 py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center">
                <BsCheckCircle className="mr-2" /> Approve Orders
              </button>
              <button className="bg-blue-500 text-neutral-800 py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center">
                <BsFillXCircleFill className="mr-2" /> Decline Orders
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MedicalShopDashboard;
