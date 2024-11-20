import { useState, useEffect } from 'react';

const TaskForm = ({ addTask, closeModal, task }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'Low',
    status: 'To Do',
    category: 'Work',
    assignee: '',
    comments: '',
    sharedUsers: [],
  });

  const availableUsers = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown']; // Example users

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(formData);
  };

  const handleShareChange = (e) => {
    const { options } = e.target;
    const selectedUsers = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedUsers.push(options[i].value);
      }
    }
    setFormData({ ...formData, sharedUsers: selectedUsers });
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative overflow-y-auto max-h-[80vh]">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={closeModal}
      >
        ✖
      </button>
      <h2 className="text-xl font-bold mb-4">{task ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 p-2 border rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        {/* Description */}
        <textarea
          placeholder="Description"
          className="w-full mb-3 p-2 border rounded"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        {/* Deadline */}
        <input
          type="date"
          className="w-full mb-3 p-2 border rounded"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          required
        />
        {/* Priority */}
        <select
          className="w-full mb-3 p-2 border rounded"
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {/* Status */}
        <select
          className="w-full mb-3 p-2 border rounded"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        {/* Category */}
        <select
          className="w-full mb-3 p-2 border rounded"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        {/* Assignee (Dropdown) */}
        <select
          className="w-full mb-3 p-2 border rounded"
          value={formData.assignee}
          onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
        >
          <option value="">Select Assignee</option>
          {availableUsers.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>
        {/* Comments */}
        <textarea
          placeholder="Add Comments"
          className="w-full mb-3 p-2 border rounded"
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
        />
        {/* Share Task */}
        <select
          multiple
          className="w-full mb-3 p-2 border rounded"
          value={formData.sharedUsers}
          onChange={handleShareChange}
        >
          {availableUsers.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>
        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={closeModal}
          >
            Close
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {task ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
