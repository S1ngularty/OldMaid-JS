
class Player {
  #cards;
  constructor(name) {
    this.playerName = name;
  }

  set recieveCards(cards = []) {
    this.#cards = cards;
  }
}

export default Player;
