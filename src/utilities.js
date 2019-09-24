export function checkCard(direction, playerCard, cell, inv, currentPlayer) {
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

export function removeCardFromHand(card, id) {
  card.splice(id, 1);
}

export function randomizeCards(ctx) {
  let cards = [];
  for(let i = 0; i < 5; i++) {
    cards.push(ctx.random.Die(10, 4));
    // cards = source.reduce((obj, arrValue) => (obj[arrValue] = ctx.random.Die(10), obj), {});
    // hand.push(Object.entries(cards));
  }
  return cards;
}

export function checkNeighbors(id) {
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

export function isWin() {

}

export function isDraw() {

}
