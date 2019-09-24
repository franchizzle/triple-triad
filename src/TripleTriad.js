import { Game } from 'boardgame.io/core';
import { checkNeighbors, randomizeCards, removeCardFromHand, checkCard } from './utilities';

const TripleTriad = Game({
  setup: (ctx) => ({
    cells: Array(9).fill({player: null, card: null}),
    firstPlayerHand: randomizeCards(ctx),
    secondPlayerHand: randomizeCards(ctx),
    selectedCard: null,
    firstPlayerCaptures: [],
    secondPlayerCaptures: [],
  }),
  moves: {
    // select card, select cell
    selectCard(G, ctx, id) {
      if (ctx.currentPlayer === '0') {
        G.selectedCard = G.firstPlayerHand[id];
      } else {
        G.selectedCard = G.secondPlayerHand[id];
      }
    },

    selectCell(G, ctx, id) {
      let player = null;
      if (G.cells[id].card === null && G.selectedCard) {
        G.cells[id].card = G.selectedCard;
        G.cells[id].player = ctx.currentPlayer;
        if (ctx.currentPlayer === '0') {
          G.firstPlayerCaptures.push(id);
          player = G.firstPlayerHand;
        } else {
          G.secondPlayerCaptures.push(id);
          player = G.secondPlayerHand;
        }
        removeCardFromHand(player);
      }

      const neighbors = checkNeighbors(id);
      neighbors.map((dir) => {
        if (G.cells[dir].card !== null) {
          let val = null;
          let inv = null;
          if (id+1 === dir) {
            val = 1;
            inv = 3;
          }
          if (id+3 === dir) {
            val = 2;
            inv = 0;
          }
          if (id-1 === dir) {
            val = 3;
            inv = 1;
          }
          if (id-3 === dir) {
            val = 0;
            inv = 2;
          }

          if ((ctx.currentPlayer === '0' && G.secondPlayerCaptures.includes(dir)) || (ctx.currentPlayer === '1' && G.firstPlayerCaptures.includes(dir))) {
            let capture = checkCard(val, G.selectedCard, G.cells[dir], inv, ctx.currentPlayer);
            if (capture) {
              if (ctx.currentPlayer === '0') {
                const index = G.secondPlayerCaptures.indexOf(dir);
                G.secondPlayerCaptures.splice(index, 1);
                G.firstPlayerCaptures.push(dir);
              } else {
                const index = G.firstPlayerCaptures.indexOf(dir);
                G.firstPlayerCaptures.splice(index, 1);
                G.secondPlayerCaptures.push(dir);
              }
            }
          };
        }
      })
    }
  },

  flow: {
    endGameIf: (G, ctx) => {
      // if win
      if (G.cells.every(cell => cell.card !== null)) {
        console.log("end game");
        if (G.secondPlayerCaptures.length > G.firstPlayerCaptures.length) {
          return { winner: '1' };
        } else if (G.secondPlayerCaptures.length < G.firstPlayerCaptures.length) {
          return { winner: '0' };
        } else if (G.secondPlayerCaptures.length === G.firstPlayerCaptures.length) {
          return { draw: 'true' };
        }
      }
      // if draw
    },
  }
});

export default TripleTriad;
