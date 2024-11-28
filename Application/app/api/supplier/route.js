import { connectMongoDB } from "@/lib/mongodb";
import Supplier from "@/models/Supplier"; 
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const {
    supplierName,
    contactName,
    contactEmail,
    contactPhone,
    address,
  } = await req.json();

  if (!supplierName || !contactName || !contactEmail || !contactPhone || !address) {
    return NextResponse.json(
      {
        success: false,
        message: "All fields are required.",
      },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();
    const supplier = await Supplier.create({
      supplierName,
      contactName,
      contactEmail,
      contactPhone,
      address,
    });
    return NextResponse.json(
      {
        success: true,
        supplier,
      },
      { status: 201 }
    );
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

export const GET = async () => {
  try {
    await connectMongoDB();
    const suppliers = await Supplier.find();
    return NextResponse.json({
      success: true,
      suppliers,
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
