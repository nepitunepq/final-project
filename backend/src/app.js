import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path'
import 'dotenv/config' // TODO:  check this later

import User from './models/user.js'

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Handle user creation or retrieval
app.post("/user", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }

  try {
    // Check if the user exists in MongoDB
    let user = await User.findOne({ username });

    if (!user) {
      // If not, create a new user with default score 0
      user = new User({ username, score: 0 });
      await user.save();
    }

    res.status(200).json(user); // Send the user data back to the frontend
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// // Example route for serving the game page
// app.get("/game", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "game.html"));
// });

// // Default route for serving the login page
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });



export default app;