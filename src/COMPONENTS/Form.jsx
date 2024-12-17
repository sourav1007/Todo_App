import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function Form() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState(["one"]);
  const [edit, setEdit] = useState(null);
  const [editValue, setEditValue] = useState("");

  function addTask() {
    if (!value.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    setTodo((prev) => [...prev, value]);
    setValue("");
  }

  function deleteTask(id) {
    setTodo((prev) => prev.filter((_, index) => index !== id));
  }

  function editTask(id) {
    setEdit(id);
    setEditValue(todo[id]); // Set the current value in the edit input
  }

  function saveEdit(id) {
    if (!editValue.trim()) {
      alert("Edited task cannot be empty!");
      return;
    }
    setTodo((prev) =>
      prev.map((item, index) => (index === id ? editValue : item))
    );
    setEdit(null); // Exit edit mode
    setEditValue("");
  }

  return (
    <>
      <div className="mb-5">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="p-4 w-[80%] outline-none rounded-tl-md rounded-bl-md text-xl text-white"
          type="text"
          placeholder="Enter the task here"
        />
        <button
          className="p-4 w-[20%] text-xl outline-none font-bold  bg-yellow-500 rounded-tr-md rounded-br-md text-black text-center"

          onClick={addTask}
        >
          Add
        </button>
      </div>

      {todo.map((item, id) => (
        <div
          key={id}
          className="bg-yellow-500 w-full my-3 flex justify-between md:w-[90%]  items-center  rounded m-auto  text-black p-4"
        >
          {edit === id ? (
            <div className="flex items-center gap-3 md:w-[90%]">
              <input
                className="px-2 py-1 outline-none w-[70%]   rounded-md text-white"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Enter new value"
              />
              <button
                className="bg-black rounded-md text-white px-3 py-1"
                onClick={() => saveEdit(id)}
              >
                Save
              </button>
            </div>
          ) : (
            <h1 className='text-xl w-[75%] font-bold overflow-hidden '>{item}</h1>
          )}
          <div className="flex items-center gap-7">
            <MdDelete
              className="cursor-pointer  text-2xl"
              onClick={() => deleteTask(id)}
            />
            <FaEdit
              className="cursor-pointer text-2xl"
              onClick={() => editTask(id)}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default Form;
