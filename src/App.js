import React, { Component } from 'react';

import './App.scss';

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
      <div className="triple-triad">
        <div className="game-ui-wrapper">
          <div className="game-ui">
            <div className="player-name">
              Player 1: {this.props.G.firstPlayerCaptures.length }
            </div>
            <div className="topbar-title">
              <h1>Triple Triad</h1>
            </div>
            <div className="player-name">
              Player 2: {this.props.G.secondPlayerCaptures.length }
            </div>
          </div>
        </div>
        <div className="game-board">
          <PlayerHand
            hand={this.props.G.firstPlayerHand}
            active={this.isFirstPlayer()}
            player={"player1"}
            selectedCard={this.props.G.selectedCard}
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
            player={"player2"}
            score={this.props.G.secondPlayerCaptures.length}
            onCardClick={(card) => this.onCardClick(card)}
          />
        <div>{ winner }</div>
        </div>
      </div>
    )
  }
}

const App = Client({
  game: TripleTriad,
  board: GameBoard,
  debug: false,
});

export default App;
