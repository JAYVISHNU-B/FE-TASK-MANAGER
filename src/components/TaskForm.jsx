import { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ addTask, closeModal, task }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "low",
    status: "pending",
    category: "work",
    assignedTo: "",
  });

  const [availableUsers, setAvailableUsers] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (task) {
      setFormData(task);
    }
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Authentication token
        const response = await axios.get("http://localhost:5000/api/tasks/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAvailableUsers(response.data); // Assuming response is an array of user objects
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to load users.");
      }
    };

    fetchUsers();
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Authentication token
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      addTask(response.data); // Pass the created task to the parent
      closeModal();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add task!");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative overflow-y-auto max-h-[80vh]">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={closeModal}
      >
        ✖
      </button>
      <h2 className="text-xl font-bold mb-4">{task ? "Edit Task" : "Add Task"}</h2>
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
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        {/* Status */}
        <select
          className="w-full mb-3 p-2 border rounded"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="pending">pending</option>
          <option value="in progress">in progress</option>
          <option value="completed">completed</option>
        </select>
        {/* Category */}
        <select
          className="w-full mb-3 p-2 border rounded"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="work">work</option>
          <option value="personal">personal</option>
        </select>
        {/* Assignee */}
        <select
          className="w-full mb-3 p-2 border rounded"
          value={formData.assignedTo}
          onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
        >
          <option value="">Select Assignee</option>
          {availableUsers.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} {/* Display user name but store user ID */}
            </option>
          ))}
        </select>
        <p>
          <label htmlFor="image" className="block mb-2 font-bold">
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            placeholder="Upload Your Blog Image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </p>
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
            {task ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
