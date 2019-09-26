/* CHECK CARD
 * Compares an opponents card against a card recently placed, by comparing the two adjacent numerical values
 * @param direction(int): The adjacent direction to check the card. Can be 0 (up), 1 (right), 2 (down) or 3 (left).
 * @param inverse(object): An object holding the values of the card to compare against.
 * @param neighbor(object): The adjacent grid cell that we are checking against
 * @param currentPlayer: the player who placed the card
 * @param playerCard: the current player's card
*/
export function checkCard(direction, inverse, neighbor, playerCard, currentPlayer) {

  const enemyCard = neighbor.card;

  if (enemyCard) {
    if (playerCard.values[direction] > enemyCard.values[inverse]) {
      neighbor.player = currentPlayer;
      return true;
    }
  }
}

/* removeCardFromHand
 * @param playerHand: the hand of the player who dropped the card
 * @param index: the index of the dropped card in the player's hand
*/
export function removeCardFromHand(playerHand, index) {
  playerHand.splice(index, 1);
}


/* randomizeCards
 * Generates a hand of five random cards
 * @param ctx: the boardgame.io context object
 * @returns: an array of 5 cards; each card is an array of 4 values from 1-10
*/
export function randomizeCards(ctx) {
  let cards = [];
  for(let i = 0; i < 5; i++) {
    cards.push({
      values: ctx.random.Die(10, 4),
      image: "url(https://placedog.net/270/" + (400 + i) + ")" 
    });
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
      console.log('neighbord error');
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
  neighbors.map((neighbor) => {
    if (G.cells[neighbor].card !== null) {
      let direction = null;
      let inverse = null;
      if (index + 1 === neighbor) {
        direction = 1;
        inverse = 3;
      }
      if (index + 3 === neighbor) {
        direction = 2;
        inverse = 0;
      }
      if (index - 1 === neighbor) {
        direction = 3;
        inverse = 1;
      }
      if (index - 3 === neighbor) {
        direction = 0;
        inverse = 2;
      }

      if ((ctx.currentPlayer === '0' && G.secondPlayerCaptures.includes(neighbor)) || (ctx.currentPlayer === '1' && G.firstPlayerCaptures.includes(neighbor))) {
        let capture = checkCard(direction, inverse, G.cells[neighbor], G.selectedCard, ctx.currentPlayer);

        if (capture) {
          if (ctx.currentPlayer === '0') {
            const index = G.secondPlayerCaptures.indexOf(neighbor);
            G.secondPlayerCaptures.splice(index, 1);
            G.firstPlayerCaptures.push(neighbor);
          } else {
            const index = G.firstPlayerCaptures.indexOf(neighbor);
            G.firstPlayerCaptures.splice(index, 1);
            G.secondPlayerCaptures.push(neighbor);
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
