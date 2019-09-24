import React, { Component } from 'react';

class Card extends Component {
  render() {
    const { card, index } = this.props;
    console.log(index);
    return (
      <div className="card" onClick={() => this.props.onCardClick(index)}>
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
