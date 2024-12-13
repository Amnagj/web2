import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
    default: null, // Initialize as null until the user logs in for the first time
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create and export the model
const User = mongoose.model("User", userSchema);
export default User;
