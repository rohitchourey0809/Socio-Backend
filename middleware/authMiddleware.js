// authMiddleware.js

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization");

  // Check if token doesn't exist
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization denied. Token is missing." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authorization denied. Invalid token." });
  }
};
