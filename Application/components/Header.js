"use client"
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import React from 'react'
import { signOut } from "next-auth/react";
import { FaUser, FaBars, FaEnvelope, FaMoneyBillWave, FaCalendarAlt, FaFileDownload, FaBell, FaPhoneAlt, FaPills, FaSearch, FaBoxOpen, FaListAlt, FaCog, FaUserPlus } from "react-icons/fa";

function Header() {
    const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
    <div className='max-w-6xl mx-auto'>
       <header className="bg-blue-900 p-4 flex justify-between items-center rounded-lg shadow-md">
  <h1 className="text-white text-3xl font-bold"><a href='/dashboard'>Medical Shop Dashboard</a></h1>
  <nav className="flex space-x-4 items-center">
  {/* Menu Button for Mobile */}
  <button onClick={toggleMenu} className="text-white text-xl md:hidden">
    <FaBars />
  </button>

  {/* Navigation Links */}
  <ul className={`${menuOpen ? "block" : "hidden"} md:flex md:items-center md:space-x-6`}>
    <li>
      <button className="text-white text-sm md:text-base py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out border-2 border-transparent border-blue-500">
        <a href='/Invoices'>Invoice Generation</a>
      </button>
    </li>
    <li>
      <button className="text-white text-sm md:text-base py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out border-2 border-transparent border-blue-500">
        <a href='/Medicines'>Medicine Check</a>
      </button>
    </li>
    <li>
      <button className="text-white text-sm md:text-base py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out border-2 border-transparent border-blue-500">
        Alternative Medicine
      </button>
    </li>
    <li>
      <button className="text-white text-sm md:text-base py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out border-2 border-transparent border-blue-500">
        <a href='/suppliers'>Stock Management</a>
      </button>
    </li>
    <li>
      <button className="text-white text-sm md:text-base py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out border-2 border-transparent border-blue-500">
        Staff Management
      </button>
    </li>
  </ul>

  {/* Profile Menu */}
  <div className="relative">
    <button onClick={toggleProfileMenu} className="text-white text-xl">
      <FaUser />
    </button>
    {showProfileMenu && (
      <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-48">
        <ul>
          <li>
            <button className="py-2 px-4 w-full text-gray-700 hover:bg-gray-200 text-left">
              <a href="/profile">View Profile</a>
            </button>
          </li>
          <li>
            <button className="py-2 px-4 w-full text-gray-700 hover:bg-gray-200 text-left">
              Settings
            </button>
          </li>
          <li>
            <button
              className="py-2 px-4 w-full text-gray-700 hover:bg-gray-200 text-left"
              onClick={() => signOut()}
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    )}
  </div>
</nav>

</header>
       </div>
    </>
  )
}

export default Header