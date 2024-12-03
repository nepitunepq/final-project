import { BACKEND_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Select elements
  const catImage = document.getElementById("cat1");
  const scoreElement = document.getElementById("score");
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  // Fetch the current score from the backend
  try {
    const response = await fetch(`${BACKEND_URL}/user/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const userData = await response.json();
    scoreElement.textContent = `Score: ${userData.score}`; // Display the user's current score
  } catch (error) {
    console.error("Error fetching user data:", error);
    scoreElement.textContent = "Score: 0"; // Fallback to 0 if there's an error
  }

  // Handle cat image click and score increment
  const photoButton = document.getElementById("photo");
  photoButton.addEventListener("mousedown", () => {
    catImage.src = "./images/cat2.png"; // Change to the pressed cat image

    // Increment score and display it
    let currentScore = parseInt(scoreElement.textContent.replace("Score: ", ""), 10);
    currentScore++;
    scoreElement.textContent = `Score: ${currentScore}`;

    // Send the updated score to the backend
    fetch(`${BACKEND_URL}/update-score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, increment: 1 }),
    }).catch((error) => console.error("Error updating score:", error));
  });

  // Reset cat image on mouseup or mouseleave
  photoButton.addEventListener("mouseup", () => {
    catImage.src = "./images/cat.png"; // Revert to the original cat image
  });
  photoButton.addEventListener("mouseleave", () => {
    catImage.src = "./images/cat.png"; // Reset to the original cat image
  });

  // Add event listener to the leaderboard button
  const leaderboardBtn = document.getElementById("leaderboard-btn");
  if (leaderboardBtn) {
    leaderboardBtn.addEventListener("click", () => {
      window.location.href = "leaderboard.html"; // Redirect to leaderboard page
    });
  }

  // Add event listener to the menu button
  const menuBtn = document.getElementById("menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      window.location.href = "index.html"; // Redirect to menu page
    });
  }
});
