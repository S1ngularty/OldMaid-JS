import Game from "./src/models/GameModel.js";
import { showAllCards } from "./src/services/gameService.js";
import { delay, resetTable } from "./src/utils/gameAnimation.js";
let playerCount = 2;
let game;

document.querySelectorAll("#player-selection > .player-mode").forEach((child) => {
  child.addEventListener("click", async (e) => {
    e.preventDefault();
    child.classList = "active";
    document.getElementById(playerCount).className = "";
    playerCount = child.getAttribute("id");
    console.log("Player mode",playerCount)
    if(game instanceof Object) game.stop()
      await delay(1000)
    game = new Game();
    initGame();
  });
});

async function initGame() {
  document.getElementById("show-all").addEventListener('click',()=>{
    showAllCards()
  })
  game.setupPlayers(playerCount);
  await game.gameStart();
  console.log(game);
  await game.gameTurns();
}
