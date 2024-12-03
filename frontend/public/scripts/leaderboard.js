import { BACKEND_URL } from "./config.js";

document.addEventListener('DOMContentLoaded', () => {
  const leaderboardTable = document.querySelector('#leaderboard-table tbody');
  const backToGameButton = document.getElementById('back-to-game');
  const menuButton = document.getElementById("menu-btn");

  // Fetch leaderboard data from the backend
  fetch(`${BACKEND_URL}/leaderboard`) // Use the new leaderboard endpoint
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

  // Add functionality to the "Menu" button
  menuButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // Redirect to index.html
  });
});
