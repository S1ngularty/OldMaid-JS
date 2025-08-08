import Card from "./cardModel.js";

class Deck extends Card {
  #standardDeck = 52;
  #oldMaidCard;
  #shuffledCard;
  #cardWithoutOldMaid;
  #fullCard = [];
  #cardToDraw=[];

  _initCard() {
    this.cardSuits.forEach((suit) => {
      this.cardPerSuits.forEach((value) => {
        this.#fullCard.push(value + " " + suit);
      });
    });
  }

   prepareDeck() {
    this.#fullCard=[]
    this._initCard();
    this._prepareDeckWithRemoveOldMaid()
  }

  _prepareDeckWithRemoveOldMaid() {
    this.#cardToDraw=[]
    let temp = this.#fullCard
    let index = Math.floor(Math.random() * ((temp.length-1) - 0) ) + 0;
    this.#oldMaidCard= temp.splice(index,1)[0]
    this.#cardToDraw = temp
  }

  get oldMaid(){
    return this.#oldMaidCard
  }
  get cardToDraw(){
    return this.#cardToDraw
  }

}

export default Deck;
