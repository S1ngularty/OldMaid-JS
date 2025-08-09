async function randDigit(min, max) {
  let randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum;
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

export { randDigit, createPlayer, drawCards };
