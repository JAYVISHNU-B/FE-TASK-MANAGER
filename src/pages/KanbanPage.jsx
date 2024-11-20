import { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load tasks");
      }
    };

    fetchTasks();
  }, []);

  const addTask = (newTask) => {
    setTasks((prevTasks) => {
      if (editingTask) {
        return prevTasks.map((task) =>
          task._id === editingTask._id ? { ...task, ...newTask } : task
        );
      }
      return [...prevTasks, newTask];
    });
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = async (task) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  const columns = ["To Do", "In Progress", "Done"];

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
        >
          + Add Task
        </button>
      </div>

      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <TaskForm
            addTask={addTask}
            closeModal={() => setShowForm(false)}
            task={editingTask}
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {columns.map((column) => (
          <div key={column} className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4">{column}</h2>
            {tasks
              .filter((task) => task.status === column)
              .map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
