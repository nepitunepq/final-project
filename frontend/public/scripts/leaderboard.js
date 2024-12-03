import { BACKEND_URL } from "./config.js";

document.addEventListener('DOMContentLoaded', () => {
  const leaderboardTable = document.querySelector('#leaderboard-table');
  const backToGameButton = document.getElementById('back-to-game');
  const menuButton = document.getElementById("menu-btn");

  // Fetch leaderboard data from the backend
  fetch(`${BACKEND_URL}/leaderboard`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch leaderboard");
      return response.json();
    })
    .then((data) => {
      console.log(data); // Debug: Log fetched data
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

  // Back button
  backToGameButton.addEventListener('click', () => {
    window.location.href = 'game.html';
  });

  // Menu button
  menuButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
