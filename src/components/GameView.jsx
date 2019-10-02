import React, { Component } from 'react';
import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';

class GameView extends Component {
  TripleTriad = Game({
    setup: () => ({ cells: Array(9).fill(null)}),
    moves: {
      // select card, select cell
      selectCard(G, ctx, id) {

      },

      selectCell(G, ctx, id) {
        G.cells[id] = ctx.currentPlayer;
      }
    }
  });

  render() {
    return (
      <div>
        {
          Client( { game: GameView.TripleTriad })
        }
      </div>
    )
  }
}

export default GameView;