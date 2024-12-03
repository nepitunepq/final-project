document.addEventListener('DOMContentLoaded', () => {
    const leaderboardTable = document.querySelector('#leaderboard-table tbody');
    const backToGameButton = document.getElementById('back-to-game');
  
    // Fetch leaderboard data from the backend
    fetch('http://localhost:3222/api/scores/leaderboard') // Update the URL to your backend route
      .then((response) => response.json())
      .then((data) => {
        // Populate the table with leaderboard data
        leaderboardTable.innerHTML = data
          .map(
            (player, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${player.username}</td>
              <td>${player.score}</td>
            </tr>
          `
          )
          .join('');
      })
      .catch((error) => {
        console.error('Error fetching leaderboard:', error);
        leaderboardTable.innerHTML = '<tr><td colspan="3">Failed to load leaderboard.</td></tr>';
      });
  
    // Add functionality to the "Back to Game" button
    backToGameButton.addEventListener('click', () => {
      window.location.href = 'game.html'; // Redirect to game.html
    });
  });
  
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    menuBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const backBtn = document.getElementById("back-to-game");
    backBtn.addEventListener("click", () => {
        window.location.href = "game.html";
    });
});