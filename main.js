import Player from "./src/models/playerModel.js";
import Hand from "./src/models/handModel.js";
import Card from "./src/models/cardModel.js";
import Deck from "./src/models/deckModel.js";
import { generatePlayers } from "./src/services/playerService.js";
import {
  shuffleCards,
  drawCards,
  getOldMaid,
  setCard,
} from "./src/services/cardService.js";
import { getInput } from "./src/utils/gameIO.js";

const user = new Player("P1");
const deck = new Deck()
let playerCount;
let bots = [];


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

bots = generatePlayers(await selectPlayer())
console.log(bots);


