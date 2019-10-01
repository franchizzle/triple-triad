import React from 'react';

import Card from './Card';
import { useDrop } from 'react-dnd';

export default function DroppableBoardSquare(props) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "card",
    drop: () => props.dropAction(props.index),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })
  return <div className="cell" ref={drop} onClick={() => props.onClick(props.index)}>
    { props.card
      ? <Card {...props} />
      : null
    }
  </div>
}
