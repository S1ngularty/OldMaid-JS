import Card from "./cardModel.js";

class Deck extends Card {
  #standardDeck = 52;
  #oldMaidCard;
  #shuffleDeck = [];
  #cardWithoutOldMaid;
  #fullCard = [];
  #cardToDraw = [];

  _initCard() {
    this.#fullCard = [];
    this.cardSuits.forEach((suit) => {
      this.cardPerSuits.forEach((value) => {
        this.#fullCard.push(value + " " + suit);
      });
    });
  }

  prepareDeck() {
    this._initCard();
    this._prepareDeckWithRemoveOldMaid();
    this._shuffleDeck();
  }

  _prepareDeckWithRemoveOldMaid() {
    this.#cardToDraw = [];
    let temp = this.#fullCard;
    let index = Math.floor(Math.random() * (temp.length - 1 - 0)) + 0;
    this.#oldMaidCard = temp.splice(index, 1)[0];
    this.#cardToDraw = temp;
  }

  _shuffleDeck() {
    let temp = this.#cardToDraw;
    this.#shuffleDeck = [];
    for (let i = temp.length - 1; i >= 0; i--) {
      let index = Math.floor(Math.random() * (temp.length - 1));
      this.#shuffleDeck.push(temp.splice(index, 1)[0]);
    }
  }

  get oldMaid() {
    return this.#oldMaidCard;
  }
  get cardToDraw() {
    return this.#cardToDraw;
  }

  get shuffleDeck() {
    return this.#shuffleDeck;
  }
}

export default Deck;
