class Player {
  #originalCard=[]
  #playerCards = [];
  #discardPiles=[]
  constructor(name) {
    this.playerName = name;
  }

  receiveCards(card) {
    this.#playerCards.push(card);
  }

  sortCard() {
    this.#originalCard = [...this.#playerCards]
    this.#playerCards.sort();
  }

  discardPile(){
    for(let i =0; i<this.#playerCards.length-1; i++){
      // console.log(this.#playerCards[i].split(" ")[0],this.#playerCards[i+1].split(" ")[0])
      if((this.#playerCards[i].split(" ")[0]).trim()===(this.#playerCards[i+1].split(" ")[0]).trim()){
        this.#discardPiles.push(this.#playerCards.splice(i,2))
        i--
      }
    }
  }


  get cards() {
    return this.#playerCards;
  }
}

export default Player;
