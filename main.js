import Game from "./src/models/GameModel.js";
import { getInput } from "./src/utils/gameIO.js";

const game = new Game();
let playerCount;

async function selectPlayer() {
  return new Promise((resolve, reject) => {
    document.querySelectorAll("#player-selection > *").forEach((child) => {
      child.addEventListener("click", (e) => {
        e.preventDefault();
        resolve(e.target.getAttribute("id"));
      });
    });
  });
}

playerCount = await selectPlayer();
game.setupPlayers(playerCount)
await game.gameStart()


console.log(game)
