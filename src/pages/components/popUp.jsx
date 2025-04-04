import react,{ useState } from "react";

const PopUp = ({ onClose, onSubmit }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!taskName.trim()) return alert("Task name is required!");
    onSubmit({ title:taskName, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-3 right-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add a New Task</h2>
        <input
          type="text"
          placeholder="Task Name"
          className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600" onClick={handleSubmit}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default PopUp;
