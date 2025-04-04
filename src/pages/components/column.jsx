import React from "react";
import Cards from "./card";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ title, tasksList }) => {
  return (
    <Droppable
      droppableId={String(title)}
      isDropDisabled={false}
      isCombineEnabled={true}
      ignoreContainerClipping={true}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-white rounded-lg shadow-md p-4 w-110 max-h-full  h-screen overflow-y-auto"
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
          <div className="space-y-2">
            {tasksList
              .slice()
              .sort((a, b) => a.priority - b.priority)
              .map((task, index) => (
                <Cards task={task} key={task.id} index={index} />
              ))}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
