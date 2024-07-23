import { useState } from "react";
import Create from "./create";

function Home() {
    const [todos, setTodos] = useState([]);

    const handleDelete = (index) => {
        fetch("http://localhost:3000/delete").then((response)=>{
            if(response.status==200){
            setTodos(todos.filter((_, i) => i !== index));
            }
        }).catch((e)=>{
            console.log(e);
        })
    };

    const handleComplete = (index) => {
        setTodos(todos.map((todo, i) => i === index ? { ...todo, completed: !todo.completed } : todo));
    };

    return (
        <>
            <h1>Todo List</h1>
            <Create setTodos={setTodos} />
            {
                todos.length === 0
                    ? <div><h2>No Record</h2></div>
                    : todos.map((todo, index) => (
                        <div key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.task}
                            <button onClick={() => handleComplete(index)}>✓</button>
                            <button onClick={() => handleDelete(index)}>🗑️</button>
                        </div>
                    ))
            }
        </>
    );
}

export default Home;
