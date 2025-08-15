function markMainPlayer(player) {
  let main = document.getElementById("table");
  let playerDiv = main.querySelector(`#${player}`);
  let header = playerDiv.querySelector("h2");
  header.className = "active";
}

async function removeCardFromHand(player, card) {
  let main = document.getElementById(player);
  let hand = main.querySelector(`.hand`);
  let cardElement = hand.querySelector(`[data-card="${card}"]`);
  // console.log("remove card from hand", player, card, cardElement);
  cardElement.classList.remove("fade-in");
  cardElement.classList.add("fade-out");
  cardElement.classList.remove("show");
  cardElement.classList.add("remove");
  setTimeout(() => {
    hand.removeChild(cardElement);
  }, 500);
}

export { markMainPlayer, removeCardFromHand };
