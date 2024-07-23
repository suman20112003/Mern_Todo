import React, { useState } from "react";
import axios from 'axios';

function Create({ setTodos }) {
    const [task, setTask] = useState('');

    const handleAdd = () => {
        if (!task.trim()) {
            console.log('Task is empty');
            return;
        }

        axios.post('http://localhost:3000/add', { task })
            .then(result => {
                console.log(result);
                if (setTodos) {
                    setTodos(prev => [...prev, { task: result.data.task, completed: false }]);
                }
                setTask('');
            }).catch(e => {
                console.log(e);
            });
    };

    return (
        <>
            <input
                type="text"
                placeholder="Enter Your Task"
                onChange={(e) => setTask(e.target.value)}
                value={task}
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </>
    );
}

export default Create;
