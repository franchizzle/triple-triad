import React, { Component } from 'react';

import './App.css';

import { Client } from 'boardgame.io/react';
import TripleTriad from './TripleTriad';

class GameBoard extends Component {
  onCardClick(id) {
    this.props.moves.selectCard(id);
  }

  // when grid cell is clicked
  onClick(id) {
    if(this.isActive(id)) {
      this.props.moves.selectCell(id);
      if (this.props.G.selectedCard !== null) {
        this.props.events.endTurn();
      }
    }
  }

  isActive(id) {
    if (!this.props.isActive) return false;
    if (this.props.G.cells[id].card !== null) return false;
    return true;
  }

  isFirstPlayer() {
    return this.props.ctx.currentPlayer === '0';
  }

  playerCaptured(id) {
    if (id === null) {
      return 'blank';
    } else {
      return id === '0' ? 'player1' : 'player2';
      // if it's player 1 that put the card, return player1 class
      // else, if it's player 2,  return player2 class
    }
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
        <div className={`player player1 ${this.isFirstPlayer() ? "current" : ""}`}>
          {
              this.props.G.firstPlayerHand.map((card, index) => {
                return (
                  <div className="card" onClick={() => this.onCardClick(index)}>
                    { card.map((v) => {
                        return (
                          <div className="cardScore">{v}</div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
            <div>Score: {this.props.G.firstPlayerCaptures.length} </div>
        </div>
        <div className="board">
          {
            this.props.G.cells.map((id, index) => {
              let cellValue = this.props.G.selectedCard ? id.card : [];
              return (
                <div key={index} className="cell" onClick={() => this.onClick(index)}>
                  <div className={`card selected ${this.playerCaptured(id.player)}`}>
                    { 
                      cellValue ? 
                      (cellValue.map((v) => {
                        return (
                          <div className="cardScore">{v}</div>
                        )
                      })) :
                      ""
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className={`player player2 ${this.isFirstPlayer() ? "" : "current"}`}>
          {
            this.props.G.secondPlayerHand.map((card, index) => {
              return (
                <div className="card" onClick={() => this.onCardClick(index)}>
                  { card.map((v) => {
                      return (
                        <div className="cardScore">{v}</div>
                      )
                    })
                  }
                </div>
              )
            })
          }
          <div>Score: {this.props.G.secondPlayerCaptures.length} </div>
        </div>
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
