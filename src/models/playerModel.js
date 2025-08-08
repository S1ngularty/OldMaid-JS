
class Player {
  #cards=[];
  constructor(name) {
    this.playerName = name;
  }

   recieveCards(card) {
    this.#cards.push(card);
  }
}

export default Player;
