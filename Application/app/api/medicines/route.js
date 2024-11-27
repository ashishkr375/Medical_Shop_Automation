// pages/api/medicines/index.js

import { connectMongoDB } from "@/lib/mongodb"; // Database connection
import Medicine from "@/models/Medicine"; // Medicine model
import { NextResponse } from "next/server";

// POST method to add a new medicine
export const POST = async (req) => {
  const { name, description, quantity, price, expiryDate } = await req.json();

  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Create a new medicine document
    const medicine = await Medicine.create({
      name,
      description,
      quantity,
      price,
      expiryDate,
      createdAt: new Date(),
    });

    // Return the response
    return NextResponse.json({
      success: true,
      medicine,
    });
  } catch (error) {
    // Handle errors
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
};

// pages/api/medicines/index.js (GET method)
export const GET = async () => {
  try {
    await connectMongoDB();
    const medicines = await Medicine.find(); // This should return an array of medicines

    return NextResponse.json({
      success: true,
      medicines, // Make sure this is an array
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
};
