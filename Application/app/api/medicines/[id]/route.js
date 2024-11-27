import { connectMongoDB } from "@/lib/mongodb";
import Medicine from "@/models/stock";

export default async function handler(req, res) {
  await connectMongoDB();
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const medicine = await Medicine.findById(id);
        if (!medicine) {
          return res.status(404).json({ success: false, message: "Medicine not found" });
        }
        res.status(200).json({ success: true, data: medicine });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "PUT":
      try {
        const updatedMedicine = await Medicine.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedMedicine) {
          return res.status(404).json({ success: false, message: "Medicine not found" });
        }
        res.status(200).json({ success: true, data: updatedMedicine });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "DELETE":
      try {
        const deletedMedicine = await Medicine.findByIdAndDelete(id);
        if (!deletedMedicine) {
          return res.status(404).json({ success: false, message: "Medicine not found" });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).json({ success: false, message: `Method ${method} not allowed` });
      break;
  }
}
