import { connectMongoDB } from "@/lib/mongodb";
import Medicine from "@/models/Medicine";
import { NextResponse } from "next/server";

// GET handler
export async function GET(req, { params }) {
  const { id } = params;
  try {
    await connectMongoDB();
    const medicine = await Medicine.findById(id);

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

// PUT handler
export async function PUT(req, { params }) {
  const { id } = params;
  const { name, quantity, price, expiryDate } = await req.json();

  try {
    await connectMongoDB();

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      id,
      { name, quantity, price, expiryDate },
      { new: true }
    );

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

// DELETE handler
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await connectMongoDB();
    const deletedMedicine = await Medicine.findByIdAndDelete(id);

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
