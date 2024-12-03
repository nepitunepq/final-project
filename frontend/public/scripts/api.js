import { BACKEND_URL } from "./config.js";

// Fetch all items
export async function getItems() {
  const items = await fetch(`${BACKEND_URL}/items`).then((r) => r.json());
  return items;
}

// Create a new item
export async function createItem(item) {
  await fetch(`${BACKEND_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

// Delete an item by ID
export async function deleteItem(id) {
  await fetch(`${BACKEND_URL}/items/${id}`, {
    method: "DELETE",
  });
}

// Fetch the leaderboard data (Top 10 users with the highest scores)
export async function getLeaderboard() {
  try {
    const response = await fetch(`${BACKEND_URL}/leaderboard`);
    if (!response.ok) {
      throw new Error("Failed to fetch leaderboard data");
    }
    return await response.json(); // Return leaderboard data as JSON
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
}

// Fetch a single user's data by ID
export async function getUserById(userId) {
  try {
    const response = await fetch(`${BACKEND_URL}/user/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return await response.json(); // Return user data as JSON
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Update the score for a specific user
export async function updateScore(userId, increment) {
  try {
    const response = await fetch(`${BACKEND_URL}/update-score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, increment }),
    });
    if (!response.ok) {
      throw new Error("Failed to update score");
    }
    return await response.json(); // Return updated score data
  } catch (error) {
    console.error("Error updating score:", error);
    return null;
  }
}
