const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Adjust connection pool options as needed
  // poolSize: 10, // Set a reasonable pool size
  // keepAlive: true, // Keep idle connections open for reuse
  // reconnectTries: Number.MAX_VALUE, // Optionally, set a maximum number of reconnect attempts
  // reconnectInterval: 5000, // Optionally, set a reconnect interval in milliseconds
};

mongoose
  .connect(process.env.MONGO_URI, options)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

//Routes

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const authMiddleware = require("./middleware/authMiddleware");

app.use("/api/users", userRoutes);
app.use("/api/posts",authMiddleware, postRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
