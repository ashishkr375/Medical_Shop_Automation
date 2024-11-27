import { connectMongoDB } from "@/lib/mongodb";
import Medicine from "@/models/Medicine";
import { NextResponse } from "next/server";

// GET method to fetch a single medicine by ID
export async function GET(req, { params }) {
  const { id } = params; // Get the medicine ID from the URL params

  try {
    await connectMongoDB(); // Connect to MongoDB
    const medicine = await Medicine.findById(id); // Find the medicine by ID

    if (!medicine) {
      return NextResponse.json(
        { success: false, message: "Medicine not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, medicine });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT method to update medicine by ID
export async function PUT(req, { params }) {
  const { id } = params; // Get the medicine ID from the URL params
  const { name, quantity, price, expiryDate } = await req.json(); // Get the new data from the request body

  try {
    await connectMongoDB(); // Connect to MongoDB

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      id,
      { name, quantity, price, expiryDate },
      { new: true }
    ); // Update the medicine in the DB

    if (!updatedMedicine) {
      return NextResponse.json(
        { success: false, message: "Medicine not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, medicine: updatedMedicine });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE method to delete medicine by ID
export async function DELETE(req, { params }) {
  const { id } = params; // Get the medicine ID from the URL params

  try {
    await connectMongoDB(); // Connect to MongoDB

    const deletedMedicine = await Medicine.findByIdAndDelete(id); // Delete the medicine from the DB

    if (!deletedMedicine) {
      return NextResponse.json(
        { success: false, message: "Medicine not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
