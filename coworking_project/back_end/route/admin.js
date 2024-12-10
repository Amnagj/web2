import express from "express";

import {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} from "../controller/admin.js";
import { verifyToken } from "../controller/verifyToken.js"; // Corrected import
import { verifyAdmin } from "../controller/verifyadmin.js";

const router = express.Router();

// Routes that only admin can access
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.get("/users/:id", verifyToken, verifyAdmin, getUserById);
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUserById);
router.put("/users/:id", verifyToken, verifyAdmin, updateUserById);

export default router;
