import { Game } from 'boardgame.io/core';
import { randomizeCards, removeCardFromHand, unsetSelectedCard, flipCards } from './utilities';

const TripleTriad = Game({
  /* Setup:
   * Each cell is initially an object with a null player assignment and null card value
   * Randomizes the hand of both players
   * Sets the selectedCard to none
   * Both players initially have no captures on the board
  */
  setup: (ctx) => ({
    cells: Array(9).fill({player: null, card: null}),
    firstPlayerHand: randomizeCards(ctx),
    secondPlayerHand: randomizeCards(ctx),
    selectedCard: null,
    firstPlayerCaptures: [],
    secondPlayerCaptures: [],
  }),

  moves: {
    /* selectCard:
     * @param G: boardgame.io Game object
     * @param ctx: boardgame.io Context object
     * @param index: index of the card in the Players hand TEST
     * When a player clicks a card in their hand...
     * Sets the selectedCard in the game state. This card can now be placed on the board.
    */
    selectCard(G, ctx, index) {
      G.selectedCardIndex = index;
      if (ctx.currentPlayer === '0') {
        G.selectedCard = G.firstPlayerHand[index];
      } else {
        G.selectedCard = G.secondPlayerHand[index];
      }
    },

    /* selectCell
     * @param G: boardgame.io Game object
     * @param ctx: boardgame.io Context object
     * @param index: index of the cell in the game state's cells array
     * When a player clicks a grid cell...
     * If the player has selected a card from their deck, and that cell has not already been assigned a card
     * Sets the player and card for the cell ID, then adds that cell to the current player's Captures.
     * Finally, removes the card from the player's hand.
    */
    selectCell(G, ctx, index) {
      let player = null;
      if (G.cells[index].card === null && G.selectedCard) {
        G.cells[index].card = G.selectedCard;
        G.cells[index].player = ctx.currentPlayer;
        if (ctx.currentPlayer === '0') {
          G.firstPlayerCaptures.push(index);
          player = G.firstPlayerHand;
        } else {
          G.secondPlayerCaptures.push(index);
          player = G.secondPlayerHand;
        }

        removeCardFromHand(player, G.selectedCardIndex);
        flipCards(G, ctx, index);
        unsetSelectedCard(G);
      }
    }
  },

  flow: {
    endGameIf: (G, ctx) => {
      // The game is OVER if all of the grid cells have a card
      if (G.cells.every(cell => cell.card !== null)) {

        const firstPlayerPoints = G.firstPlayerCaptures.length + G.firstPlayerHand.length;
        const secondPlayerPoints = G.secondPlayerCaptures.length + G.secondPlayerHand.length;

        if (secondPlayerPoints > firstPlayerPoints) {
          return { winner: '1' };
        } else if (firstPlayerPoints > secondPlayerPoints) {
          return { winner: '0' };
        } else if (firstPlayerPoints === secondPlayerPoints) {
          return { draw: 'true' };
        }
      }
      // if draw
    },
  }
});

export default TripleTriad;
