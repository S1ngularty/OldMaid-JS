import Player from "../models/playerModel.js";
function generatePlayers(num) {
  let bots = [];
  for (let i = 0; i < num; i++) {
    bots.push(new Player("P" + (i + 1)));
  }
  return bots;
}

export { generatePlayers };
