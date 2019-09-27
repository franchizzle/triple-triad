import React, { Component } from 'react';

class Card extends Component {
  render() {
    const { card, index, player, selectedCard } = this.props;

    if (!card.values.map) {
      return (
        <div></div>
      )
    } else {
    return (
      <div className={"card " + player + " " + (card == selectedCard ? "active" : "")} onClick={() => this.props.onCardClick(index)}>
        <div className="card-image-wrapper" style={{backgroundImage: card.image}}>
          <div className="card-scores">
            { card.values.map((v) => {
                return (
                  <p className="card-score">
                    {v === 10 ? 'A' : v }
                  </p>
                )
              })
            }
          </div>
        </div>
      </div>
    )
    }
  }
}

export default Card;
