import React, { Component } from 'react';

class Card extends Component {
  render() {
    const { card, index, player } = this.props;
    console.log(index);
    return (
      <div className={"card " + player} onClick={() => this.props.onCardClick(index)}>
        { card.map((v) => {
            return (
              <div className="cardScore">{v}</div>
            )
          })
        }
      </div>
    )
  }
}

export default Card;
