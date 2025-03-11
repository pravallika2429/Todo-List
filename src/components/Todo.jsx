import React, { useState, useRef, useEffect } from 'react';
import TodoItems from "./TodoItems";

const Todo = () => {
    const [todoList, setTodoList] = useState([]);
    const [editingId, setEditingId] = useState(null); // Stores the ID of the task being edited
    const inputRef = useRef();

    // Add or update task
    const addOrUpdateTodo = () => {
        const inputText = inputRef.current.value.trim();
        
        if (inputText === "") return;

        if (editingId) {
            // If editing, update the task instead of adding a new one
            setTodoList((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === editingId ? { ...todo, text: inputText } : todo
                )
            );
            setEditingId(null); // Reset editing state
        } else {
            // Otherwise, add a new task
            const newTodo = {
                id: Date.now(),
                text: inputText,
                isComplete: false,
            };
            setTodoList((prev) => [...prev, newTodo]);
        }
        
        inputRef.current.value = ""; // Clear input field
    };

    // Delete task
    const deleteTodo = (id) => {
        setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    // Toggle task completion
    const toggle = (id) => {
        setTodoList((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
            )
        );
    };

    // Edit task (moves task text to input field)
    const editTodo = (id, text) => {
        setEditingId(id);
        inputRef.current.value = text; // Populate input field with the text
        inputRef.current.focus(); // Auto-focus the input field
    };

    useEffect(() => {
        console.log(todoList);
    }, [todoList]);

    return (
        <div className='bg-white place-self-center w-150  flex flex-col p-7 min-h-[550px] rounded-xl shadow-md'>
            <div className='flex items-center mt-5 gap-2'> 
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
            </div>
            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input 
                    ref={inputRef} 
                    className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 placeholder:text-slate-600' 
                    type="text" 
                    placeholder="Add your task here" 
                />
                <button 
                    onClick={addOrUpdateTodo} 
                    className='border-none rounded-full bg-orange-500 w-32 h-14 text-white text-lg font-medium cursor-pointer'
                >
                    {editingId ? "Update" : "Add +"}
                </button>
            </div>
            <div className="max-w-full overflow-hidden break-words">
                {todoList.map((item) => (
                    <TodoItems 
                        key={item.id} 
                        text={item.text} 
                        id={item.id}
                        isComplete={item.isComplete} 
                        deleteTodo={deleteTodo} 
                        toggle={toggle} 
                        editTodo={editTodo} // Pass edit function to child component
                    />
                ))}
            </div>
        </div>
    );
};

export default Todo;
