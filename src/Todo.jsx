import React, { useState, useEffect } from 'react';

const Todo = () => {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [toSearch, setToSearch] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    // Load todos from localStorage when the component mounts
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('allTodos'));
        if (savedTodos) {
            setTodos(savedTodos);
        }
    }, []);

    // Save todos to localStorage whenever the todos array is updated
    useEffect(() => {
        localStorage.setItem('allTodos', JSON.stringify(todos));
    }, [todos]);

    const handleSubmit = () => {
        if (newTodo.trim() !== '') {
            const todosList = [...todos, newTodo];
            setTodos(todosList);
            setNewTodo('');
        }
    };

    const deleteThis = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    const editThis = (index) => {
        setEditMode(true);
        setEditIndex(index);
        setEditedText(todos[index]);
    };

    const saveEdit = () => {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = editedText;
        setTodos(updatedTodos);
        setEditMode(false);
        setEditIndex(null);
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
                            {editMode && editIndex === index ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                    />
                                    <button onClick={saveEdit}>Save</button>
                                </div>
                            ) : (
                                <div>
                                    {item}
                                    <button onClick={() => deleteThis(index)}>Delete This</button>
                                    <button onClick={() => editThis(index)}>Edit</button>
                                </div>
                            )}
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
