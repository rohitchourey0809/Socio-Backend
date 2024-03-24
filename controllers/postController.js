// postController.js

const Post = require("../models/Post");

// Fetch all posts of the logged-in user
exports.getAllPosts = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract userId from token

    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new post for the logged-in user
exports.addPost = async (req, res) => {
  try {
    const { title, body, device } = req.body;
    const userId = req.user.userId; // Extract userId from token

    const newPost = new Post({
      title,
      body,
      device,
      userId,
    });

    await newPost.save();

    res.status(201).json({ message: "Post added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a post by its ID (for the logged-in user)
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, body, device } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, body, device },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a post by its ID (for the logged-in user)
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
