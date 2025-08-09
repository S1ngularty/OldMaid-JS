
class Player {
  #cards=[];
  constructor(name) {
    this.playerName = name;
  }

   receiveCards(card) {
    this.#cards.push(card);
  }

  get cards(){
    return this.#cards
  }
}

export default Player;
