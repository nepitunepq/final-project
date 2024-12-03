// Handle Login
if (document.getElementById("login-form")) {
    document.getElementById("login-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        window.location.href = "/game";
      } else {
        alert("Login failed. Please try again.");
      }
    });
  }
  
  // Handle Game Score Increment
  if (document.getElementById("photo")) {
    const token = localStorage.getItem("token");
    const scoreElement = document.getElementById("score");
  
    document.getElementById("photo").addEventListener("click", async () => {
      const response = await fetch("/update-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, increment: 1 }),
      });
  
      if (response.ok) {
        const data = await response.json();
        scoreElement.textContent = `Score: ${data.score}`;
      }
    });
  
    document.getElementById("leaderboard-btn").addEventListener("click", () => {
      window.location.href = "/leaderboard";
    });
  }
  
  // Handle Leaderboard Fetch
  if (document.getElementById("leaderboard")) {
    async function fetchLeaderboard() {
      const response = await fetch("/leaderboard");
      const leaderboard = await response.json();
  
      const leaderboardDiv = document.getElementById("leaderboard");
      leaderboardDiv.innerHTML = leaderboard
        .map((user) => `<p>${user.username}: ${user.score}</p>`)
        .join("");
    }
  
    fetchLeaderboard();
  }

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
  

  