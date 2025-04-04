import React from "react";
import Cards from "./card";

const Column = ({ title, tasksList }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-110 max-h-full  h-screen overflow-y-auto">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
      {/* Tasks List */}
      <div className="space-y-2">
        {tasksList.map((task) => (
          <Cards task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
