import { useEffect, useState } from "react";
import Column from "./components/column";
import PopUp from "./components/popUp";
import {
  loadPriority,
  loadTasks,
  savePriority,
  saveTasks,
} from "./components/storageUtility";
import { DragDropContext } from "react-beautiful-dnd";

export default function Home() {
  let emptBody = {
    todo: [],
    inProgress: [],
    completed: [],
  };
  const [openModal, setOpenModal] = useState(false);
  const [priority, setPriority] = useState(() => {
    return loadPriority();
  });
  const [tasks, setTasks] = useState(() => {
    return loadTasks() ? loadTasks() : emptBody;
  });

  useEffect(() => {
    saveTasks(tasks);
    savePriority(priority);
  }, [tasks]);

  function onDragEnd(event) {
    const { source, destination } = event;

    let temp = tasks;

    if (source.droppableId === destination.droppableId) {
      //same column just change priority number
      let sourceElement = JSON.parse(
        JSON.stringify(tasks[source.droppableId][source.index])
      );
      temp[source.droppableId][source.index].priority =
        temp[destination.droppableId][destination.index].priority;
      temp[destination.droppableId][destination.index].priority =
        sourceElement.priority;
    } else {
      let transferElement = tasks[source.droppableId][source.index];
      temp[destination.droppableId].push(transferElement); // adding
      temp[source.droppableId].splice(source.index, 1); //deleting
    }
    setTasks(temp);
  }

  return (
    <div className="flex gap-6 p-6 bg-gray-200 w-screen h-screen flex-col pb-[6%] overflow-hidden">
      <div className="flex justify-between">
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          ADD
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          onClick={() => {
            setTasks(emptBody);
            savePriority(0);
            setPriority(1);
          }}
        >
          Delete All
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row gap-4 h-full  justify-between">
          {Object.entries(tasks).map(([key, taskList]) => (
            <Column key={key} title={key} tasksList={taskList} />
          ))}
        </div>
        {/* <DragOverlay>{activeTask ? <Cards task={activeTask} /> : null}</DragOverlay> */}
      </DragDropContext>
      {openModal ? (
        <PopUp
          onClose={() => {
            setOpenModal(false);
          }}
          onSubmit={(e) => {
            e["id"] = Date.parse(new Date().toISOString());
            e["priority"] = priority;
            let temp = JSON.parse(JSON.stringify(tasks));
            temp.todo.push(e);
            setTasks(temp);
            setPriority((prev) => prev + 1);
          }}
        />
      ) : null}
    </div>
  );
}
