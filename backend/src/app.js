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
// Update score
app.post("/update-score", async (req, res) => {
  const { token, increment } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.score += increment;
    await user.save();

    res.json({ score: user.score });
  } catch (error) {
    res.status(400).json({ error: "Invalid request" });
  }
});

app.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await User.find()
      .sort({ score: -1 }) // Sort by score in descending order
      .limit(10)           // Limit to top 10 users
      .select('username score'); // Select only username and score fields

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});


app.post('/update-score', async (req, res) => {
  const { userId, increment } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.score += increment; // Increment the user's score
    await user.save();

    res.status(200).json({ score: user.score });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
