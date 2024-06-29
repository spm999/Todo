import React from 'react'
import { useState } from 'react'

const Task = () => {
    const [taskDescription, setTaskDescription] = useState('');
    const [category, setCategory] = useState('')
    const [task, setTask] = useState({
        "New Task": [],
        "Progress": [],
        "Review": [],
        "Completed": []
    })
    const handleAdd = () => {
        if (taskDescription && category) {
            console.log(`Category: ${category}`); // Debug log to check category value

            // Update the tasks immutably
            const updatedTasks = {
                ...task,
                [category]: [...task[category], taskDescription]
            };

            setTask(updatedTasks);
            setTaskDescription('');
            console.log(task); // Log current tasks in category

        } else {
            console.log("Task description and category are required.");
        }
    };


    const handleDelete=(category, index)=>{
       console.log(category, index);
       const UpdatedTask={
        ...task, 
        [category]:task[category].filter((_, i)=>i!=index)
       }
       setTask(UpdatedTask)
    }
    return (
        <>
            <div>
                <input type="text"
                    placeholder='Enter your task'
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                />
                <select id="" onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select</option>
                    <option value="New Task">New Task</option>
                    <option value="Progress">Progress</option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                </select>
                <button onClick={handleAdd}>Add Task</button>
            </div>
            <div style={{ display: 'flex' }}>
                {Object.keys(task).map((category) => (
                    <div key={category} style={{ margin: "20px" }}>
                        <h3>{category}</h3>
                        {task[category].map((v, i) => (
                            <div>
                                <li key={i}>
                                    {v}
                                </li>
                                <button onClick={()=>handleDelete(category, i)}>Delete</button>
                            </div>
                        ))}
                    </div>
                ))}

            </div>
        </>

    )
}

export default Task
