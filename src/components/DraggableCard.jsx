import React from 'react';

import Card from './Card';
import { useDrag } from 'react-dnd';

export default function DraggableCard(props) {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: "card" },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
    begin: monitor => (
      props.moves.selectCard(props.index)
    ),
    end: (item, monitor) => ({

    })
  })
  return <div className="draggable-card-wrapper" ref={dragRef}>
    <Card {...props} />
  </div>
}
