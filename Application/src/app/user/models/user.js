import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true, required: false }, // Optional, or ensure it's populated
  password: { type: String, required: true }
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
