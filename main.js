import Player from "./src/models/playerModel.js";
import Hand from "./src/models/handModel.js";
import Card from "./src/models/cardModel.js";
import Deck from "./src/models/deckModel.js";
import { generatePlayers } from "./src/services/playerService.js";
import { getInput } from "./src/utils/gameIO.js";

const deck = new Deck();
let playerCount;
let bots = [];
deck.prepareDeck();

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
bots = generatePlayers(playerCount);
console.log(bots);
let toDraw = deck.shuffleDeck;
console.log("Draw", toDraw);
// bots.forEach(player=>{
//     player.recieveCards()
// })
console.log(bots.length)
  let currPlayer = 0;
    
for (let i = 0; i < toDraw.length; i++) {
  console.log(currPlayer)
  bots[currPlayer].recieveCards(toDraw[i]);
   currPlayer++
  if (currPlayer >= bots.length) currPlayer=0;
  
 
}

console.log(bots);
