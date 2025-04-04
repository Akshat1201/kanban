import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Cards = ({ task, index }) => {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-gray-100 p-3 rounded-lg shadow-sm  "
        >
          <h3 className="font-medium text-gray-900">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Cards;
