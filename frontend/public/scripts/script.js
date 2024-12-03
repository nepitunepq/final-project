import { BACKEND_URL } from "./config.js";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the form from refreshing the page
  
  const username = document.getElementById("username").value; // Get the username from the input

  if (!username) {
    alert("Username is required!"); // Ensure username is not empty
    return;
  }

  try {
    console.log(BACKEND_URL)
    const response = await fetch(BACKEND_URL + "/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data)); // Store user data in localStorage
      window.location.href = "game.html"; // Redirect to the game page
    } else {
      alert("Failed to process the username. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }


  /* from this point onwards */

  document.addEventListener("DOMContentLoaded", () => {
    // Select the image element
    const catImage = document.getElementById("cat1");
  
    // Add a mousedown event listener to change the image to cat2.png
    document.getElementById("photo").addEventListener("mousedown", () => {
      catImage.src = "./images/cat2.png"; // Change to the pressed cat
    });
  
    // Add a mouseup event listener to change the image back to cat.png
    document.getElementById("photo").addEventListener("mouseup", () => {
      catImage.src = "./images/cat.png"; // Change back to the original cat
    });
  
    // Optional: Add a mouseleave event to reset the image if the mouse leaves the button
    document.getElementById("photo").addEventListener("mouseleave", () => {
      catImage.src = "./images/cat.png"; // Reset to the original cat
    });
  });


  document.addEventListener("DOMContentLoaded", () => {
    // Select the image element and score element
    const catImage = document.getElementById("cat1");
    const scoreElement = document.getElementById("score");
  
    // Initialize score
    let score = 0;
  
    // Add a mousedown event listener to increase the score and change the image
    document.getElementById("photo").addEventListener("mousedown", () => {
      score++; // Increment the score
      scoreElement.textContent = `Score: ${score}`; // Update the score on the page
      catImage.src = "./images/cat2.png"; // Change to the pressed cat image
    });
  
    // Add a mouseup event listener to revert the image
    document.getElementById("photo").addEventListener("mouseup", () => {
      catImage.src = "./images/cat.png"; // Change back to the original cat image
    });
  
    // Optional: Reset the image if the mouse leaves the button
    document.getElementById("photo").addEventListener("mouseleave", () => {
      catImage.src = "./images/cat.png"; // Reset to the original cat image
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const catImage = document.getElementById("cat1");
    const scoreElement = document.getElementById("score");
  
    let score = 0;
    const userId = 'user-id-from-login'; // Replace with the actual user ID
  
    document.getElementById("photo").addEventListener("mousedown", () => {
      score++;
      scoreElement.textContent = `Score: ${score}`;
  
      // Send updated score to the backend
      fetch('http://localhost:5000/update-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, increment: 1 }),
      }).catch((error) => console.error('Error updating score:', error));
  
      catImage.src = "./images/cat2.png";
    });
  
    document.getElementById("photo").addEventListener("mouseup", () => {
      catImage.src = "./images/cat.png";
    });
  
    document.getElementById("photo").addEventListener("mouseleave", () => {
      catImage.src = "./images/cat.png";
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const leaderboardDiv = document.getElementById('leaderboard');
  
    // Fetch and display leaderboard
    fetch('http://localhost:5000/leaderboard')
      .then((response) => response.json())
      .then((data) => {
        // Create a list of leaderboard entries
        const leaderboardHtml = data
          .map((player, index) => {
            return `<p>${index + 1}. ${player.username} - ${player.score} points</p>`;
          })
          .join('');
        leaderboardDiv.innerHTML = leaderboardHtml;
      })
      .catch((error) => {
        console.error('Error fetching leaderboard:', error);
        leaderboardDiv.innerHTML = '<p>Failed to load leaderboard.</p>';
      });
  });
  
  
});
