import Player from "./src/models/playerModel.js";
import Hand from "./src/models/handModel.js";
import Card from "./src/models/cardModel.js";
import Deck from "./src/models/deckModel.js";
import { generatePlayers,initCards } from "./src/services/playerService.js";
import { getInput } from "./src/utils/gameIO.js";
import { randDigit,createPlayer,drawCards } from "./src/services/gameService.js";

const deck = new Deck();
let playerCount;
let bots = [];
deck.prepareDeck();
let humanPlayer

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
let toDraw = deck.shuffleDeck;

await drawCards(toDraw,bots)

bots.forEach(player=>{
  createPlayer(player.playerName)
  initCards(player.playerName,player.cards)
})

let index = await randDigit(0, bots.length - 1);
humanPlayer = bots.splice(index, 1)[0];

console.log(humanPlayer)
console.log(bots)