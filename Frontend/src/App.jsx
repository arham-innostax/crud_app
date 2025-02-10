import { useState, useEffect } from "react";
import ModalComponent from "./components/ModalComponent";
import TodoList from "./components/TodoList";
import axios from 'axios';
import Modal from "react-modal"
import SortButton from "./components/sortButton";
import SearchBar from "./components/SearchBar";

Modal.setAppElement("#root");

const API_URL = 'http://localhost:3000/todos/'; 

function App() {
  const [todos, setTodos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [modalInputValue, setModalInputValue] = useState("");
  const [modalPriority, setModalPriority] = useState("low");
  const [editIndex, setEditIndex] = useState(null);
  const [editModalInputValue, setEditModalInputValue] = useState("");
  const [editModalPriority, setEditModalPriority] = useState("low");
  const [searchQuery,setSearchQuery]=useState("")

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };

  const addTodo = async () => {
    if (modalInputValue.trim()) {
        console.log("Adding todo with priority:", modalPriority);  
        try {
            const response = await axios.post(API_URL, { title: modalInputValue, priority: modalPriority });
            setTodos([...todos, response.data]);
            setModalInputValue("");
            setModalPriority("low");
            setModalIsOpen(false);
        } catch (error) {
            console.error('Error adding todo:', error.message);
        }
    }
};


  const deleteTodo = async (index) => {
    const todoId = todos[index]._id;
    try {
      await axios.delete(`${API_URL}${todoId}`);
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditModalInputValue(todos[index].title);
    setEditModalPriority(todos[index].priority);
    setEditModalIsOpen(true);
  };


const saveEdit = async () => {
    const todoId = todos[editIndex]._id;
    console.log("Saving edit with priority:", editModalPriority);  
    try {
        const response = await axios.put(`${API_URL}${todoId}`, { title: editModalInputValue, priority: editModalPriority });
        const newTodos = todos.map((todo, i) => i === editIndex ? response.data : todo);
        setTodos(newTodos);
        setEditIndex(null);
        setEditModalIsOpen(false);
        setEditModalInputValue("");
    } catch (error) {
        console.error('Error updating todo:', error.message);
    }
};

  const sortTodos = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      if (a.priority === "high" && b.priority !== "low") return -1;
      if (a.priority === "high" && b.priority !== "medium") return -1;
      if (a.priority === "medium" && b.priority === "low") return -1;
      if (a.priority === "low" && b.priority !== "low") return 1;
      return 0;
    });
    setTodos(sortedTodos);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">To Do</h1>
      
      <div className="w-full">
        <div className="flex shadow justify-between border border-white/80 p-4 rounded mb-2 border-gray-500">
         
          <SortButton sortTodos={sortTodos}/>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          <button
            onClick={() => setModalIsOpen(true)}
            className="bg-green-500 text-white p-2 rounded w-1/6 mb-4"
          >
            +Add Task
          </button>
        </div>
        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          startEdit={startEdit}
        />
      </div>

      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        modalTitle="Add Task"
        inputValue={modalInputValue}
        setInputValue={setModalInputValue}
        modalPriority={modalPriority}
        setModalPriority={setModalPriority}
        onSave={addTodo}
      />

      <ModalComponent
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        modalTitle="Edit Task"
        inputValue={editModalInputValue}
        setInputValue={setEditModalInputValue}
        modalPriority={editModalPriority}
        setModalPriority={setEditModalPriority}
        onSave={saveEdit}
      />
    </div>
  );
}

export default App;
