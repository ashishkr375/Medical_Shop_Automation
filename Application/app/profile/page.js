"use client"
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signOut } from "next-auth/react";
import Header from '@/components/Header';
const ProfilePage = () => {
  const { data: session } = useSession();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    address: '',
    gender: 'Male',
    dob: '',
  });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (session) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/profile');
      setProfile(res.data);
    } catch (error) {
      toast.error('Failed to fetch profile');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put('/api/profile', profile);
      toast.success(res.data.message);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to update profile');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  return (
    <div className=" bg-white rounded-lg shadow-lg min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-200 p-6 text-black">
       <Header/>
        
     <div className='mt-5 max-w-6xl mx-auto bg-white p-5 rounded-lg'>
     <h2 className="text-2xl font-semibold text-blue-800 mb-6">Update Your Profile</h2>
     <form onSubmit={handleSubmit} className="space-y-6">
  {/* Full Name and Phone */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div>
      <label htmlFor="name" className="block text-lg font-medium text-gray-700">Full Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={session?.user?.name}
        onChange={handleChange}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      />
    </div>
    <div>
      <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Phone</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={profile.phone}
        onChange={handleChange}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      />
    </div>
  </div>

  {/* Email and Department */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div>
      <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={session?.user?.email}
        onChange={handleChange}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        disabled
      />
    </div>
    <div>
      <label htmlFor="department" className="block text-lg font-medium text-gray-700">Department</label>
      <input
        type="text"
        id="department"
        name="department"
        value={profile.department}
        onChange={handleChange}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      />
    </div>
  </div>

  {/* Address (Full Width) */}
  <div>
    <label htmlFor="address" className="block text-lg font-medium text-gray-700">Address</label>
    <textarea
      id="address"
      name="address"
      value={profile.address}
      onChange={handleChange}
      className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      required
    />
  </div>

  {/* Gender and Date of Birth */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div>
      <label htmlFor="gender" className="block text-lg font-medium text-gray-700">Gender</label>
      <select
        id="gender"
        name="gender"
        value={profile.gender}
        onChange={handleChange}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div>
      <label htmlFor="dob" className="block text-lg font-medium text-gray-700">Date of Birth</label>
      <input
        type="date"
        id="dob"
        name="dob"
        value={profile.dob}
        onChange={handleChange}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      />
    </div>
  </div>

  {/* Submit Button */}
  <div className="flex justify-end">
    <button
      type="submit"
      disabled={loading}
      className="mt-4 bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition duration-200"
    >
      {loading ? 'Updating...' : 'Update Profile'}
    </button>
  </div>
</form>

     </div>
    </div>
  );
};

export default ProfilePage;
