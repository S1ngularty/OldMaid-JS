async function delay(interaval = 1000) {
  console.log("Player is thinking...");
  return new Promise((resolve, reject) => setTimeout(resolve, interaval));
}

function resetTable() {
  console.log("reset Table");
  let table = document.getElementById("table");
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

export { delay, resetTable };
