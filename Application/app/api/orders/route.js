import { connectMongoDB } from "@/lib/mongodb";
import Order from "@/models/Order"; 
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { supplierId, medicineName, quantity } = await req.json();

  try {
    await connectMongoDB();
    const order = await Order.create({
      supplierId,
      medicineName,
      quantity,
      status: 'Pending', 
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
