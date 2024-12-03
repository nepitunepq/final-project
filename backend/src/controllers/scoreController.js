import User from '../models/user.js';

export const getLeaderboard = async (req, res) => {
  try {
    // Fetch top 10 players sorted by score in descending order
    const leaderboard = await User.findById(userId)
      .sort({ score: -1 })
      .limit(10)
      .select('username score'); // Fetch only username and score fields

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};
