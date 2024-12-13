import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} from "../controller/admin.js";
import { verifyToken } from "../controller/verifyToken.js";
import { verifyAdmin } from "../controller/verifyadmin.js";
import User from "../models/user.js";

const router = express.Router();

// Admin-only user routes
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.get("/users/:id", verifyToken, verifyAdmin, getUserById);
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUserById);
router.put("/users/:id", verifyToken, verifyAdmin, updateUserById);

// Users over time
router.get("/users/over-time", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: { $substr: ["$createdAt", 0, 7] }, // Group by year-month
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user data." });
  }
});

// Active/inactive users
router.get("/users/active-status", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeUsers = await User.countDocuments({ lastLogin: { $gte: thirtyDaysAgo } });
    const totalUsers = await User.countDocuments({});
    const inactiveUsers = totalUsers - activeUsers;

    res.json({ activeUsers, inactiveUsers });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user status." });
  }
});

export default router;
