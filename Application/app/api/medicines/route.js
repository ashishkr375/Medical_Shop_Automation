import { connectMongoDB } from "@/lib/mongodb";
import Medicine from "@/models/stock";

// Connect to the database before handling any requests
async function connectDB() {
  await connectMongoDB();
}

// Handle GET requests: Fetch all medicines
export async function GET(req) {
  await connectDB();

  try {
    const medicines = await Medicine.find();
    return new Response(JSON.stringify({ success: true, data: medicines }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Handle POST requests: Add a new medicine
export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json(); // Parse JSON body
    const medicine = await Medicine.create(body);
    return new Response(JSON.stringify({ success: true, data: medicine }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Handle unsupported methods
export function OPTIONS() {
  return new Response("Method Not Allowed", { status: 405 });
}
