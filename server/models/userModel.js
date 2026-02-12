import mongoose from 'mongoose';
// -------------------- Model --------------------
const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, maxlength: 80 },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: { type: String, required: true, select: false }, // 👈 do not return by default
  },
  { timestamps: true },
);
const User = mongoose.model('User', userSchema);
export default User;
