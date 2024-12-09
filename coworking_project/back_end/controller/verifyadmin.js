export const verifyAdmin = async (req, res, next) => {
    try {
      if (req.user && req.user.isAdmin) {
        next(); // User is admin, proceed to the next middleware/controller
      } else {
        res.status(403).json("Access denied. Admins only.");
      }
    } catch (err) {
      next(err);
    }
  };
  