import { parseCardIcon } from "../utils/parseCard.js";

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

  return val;
}

function createPlayer(playerName) {
  let id = playerName.charAt(1);
  let table = document.querySelector("#table");
  let main = document.createElement("div");

  main.id = playerName;
  main.className = "player";

  let playerLabel = document.createElement("h2");
  playerLabel.textContent = `Player ${id} `;

  let playerHand = document.createElement("div");
  playerHand.className = "hand";
  main.append(playerLabel);
  main.append(playerHand);
  table.append(main);
}

async function createCard(player, card) {
  // console.log("creating a card ",card)
  let main = document.querySelector(`#${player}`);
  let playerHand = main.querySelector(".hand");

  let cardSplit = card.split(" ");
  let cardElement = document.createElement("div");
  cardElement.className = "card";
  cardElement.dataset.card = card;
  cardElement.classList.add("fade-in");
  let cardIcon = parseCardIcon(cardSplit[1].trim());
  cardElement.textContent = `${cardSplit[0]} ${cardIcon}`;

  cardElement.addEventListener("click", (e) => {
    e.preventDefault();
    cardElement.classList.toggle("selected");
  });

  playerHand.append(cardElement);
  setTimeout(() => {
    cardElement.classList.add("show");
  }, 50);

  return cardElement;
}

function removePairCards(player, cards) {
  let main = document.getElementById(player);
  let hand = main.querySelector(`.hand`);
  cards.forEach((card) => {
    let cardElement = hand.querySelector(`[data-card="${card}"]`);
    cardElement.classList.replace("fade-in", "fade-out");
    cardElement.classList.replace("show", "remove");
    setTimeout(() => {
      cardElement.remove();
    }, 500);
  });
}

function resetTable() {
  let table = document.getElementById("table");
  let players = document.querySelectorAll(".player");
  players.forEach((player) => {
    player.remove();
  });
}

export {
  randDigit,
  createPlayer,
  resetTable,
  getCardFromDealer,
  createCard,
  removePairCards,
};
