function markMainPlayer(player) {
  let main = document.getElementById("table");
  let playerDiv = main.querySelector(`#${player}`);
let header = playerDiv.querySelector('h2')
  header.className = "active";
}

export { markMainPlayer };
