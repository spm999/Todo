import React, { useState } from 'react';

const Todo = () => {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [toSearch, setToSearch] = useState('');

    const handleSubmit = () => {
        if (newTodo.trim() !== '') { // Ensure that empty todos are not added
            const todosList = [...todos, newTodo];
            setTodos(todosList);
            setNewTodo('');
        }
    };

    const deleteThis = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    const atoz = () => {
        const sortedTodos = [...todos].sort();
        setTodos(sortedTodos);
    };

    const ztoa = () => {
        const sortedTodos = [...todos].sort().reverse();
        setTodos(sortedTodos);
    };

    const filteredTodos = toSearch
        ? todos.filter(item => item.toLowerCase().includes(toSearch.toLowerCase()))
        : todos;

    return (
        <div>
            <input
                type="text"
                placeholder="Enter your todo here"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={handleSubmit}>ADD This</button>
            <br />
            <br />
            <input
                type="text"
                placeholder="Enter to search"
                value={toSearch}
                onChange={(e)=>setToSearch(e.target.value)}
            />
            <br />
            <br />
            <div>
                <ul>
                    {filteredTodos.map((item, index) => (
                        <li key={index}>
                            {item}
                            <button onClick={() => deleteThis(index)}>Delete This</button>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={atoz}>A To Z</button>
            <button onClick={ztoa}>Z To A</button>
        </div>
    );
};

export default Todo;
