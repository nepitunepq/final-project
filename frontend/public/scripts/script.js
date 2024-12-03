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
  