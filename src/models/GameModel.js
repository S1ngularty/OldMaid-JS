import Player from "./playerModel.js";
import Deck from "./deckModel.js";
import { markMainPlayer } from "../services/playerService.js";
import {
  randDigit,
  createPlayer,
  initCards,
  resetTable,
  getCardFromDealer,
  createCard,
} from "../services/gameService.js";

class Game {
  deck = new Deck();
  #players = [];
  #humanPlayer = {};
  #playerWon = false;

  setupPlayers(numPlayer) {
    this.#players = [];
    for (let i = 0; i < numPlayer; i++) {
      this.#players.push(new Player("P" + (i + 1)));
    }
  }

  _initPlayers() {
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
    this._initPlayers();
    this._setMainPlayer();
  }

  async gameTurns() {
    while (!this.#playerWon) {
      let i = 0;

      for (let player of this.#players) {
        let dealer =
          i === this.#players.length - 1
            ? this.#players[0]
            : this.#players[i + 1];

        if (player.playerName === this.#humanPlayer.playerName) {
          console.log("Dealer", dealer);
          let cardFromDealer = await this.#humanPlayer.getCardFromDealer();
          await dealer.removeCard(cardFromDealer);
          console.log(cardFromDealer);
          console.log("human", this.#humanPlayer);
        } else {
          console.log("Opponent dealer", dealer);
        }
        console.log(
          "========================================================="
        );
        i++;
      }
    }
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
    this.#humanPlayer = this.#players[index];
    markMainPlayer(this.#humanPlayer.playerName);
  }

  gameReset() {
    this.deck = new Deck();
    this.#humanPlayer = {};
    resetTable();
  }
}

export default Game;
