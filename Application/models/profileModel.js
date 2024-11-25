import mongoose, { Schema, models } from "mongoose";

const profileSchema = new Schema(
  {
    userEmail: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dob: { type: Date, required: true },
  },
  { timestamps: true }
);

const Profile = models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
