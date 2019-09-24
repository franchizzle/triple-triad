import React, { Component } from 'react';
import './App.css';
import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';


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

function isWin() {

}

function isDraw() {

}

function checkCard(direction, playerCard, cell, inv, currentPlayer) {
  const enemyCard = cell.card;
  if (enemyCard) {
    // console.log("Enemy " + enemyCard, "Player " + playerCard, "Direction " + direction);
    if (playerCard[direction] > enemyCard[inv]) {
      cell.player = currentPlayer;
      return true;
    }
  }
  // if yes, check if playerCard > enemyCard in corresponding direction
}

function randomizeCards(ctx) {
  let cards = [];
  for(let i = 0; i < 5; i++) {
    cards.push(ctx.random.Die(10, 4));
    // cards = source.reduce((obj, arrValue) => (obj[arrValue] = ctx.random.Die(10), obj), {}); 
    // hand.push(Object.entries(cards));
  }
  return cards;
}

function checkNeighbors(id) {
  switch (id) {
    case 0:
      return [1, 3];
    case 1:
        return [0, 2, 4];
    case 2:
        return [1, 5];
    case 3:
        return [0, 4, 6];
    case 4:
        return [1, 3, 5, 7];
    case 5:
        return [2, 4, 8];
    case 6:
        return [3, 7];
    case 7:
        return [4, 6, 8];
    case 8:
        return [5, 7];
    default:
      console.log('Sorry, we are out of ' + id + '.');
  }
}

function removeCardFromHand(card, id) {
  card.splice(id, 1);
}

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

const App = Client({ 
  game: TripleTriad,
  board: GameBoard,
});

export default App;
