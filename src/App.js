import React, { Component } from 'react';

import './App.css';

import { Client } from 'boardgame.io/react';
import TripleTriad from './TripleTriad';

import Board from './components/Board';
import PlayerHand from './components/PlayerHand';

class GameBoard extends Component {
  onCardClick(card) {
    this.props.moves.selectCard(card);
  }

  onBoardCellClick(id) {
    if(this.cellIsEmpty(id)) {
      this.props.moves.selectCell(id);
      if (this.props.G.selectedCard !== null) {
        this.props.events.endTurn();
      }
    }
  }

  cellIsEmpty(id) {
    if (!this.props.isActive) return false;
    if (this.props.G.cells[id].card !== null) return false;
    return true;
  }

  isFirstPlayer() {
    return this.props.ctx.currentPlayer === '0';
  }

  render() {
    let winner = '';
    if (this.props.ctx.gameover) {
      winner = this.props.ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
    }

    return (
      <div className="tripleTriadGame">
        <PlayerHand
          hand={this.props.G.firstPlayerHand}
          active={this.isFirstPlayer()}
          score={this.props.G.firstPlayerCaptures.length}
          onCardClick={(card) => this.onCardClick(card)}
        />
        <Board
          cells={this.props.G.cells}
          selectedCard={this.props.G.selectedCard}
          onBoardCellClick={(index) => this.onBoardCellClick(index)}
        />
        <PlayerHand
          hand={this.props.G.secondPlayerHand}
          active={!this.isFirstPlayer()}
          score={this.props.G.secondPlayerCaptures.length}
          onCardClick={(card) => this.onCardClick(card)}
        />
        <div>{ winner }</div>
      </div>
    )
  }
}

const App = Client({
  game: TripleTriad,
  board: GameBoard,
});

export default App;
