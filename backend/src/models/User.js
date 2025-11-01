import mongoose from "mongoose";

// Define the schema for User
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // ensures no duplicate emails
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please provide a valid email address",
      ],
    },
    password: {
  type: String,
  required: [true, "Password is required"],
  minlength: [6, "Password must be at least 6 characters long"],
},

  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Create the model
const User = mongoose.model("User", userSchema);

export default User;
