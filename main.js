import Game from "./src/models/GameModel.js";
import { delay } from "./src/utils/gameAnimation.js";

let playerCount = 2;
let game;
document.querySelectorAll("#player-selection > *").forEach((child) => {
  child.addEventListener("click", (e) => {
    e.preventDefault();
    let table = document.getElementById("table");
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
    child.classList = "active";
    document.getElementById(playerCount).className = "";
    playerCount = child.getAttribute("id");
    game = new Game();
    initGame();
  });
});

async function initGame() {
  game.setupPlayers(playerCount);
  await game.gameStart();
  console.log(game);
  game.gameTurns();
}
