import { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.get(`${apiUrl}/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
        setFilteredTasks(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load tasks");
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    let filtered = tasks;

    if (filterStatus) {
      filtered = filtered.filter((task) => task.status === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, filterStatus]);

  const calculateTaskCompletionRate = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "completed").length;
    return totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0;
  };

  const getUpcomingDeadlines = () => {
    const today = new Date();
    const upcomingTasks = tasks.filter((task) => {
      const deadline = new Date(task.deadline);
      const diffInDays = (deadline - today) / (1000 * 60 * 60 * 24);
      return diffInDays >= 0 && diffInDays <= 7; // Tasks due in the next 7 days
    });
    return upcomingTasks;
  };

  const calculateOverallProgress = () => {
    const totalTasks = tasks.length;
    const inProgressTasks = tasks.filter((task) => task.status === "in progress").length;
    const completedTasks = tasks.filter((task) => task.status === "completed").length;
    const pendingTasks = tasks.filter((task) => task.status === "pending").length;

    return {
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
    };
  };

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
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      await axios.delete(`${apiUrl}/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  const columns = ["pending", "in progress", "completed"];
  const upcomingDeadlines = getUpcomingDeadlines();
  const overallProgress = calculateOverallProgress();

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
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

      {/* Reports Section */}
      <div className="mb-6 bg-blue-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Reports</h2>
        <p className="mb-2">
          <span className="font-semibold">Task Completion Rate:</span>{" "}
          {calculateTaskCompletionRate()}%
        </p>
        <div>
          <span className="font-semibold">Upcoming Deadlines:</span>
          {upcomingDeadlines.length > 0 ? (
            <ul className="list-disc ml-5 mt-2">
              {upcomingDeadlines.map((task) => (
                <li key={task._id}>
                  {task.title} - <span>{task.deadline}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-2">No upcoming deadlines</p>
          )}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Overall Progress:</h3>
          <ul className="list-disc ml-5">
            <li>Total Tasks: {overallProgress.totalTasks}</li>
            <li>Pending: {overallProgress.pendingTasks}</li>
            <li>In Progress: {overallProgress.inProgressTasks}</li>
            <li>Completed: {overallProgress.completedTasks}</li>
          </ul>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-4 py-2 w-1/3"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-3 gap-4">
        {columns.map((column) => (
          <div key={column} className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4 capitalize">{column}</h2>
            {filteredTasks
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

      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <TaskForm
            addTask={addTask}
            closeModal={() => setShowForm(false)}
            task={editingTask}
          />
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
