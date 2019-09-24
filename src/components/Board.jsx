import React, { Component } from 'react';

/* Board
 * @props cells: the boardgame.io game object for the grid cells
 * @props selectedCard: keeps track of the card currently selected from a player's hand
*/
class Board extends Component {
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
    const { cells, selectedCard } = this.props;

    return (
      <div className="board">
        {
          cells.map((id, index) => {
            let cellValue = selectedCard ? id.card : [];
            return (
              <div key={index} className="cell" onClick={() => this.props.onBoardCellClick(index)}>
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
    )
  }
}

export default Board;
