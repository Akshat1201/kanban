import { useEffect, useState } from "react";
import Column from "./components/column";
import PopUp from "./components/popUp";
import { loadTasks, saveTasks } from "./components/storageUtility";

export default function Home() {

  let emptBody= {
    todo: [],
    inProgress: [],
    completed: [],
  }
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState(()=>{ return loadTasks()?loadTasks():emptBody});

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  return (
    <div className="flex gap-6 p-6 bg-gray-200 w-screen h-screen flex-col pb-[6%] overflow-hidden">
      <div className="flex justify-between">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          ADD 
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          onClick={()=>{setTasks(emptBody)}}
          onDragEnd={(e)=>{console.log(e);
          }}
        >
          Delete All 
        </button>
      </div>
      <div className="flex flex-row gap-4 h-full  justify-between">
        {Object.entries(tasks).map(([key, taskList]) => (
          <Column title={key} tasksList={taskList} />
        ))}
      </div>
      {openModal ? (
        <PopUp
          onClose={() => {
            setOpenModal(false);
          }}
          onSubmit={(e) => {
            e["id"] = new Date().toISOString()
            let temp=JSON.parse(JSON.stringify(tasks));
            temp.todo.push(e)
            setTasks(temp);
          }}
        />
      ) : null}
    </div>
  );
}
