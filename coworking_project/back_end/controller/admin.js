import User from "../models/user.js";

// Get all users (only accessible by admin)
export const getAllUsers = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Get a single user by ID (only accessible by admin)
export const getUserById = async (req, res, next) => {
  try {
    // Find a user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found.");
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Delete a user by ID (only accessible by admin)
export const deleteUserById = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json("User not found.");
    }
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

// Update a user's details (only accessible by admin)
export const updateUserById = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json("User not found.");
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};


