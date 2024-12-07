import User from "../models/user.js";

// Create a new user
export const createUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body); // Initialize a new User instance with data from the request body
    const savedUser = await newUser.save(); // Save the user to the database
    res.status(201).json(savedUser); // Return the created user with a 201 status
  } catch (err) {
    next(err); // Pass the error to the error-handling middleware
  }
};

// Update an existing user
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // Return the updated document
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Delete a user
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

// Get a single user by ID
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
