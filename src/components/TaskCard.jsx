const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg mb-2">{task.title}</h3>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Status:</span> {task.status}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Deadline:</span> {task.deadline}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Category:</span> {task.category}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => onEdit(task)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => onDelete(task)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  export default TaskCard;
  