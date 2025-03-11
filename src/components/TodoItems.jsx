import React from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, editTodo }) => {
    return (
        <div className="flex items-center my-3 gap-2 bg-gray-100 px-4 py-3 rounded-lg w-full">
            <div 
                onClick={() => toggle(id)} 
                className="flex flex-1 items-center cursor-pointer max-w-full overflow-hidden"
            >
                <p className={`text-slate-700 ml-4 text-[17px] break-words overflow-hidden ${isComplete ? "line-through" : ""}`}>
                    {text}
                </p>
            </div>

            {/* Edit Button */}
            <button onClick={() => editTodo(id, text)} className="text-blue-600 ml-2">
                <RiEdit2Line />
            </button>

            {/* Delete Button */}
            <div onClick={() => deleteTodo(id)} className="cursor-pointer text-red-600 ml-2">
                <RiDeleteBin6Line />
            </div>
        </div>
    );
};

export default TodoItems;
