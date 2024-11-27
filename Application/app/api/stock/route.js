import { connectMongoDB } from "@/lib/mongodb";
import Medicine from "@/models/stock";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
    await connectMongoDB();
  
    const { method } = req;
  
    switch (method) {
      case 'GET': 
        try {
          const medicines = await Medicine.find();
          res.status(200).json({ success: true, data: medicines });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
        break;
  
      case 'POST': 
        try {
          const medicine = await Medicine.create(req.body);
          res.status(201).json({ success: true, data: medicine });
          return NextResponse.json({
            success: true,
            medicine,
          });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
        break;
  
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
        break;
    }
  }