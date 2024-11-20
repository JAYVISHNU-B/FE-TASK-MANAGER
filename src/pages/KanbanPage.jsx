import { useState } from 'react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Add a new task
  const addTask = (task) => {
    if (editingTask) {
      // Edit an existing task
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...editingTask, ...task } : t)));
      setEditingTask(null);
    } else {
      // Add a new task
      const newTask = { id: tasks.length + 1, ...task };
      setTasks([...tasks, newTask]);
    }
    setShowForm(false);
  };

  // Edit a task
  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Delete a task
  const handleDelete = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const columns = ['To Do', 'In Progress', 'Done'];

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
                  key={task.id}
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
