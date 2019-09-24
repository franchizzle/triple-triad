/* CHECK CARD
 * Compares an opponents card against a card recently placed, by comparing the two adjacent numerical values
 * @param direction(int): The adjacent direction to check the card. Can be 0 (up), 1 (right), 2 (down) or 3 (left).
 * @param inverse(object): An object holding the values of the card to compare against.
 * @param cell(object): The adjacent grid cell that we are checking against
 * @param currentPlayer: the player who placed the card
 * @param playerCard: the current player's card
*/
export function checkCard(direction, inverse, cell, playerCard, currentPlayer) {
  console.log("direction: " + direction);
  console.log("inverse: " + inverse + " " + typeof(inverse));
  console.log("cell: " + cell);
  console.log("playerCard: " + playerCard);
  console.log("currentPlayer: " + currentPlayer);

  const enemyCard = cell.card;
  console.log("enemy card: " + enemyCard);

  if (enemyCard) {
    if (playerCard[direction] > enemyCard[inverse]) {
      cell.player = currentPlayer;
      return true;
    }
  }
}

export function removeCardFromHand(card, id) {
  card.splice(id, 1);
}


/* randomizeCards
 * Generates a hand of five random cards
 * @param ctx: the boardgame.io context object
 * @returns: an array of 5 cards; each card is an array of 4 values from 1-10
*/
export function randomizeCards(ctx) {
  let cards = [];
  for(let i = 0; i < 5; i++) {
    cards.push(ctx.random.Die(10, 4));
  }
  return cards;
}

/* checkNeighbors
 * A method that returns the possible neighbors (adjacent grid cells) for all nine grid cells.
 * for a grid with this layout:
 * 0 | 1 | 2
 * 3 | 4 | 5
 * 6 | 7 | 8
 * @params id: the index of the grid cell to find neighbors for
 * @returns: an array of grid cell indexes
*/
export function checkNeighbors(index) {
  switch (index) {
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
      console.log('Sorry, we are out of ' + index + '.');
  }
}

/* unsetSelectedCard
 * unsets the boardgame.io game state for selectedCard
 * @param G: the boardgame.io game state
*/
export function unsetSelectedCard(G) {
  G.selectedCard = null;
}

/* flipCards
 * When a card is placed in a grid cell, checks the adjacent cells for cards before determining whether
 *   those cards should be "flipped", or captured, by the player who dropped the card.
 * @param G: gameboard.io game state object
 * @param ctx: gameboard.io context object
 * @param id: index of the cell where the card was recently placed
*/
export function flipCards(G, ctx, index) {
  const neighbors = checkNeighbors(index);
  neighbors.map((direction) => {
    if (G.cells[direction].card !== null) {
      let value = null;
      let inverse = null;
      if (index + 1 === direction) {
        value = 1;
        inverse = 3;
      }
      if (index + 3 === direction) {
        value = 2;
        inverse = 0;
      }
      if (index - 1 === direction) {
        value = 3;
        inverse = 1;
      }
      if (index - 3 === direction) {
        value = 0;
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
      }
    }
  });
}

export function isWin() {

}

export function isDraw() {

}
