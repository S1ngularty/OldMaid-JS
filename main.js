import Game from "./src/models/GameModel.js";
import { getInput } from "./src/utils/gameIO.js";

let playerCount;
 const game = new Game();
document.querySelectorAll("#player-selection > *").forEach((child) => {
  child.addEventListener("click", (e) => {
    e.preventDefault();
    playerCount = e.target.getAttribute("id");
    initGame()
  });
});

async function initGame() {
  game.setupPlayers(playerCount);
  await game.gameStart();

  console.log(game);
}
