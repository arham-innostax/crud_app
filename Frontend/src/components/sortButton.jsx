import React from 'react'

const SortButton = ({ sortTodos }) => (
    <div className="flex flex-row items-center cursor-pointer" onClick={sortTodos}>
      <img className="h-4 border rounded bg-gray-100" src="./sort.png" alt="Sort" />
      <p className="ml-2">Sort</p>
    </div>
  );
export default SortButton;
  