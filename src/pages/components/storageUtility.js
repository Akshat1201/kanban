const STORAGE_KEY = "kanban-tasks";

export const loadTasks = () => {
  if (typeof window === "undefined") return null; // Ensure it's running in the browser
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const saveTasks = (tasks) => {
  if (typeof window === "undefined") return; // Prevent errors on the server
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
