async function randDigit(min, max) {
  let randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum;
}

async function getCardFromDealer() {
 let val = await new Promise((resolve, reject) => {
    document.getElementById("table").addEventListener("click", (e) => {
      e.preventDefault();
      let target = e.target;
      resolve(target.dataset.card);
    });
  });

  return val
}

function createPlayer(playerName) {
  let id = playerName.charAt(1);
  let table = document.querySelector("#table");
  let main = document.createElement("div");

  main.id = `player${id}`;
  main.className = "player";

  let playerLabel = document.createElement("h2");
  playerLabel.textContent = `Player ${id} `;

  let playerHand = document.createElement("div");
  playerHand.className = "hand";
  main.append(playerLabel);
  main.append(playerHand);
  table.append(main);
}

async function drawCards(cards, players) {
  let currPlayer = 0;
  for (let i = 0; i < cards.length; i++) {
    players[currPlayer].recieveCards(cards[i]);
    currPlayer++;
    if (currPlayer >= players.length) currPlayer = 0;
  }
  return true;
}

function initCards(player, cards) {
  let playerId = `player${player.charAt(1)}`;
  let main = document.querySelector(`#${playerId}`);
  let playerHand = main.querySelector(".hand");

  cards.forEach((card) => {
    let cardSplit = card.split(" ");
    let cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.dataset.card = card;
    let cardIcon = parseCardIcon(cardSplit[1].trim());
    cardElement.textContent = `${cardSplit[0]} ${cardIcon}`;
    playerHand.append(cardElement);

    cardElement.addEventListener("click", (e) => {
      e.preventDefault();
      cardElement.classList.toggle("selected");
    });
  });
}

function parseCardIcon(cardSuit) {
  let result;
  switch (cardSuit) {
    case "diamond":
      return (result = "\u2666");
      break;
    case "spade":
      return (result = "\u2660");
      break;
    case "club":
      return (result = "\u2663");
      break;
    case "heart":
      return (result = "\u2665");
      break;
  }
  return result;
}

function resetTable() {
  let table = document.getElementById("table");
  let players = document.querySelectorAll(".player");
  players.forEach((player) => {
    player.remove();
  });
}

export { randDigit, createPlayer, drawCards, initCards, resetTable,getCardFromDealer };
