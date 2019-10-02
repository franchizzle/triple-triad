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
    if (this.cellIsEmpty(id)) {
      if (this.props.G.selectedCard !== null) {
        this.props.moves.selectCell(id);
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

  restart() {
    this.props.reset();
  }

  render() {
    const gameover = this.props.ctx.gameover;
    const player1Score = this.props.G.firstPlayerCaptures.length + this.props.G.firstPlayerHand.length;
    const player2Score = this.props.G.secondPlayerCaptures.length + this.props.G.secondPlayerHand.length;

    return (
      <div className="triple-triad">
        <div className="game-ui-wrapper">
          <div className="game-ui">
            <div className="player-header player1-header">
              <div className="player-name">
                <p>Player 1</p>
              </div>
              <div className="player-score">
                <h2>{player1Score}</h2>
              </div>
            </div>
            <div className="topbar-title">
              <h1>Triple Triad</h1>
            </div>
            <div className="player-header player2-header">
              <div className="player-name">
                <p>Player 2</p>
              </div>
              <div className="player-score">
                <h2>{player2Score}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className={"turn-UI " + (this.isFirstPlayer() ? "p1-turn" : "p2-turn")}>
          <div className="turn-UI--svg-wrapper">
            <svg version="1.1" x="0px" y="0px" width="100px" height="80px" viewBox="0 0 250 250" enableBackground="new 0 0 250 250">
              <g id="Layer_1">
              </g>
              <g id="Layer_2">
              <polygon fill="#ffff00" stroke="#dddd33" strokeWidth="3" strokeMiterlimit="10" points="69.445,125 125,28.774 180.556,125
                125,221.227 	"/>
              <polygon fill="#ffff00" stroke="#dddd33" strokeWidth="3" strokeMiterlimit="10" points="103.008,125 125,86.909 146.992,125
                125,163.092 	"/>
              </g>
            </svg>
          </div>
        </div>
        <div className="game-board">
          <PlayerHand
            hand={this.props.G.firstPlayerHand}
            active={this.isFirstPlayer()}
            player={"player1"}
            selectedCard={this.props.G.selectedCard}
            onCardClick={(card) => this.onCardClick(card)}
            moves={this.props.moves}
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
            selectedCard={this.props.G.selectedCard}
            onCardClick={(card) => this.onCardClick(card)}
            moves={this.props.moves}
          />
        </div>
        { gameover !== null && this.props.ctx.gameover
          ? <div className="endgame-modal--wrapper">
              <div className="endgame-modal">
                { gameover.winner !== undefined ? (
                    <h1>Player {(parseInt(gameover.winner) + 1)} Wins!</h1>
                  ) : (
                    <h1>Draw!</h1>
                  )
                }
                <button onClick={() => this.restart()}>Reset</button>
              </div>
            </div>
          : null
        }

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
