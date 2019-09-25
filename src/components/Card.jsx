import React, { Component } from 'react';

class Card extends Component {
  render() {
    const { card, index, player } = this.props;
    console.log(card);
    debugger;
    if (!card.values.map) {
      return (
        <div></div>
      )
    } else {
    return (
      <div className={"card " + player} onClick={() => this.props.onCardClick(index)} style={{backgroundImage: card.image}}>
        <div className="card-scores">
          { card.values.map((v) => {
              return (
                <p className="card-score">{v}</p>
              )
            })
          }
        </div>
      </div>
    )
    }
  }
}

export default Card;
