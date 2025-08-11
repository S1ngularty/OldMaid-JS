import {
  randDigit,
  createPlayer,
  initCards,
  resetTable,
  getCardFromDealer,
  createCard,
} from "../services/gameService.js";

class Player {
  #originalCard = [];
  #playerCards = [];
  #discardPiles = [];
  constructor(name) {
    this.playerName = name;
  }

  receiveCards(card) {
    this.#playerCards.push(card);
    if (this.#playerCards.length >= 2) {
      this.discardPile();
    }
  }

  sortCard() {
    this.#playerCards.sort();
  }

  discardPile() {
    this.sortCard();
    for (let i = 0; i < this.#playerCards.length - 1; i++) {
      // console.log(this.#playerCards[i].split(" ")[0],this.#playerCards[i+1].split(" ")[0])
      if (
        this.#playerCards[i].split(" ")[0].trim() ===
        this.#playerCards[i + 1].split(" ")[0].trim()
      ) {
        this.#discardPiles.push(this.#playerCards.splice(i, 2));
        i--;
      }
    }
  }

  offerCard() {
    return this.#playerCards;
  }

  async removeCard(card) {
    return new Promise((resolve, reject) => {
      console.log("remove card ", card);
      let index = this.#playerCards.indexOf(card);
      console.log(index);
      if (index >= 0) this.#playerCards.splice(index, 1);
      resolve(true)
    });
  }

  async getCardFromDealer() {
    let cardFromDealer = await getCardFromDealer();
    this.receiveCards(cardFromDealer);
    return cardFromDealer;
  }

  get cards() {
    return this.#playerCards;
  }
}

export default Player;
