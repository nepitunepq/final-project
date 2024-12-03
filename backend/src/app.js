const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Register a new user
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "User registration failed" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

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
