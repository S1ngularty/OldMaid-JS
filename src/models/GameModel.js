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

class Game {
  deck = new Deck();
  #players = [];
  #humanPlayer = {};
  #playerWon = false;
  #playerRanks=[];

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
    this.#players.forEach((player,i) =>{
      console.log(player.cards,i)
      if(player.cards.length == 0){
        console.log(`Rank ${i} :`, player.playerName)
        console.log(this.#playerRanks)
         this.#playerRanks.push(player.playerName)
         this.#players.splice(i,1)
      }
    })
  }

  checkForThelastPlayer(){
    if(this.#players.length <2){
      this.#playerWon=true
      console.log("loser :", this.#players[0].playerName)
    }
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
          let cardFromDealer = await this.#humanPlayer.getCardFromDealer();
          await dealer.removeCard(cardFromDealer);
          await player.discardPile();
        } else {
          let max = dealer.cards.length - 1 < 0 ? 0 : dealer.cards.length - 1;
          let cardFromDealer = await randDigit(0, max);
          let cardReceive = dealer.cards[cardFromDealer];
          await player.receiveCards(cardReceive);
          await dealer.removeCard(cardReceive);
          player.discardPile();
        }
        i++;
        await this.checkPlayersWithNoCards()
        this.checkForThelastPlayer()
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
