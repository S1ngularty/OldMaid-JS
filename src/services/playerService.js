function markMainPlayer(player) {
  let main = document.getElementById("table");
  let playerDiv = main.querySelector(`#${player}`);
  let header = playerDiv.querySelector("h2");
  header.className = "active";
}

function removeCardFromHand(player, card) {
  let main = document.getElementById(player);
  let hand = main.querySelector(`.hand`);
  let cardElement = hand.querySelector(`[data-card="${card}"]`);
  cardElement.remove();
}

export { markMainPlayer,removeCardFromHand };
