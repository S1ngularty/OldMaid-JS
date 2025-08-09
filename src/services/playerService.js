import Player from "../models/playerModel.js";
function generatePlayers(num) {
  let bots = [];
  for (let i = 0; i < num; i++) {
    bots.push(new Player("P" + (i + 1)));
  }
  return bots;
}
function initCards(player, cards) {
  let playerId = `player${player.charAt(1)}`;
  let main = document.querySelector(`#${playerId}`);
  let playerHand = main.querySelector(".hand");

  cards.forEach((card) => {
    let cardSplit = card.split(" ")
    let cardElement = document.createElement("div");
    cardElement.className = "card";
    let cardIcon = parseCardIcon(cardSplit[1].trim())
    cardElement.textContent=`${cardSplit[0]} ${cardIcon}`
    playerHand.append(cardElement)
  });
}

function parseCardIcon(cardSuit) {
  let result
  switch (cardSuit) {
    case "diamond":
      return result= "\u2666";
      break;
    case "spade":
      return result= "\u2660";
      break;
    case "club":
      return result= "\u2663";
      break;
    case "heart":
      return result= "\u2663";
      break;
  }
  return result
}

export { generatePlayers, initCards };
