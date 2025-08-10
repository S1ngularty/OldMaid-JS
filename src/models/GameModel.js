import Player from "./playerModel.js";
import Deck from "./deckModel.js";
import {
  randDigit,
  createPlayer,
  initCards,
  resetTable,
} from "../services/gameService.js";

class Game {
  deck = new Deck();
  #players = [];
  #humanPlayer = {};

  setupPlayers(numPlayer) {
    this.#players = [];
    for (let i = 0; i < numPlayer; i++) {
      this.#players.push(new Player("P" + (i + 1)));
    }
  }

  _allPlayerDiscardingPiles() {
    this.#players.forEach((player) => {
      player.sortCard();
      player.discardPile();
    });
  }

  _initPlayer() {
    this.#players.forEach((player) => {
      let name = player.playerName;
      createPlayer(name);
      initCards(name, player.cards);
    });
  }

  async gameStart() {
    this.gameReset();
    this.deck.prepareDeck();
    this._drawCards();
    this._allPlayerDiscardingPiles()
    this._initPlayer();
    this._setMainPlayer();
  }

  _drawCards() {
    let currPlayer = 0;
    let shuffleDeck = this.deck.shuffleDeck;
    for (let i = 0; i < shuffleDeck.length; i++) {
      // console.log(this.#players[])
      this.#players[currPlayer].receiveCards(shuffleDeck[i]);
      currPlayer++;
      if (currPlayer >= this.#players.length) currPlayer = 0;
    }
  }

  async _setMainPlayer() {
    let index = await randDigit(0, this.#players.length - 1);
    this.#humanPlayer = this.#players.splice(index, 1)[0];
  }

  gameReset() {
    this.deck = new Deck();
    this.#humanPlayer = {};
    resetTable();
  }
}

export default Game;
