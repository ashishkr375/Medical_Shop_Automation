import { connectMongoDB } from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  const {
    billerName,
    customer,
    items,
    discountPercentage,
    totalAmount,
    discountAmount,
    dueDate,
    paymentStatus,
  } = await req.json();

  try {
    
    await connectMongoDB();

    
    const invoice = await Invoice.create({
      billerName,
      customer,
      items,
      discountPercentage,
      totalAmount,
      discountAmount,
      dueDate,
      paymentStatus,
      createdAt: new Date(),
    });

    
    return NextResponse.json({
      success: true,
      invoice,
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


export const GET = async () => {
  try {
    
    await connectMongoDB();

   
    const invoices = await Invoice.find();

    
    return NextResponse.json({
      success: true,
      invoices,
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
