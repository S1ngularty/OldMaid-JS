import {
  randDigit,
  createPlayer,
  resetTable,
  getCardFromDealer,
  createCard,
  removePairCards,
} from "../services/gameService.js";

import {
  markMainPlayer,
  removeCardFromHand,
} from "../services/playerService.js";

class Player {
  #originalCard = [];
  #playerCards = [];
  #discardPiles = [];
  #human = false;
  constructor(name) {
    this.playerName = name;
  }

  setHuman() {
    this.#human = true;
  }

  async receiveCards(card) {
    this.#playerCards.push(card);
    await createCard(this.playerName, card, this.#human);
  }

  sortCard() {
    this.#playerCards.sort();
  }

  async discardPile() {
    this.sortCard();
    for (let i = 0; i < this.#playerCards.length - 1; i++) {
      if (
        this.#playerCards[i].split(" ")[0].trim() ===
        this.#playerCards[i + 1].split(" ")[0].trim()
      ) {
        // console.log(
        //   "pair",
        //   this.#playerCards[i].split(" ")[0],
        //   this.#playerCards[i + 1].split(" ")[0]
        // );

        let discard = this.#playerCards.splice(i, 2);
        this.#discardPiles.push(discard);
        removePairCards(this.playerName, discard);
        i--;
      }
    }
  }

  offerCard() {
    return this.#playerCards;
  }

  removeCard(card) {
    return new Promise((resolve, reject) => {
      // console.log("remove card ", card);
      let index = this.#playerCards.indexOf(card);
      // console.log(index);
      if (index >= 0) {
        this.#playerCards.splice(index, 1);
        removeCardFromHand(this.playerName, card);
      }
      return resolve(true);
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
