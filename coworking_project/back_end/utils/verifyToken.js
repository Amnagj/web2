import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js"; // Utility for creating custom errors

// Middleware to verify a token
export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token; // Extract token from cookies
    if (!token) {
      return next(createError(401, "You are not authenticated!")); // Token not found
    }

    // Verify the token
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) {
        console.error("JWT verification error:", err); // Log the error for debugging
        return next(createError(403, "Token is not valid!"));
      }

      req.user = user; // Attach decoded user data to the request
      next(); // Proceed to the next middleware
    });
  } catch (error) {
    console.error("Error in verifyToken middleware:", error); // Catch unexpected errors
    next(createError(500, "Internal Server Error"));
  }
};

// Middleware to verify a regular user or admin access
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next(); // Proceed if the user is the owner or an admin
    } else {
      return next(createError(403, "You are not authorized!")); // Authorization failed
    }
  });
};

// Middleware to verify admin access
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next(); // Proceed if the user is an admin
    } else {
      return next(createError(403, "You are not authorized!")); // Authorization failed
    }
  });
};
