import React from 'react';

const Todo = ({ index, todo, deleteTodo, startEdit }) => {
  return (
    <tr className="border-b">
      <td className="px-4 py-2 text-center">{index + 1}</td>

      <td className="px-4 py-2 flex justify-center">
        <div className="flex justify-center items-center">
          {todo.title}
        </div>
      </td>

      <td className="px-4 py-2 text-center">
        <button
          className={`p-2 rounded ${
            todo.priority === "high"
              ? "bg-green-500"
              : todo.priority === "medium"
              ? "bg-yellow-500"
              : "bg-red-500"
          } text-white`}
          disabled
        >
          {todo.priority === "high"
            ? "High"
            : todo.priority === "medium"
            ? "Medium"
            : "Low"}
        </button>
      </td>

      <td className="px-4 py-2">
        <div className="flex justify-center items-center">
          <img
            className="h-5 w-5 cursor-pointer ml-2"
            src="./delete.png"
            onClick={deleteTodo}
            alt="Delete"
          />
          <img
            className="h-5 w-5 cursor-pointer ml-2"
            src="./pencil.png"
            onClick={startEdit}
            alt="Edit"
          />
        </div>
      </td>
    </tr>
  );
}

export default Todo;
