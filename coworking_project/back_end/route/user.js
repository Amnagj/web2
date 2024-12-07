import express from "express";
import { createUser, updateUser, deleteUser, getUser, getUsers } from "../controller/user.js";

const router = express.Router();

// Create a user
router.post("/", createUser);

// Update a user
router.put("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

// Get a single user
router.get("/:id", getUser);

// Get all users
router.get("/", getUsers);

export default router;
