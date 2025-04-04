import React from "react";

const Cards = ({ task }) => {
  return (
    <div className="bg-gray-100 p-3 rounded-lg shadow-sm  transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:shadow-lg">
      <h3 className="font-medium text-gray-900">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p>{task.id}</p>
    </div>
  );
};

export default Cards;
