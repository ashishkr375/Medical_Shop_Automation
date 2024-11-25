import { connectMongoDB } from "@/lib/mongodb";
import Profile from '@/models/profileModel';
import { getSession } from 'next-auth/react';

connectMongoDB();

export const GET = async (req) => {
    const session = await getSession({ req });
  
    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
  
    try {
      const profile = await Profile.findOne({ userEmail: session.user.email });
      if (!profile) {
        return new Response(JSON.stringify({ message: 'Profile not found' }), { status: 404 });
      }
      return new Response(JSON.stringify(profile), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Error fetching profile' }), { status: 500 });
    }
  };
  
  export const PUT = async (req) => {
    const session = await getSession({ req });
  
    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
  
    const { name, phone, department, address, gender, dob } = await req.json();
  
    if (!name || !phone || !department || !address || !gender || !dob) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    }
  
    try {
      const profile = await Profile.findOne({ userEmail: session.user.email });
      if (!profile) {
        return new Response(JSON.stringify({ message: 'Profile not found' }), { status: 404 });
      }
  
      profile.name = name;
      profile.phone = phone;
      profile.department = department;
      profile.address = address;
      profile.gender = gender;
      profile.dob = dob;
  
      await profile.save();
  
      return new Response(JSON.stringify({ message: 'Profile updated successfully' }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Error updating profile' }), { status: 500 });
    }
  };