import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL='http://localhost:3000/todos'

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get(API_URL);
        setTodos(response.data);
    };

    const createTodo = async (e) => {
        e.preventDefault();
        const response = await axios.post(API_URL, { title });
        setTodos([...todos, response.data]);
        setTitle('');
    };

    const updateTodo = async (id, completed) => {
        const response = await axios.put(`${API_URL}/${id}`, { completed });
        setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    };

    const deleteTodo = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={createTodo}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a todo"
                />
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => updateTodo(todo._id, !todo.completed)}
                        />
                        {todo.title}
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
