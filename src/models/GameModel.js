import Player from "./playerModel.js";
import Deck from "./deckModel.js";
import { markMainPlayer } from "../services/playerService.js";
import {
  randDigit,
  createPlayer,
  resetTable,
  getCardFromDealer,
  createCard,
  removePairCards,
} from "../services/gameService.js";
import { delay } from "../utils/gameAnimation.js";

class Game {
  deck = new Deck();
  #players = [];
  #humanPlayer = {};
  #playerWon = false;
  #playerRanks = [];

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
    });
  }

  constructor(active = true) {
    this.active = active;
  }
  async gameStart() {
    this.gameReset();
    this.deck.prepareDeck();
    this._initPlayers();
    await this._drawCards();
    this.discardingPiles();
    this._setMainPlayer();
  }

  discardingPiles() {
    this.#players.forEach((player) => {
      player.discardPile();
    });
  }

  async checkPlayersWithNoCards() {
    this.#players.forEach((player, i) => {
      if (player.cards.length == 0) {
        this.#playerRanks.push(player.playerName);
        console.log(`Rank ${this.#playerRanks.length} :`, player.playerName);
        console.log(this.#playerRanks);
        this.#players.splice(i, 1);
      }
    });
  }

  checkForThelastPlayer() {
    if (this.#players.length < 2) {
      this.#playerWon = true;
      console.log(
        "loser :",
        this.#players[0].playerName,
        "                    OldMaid :",
        this.deck.oldMaid
      );
    }
  }

  async gameTurns() {
    while (!this.#playerWon && this.active === true) {
      let i = 0;
      if (!this.active) {
        console.log("breaking the loop..............");
      }
      for (let player of this.#players) {
        if (!this.active) return; // check again after awaits
        let dealer =
          i === this.#players.length - 1
            ? this.#players[0]
            : this.#players[i + 1];
        console.log(`${player.playerName}'s turn...`);
        if (player.playerName === this.#humanPlayer.playerName) {
          let cardFromDealer = await this.#humanPlayer.getCardFromDealer();
           dealer.removeCard(cardFromDealer);
           player.discardPile();
        } else {
          if (!this.active) return; 
          await delay(500);
          let max = dealer.cards.length - 1 < 0 ? 0 : dealer.cards.length - 1;
          let cardFromDealer = await randDigit(0, max);
          let cardReceive = dealer.cards[cardFromDealer];
          await player.receiveCards(cardReceive);
           dealer.removeCard(cardReceive);
           player.discardPile();
        }
        i++;
        await this.checkPlayersWithNoCards();
        this.checkForThelastPlayer();
        console.log(this.deck.oldMaid);
      }
    }
  }

  async _drawCards() {
    let currPlayer = 0;
    let shuffleDeck = this.deck.shuffleDeck;
    for (let i = 0; i < shuffleDeck.length; i++) {
      // console.log(this.#players[])
      this.#players[currPlayer].receiveCards(shuffleDeck[i]);
      this.#players[currPlayer].discardPile();
      currPlayer++;
      if (currPlayer >= this.#players.length) currPlayer = 0;
    }
  }

  async _setMainPlayer() {
    // let index = await randDigit(0, this.#players.length - 1);
    // this.#humanPlayer = this.#players[index];
    // markMainPlayer(this.#humanPlayer.playerName);
  }

  gameReset() {
    this.deck = new Deck();
    this.#humanPlayer = {};
    resetTable();
  }

  stop() {
    this.active = false;
    console.log(
      "----------------------stopping the game----------------------"
    );
  }
}

export default Game;
