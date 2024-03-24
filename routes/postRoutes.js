// postRoutes.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const PostController = require("../controllers/postController");

// Middleware to protect routes
router.use(authMiddleware);

// Fetch all posts of the logged-in user
router.get("/", PostController.getAllPosts);

// Add a new post for the logged-in user
router.post("/add", PostController.addPost);

// Update a post by its ID (for the logged-in user)
router.put("/update/:postId", PostController.updatePost);

// Delete a post by its ID (for the logged-in user)
router.delete("/delete/:postId", PostController.deletePost);

module.exports = router;
