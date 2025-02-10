import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      value={searchQuery || ""}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search tasks..."
      className="p-2 rounded-4xl w-80 h-10 border border-gray-500 focus:border-white focus:border-teal-500"
    />
  );
};

export default SearchBar;
