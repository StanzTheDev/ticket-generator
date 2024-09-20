import { useState } from 'react'; 
import './App.css';
import deleteIcon from './Delete.svg';
import editIcon from './Edit.svg';

function App() {
  const [todos, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);

  const addTodo = () => {
    if (input.trim() !== "") {
      if (isEditing) {
        const updatedTodos = [...todos];
        updatedTodos[currentTodoIndex] = input;
        setTodo(updatedTodos);
        setIsEditing(false);
        setCurrentTodoIndex(null);
      } else {
        setTodo([...todos, input]);
      }
      setInput("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodo(newTodos);
  };

  const editTodo = (index) => {
    setInput(todos[index]);
    setIsEditing(true);
    setCurrentTodoIndex(index);
  };

  return (
    <div className="max-w-md w-500 pb-4 bg-slate-600 rounded-md mx-auto mt-10">
      <h1 className="font-bold m-7 text-center pt-3 text-2xl text-white">To-Do List</h1>
      <div className="flex justify-around my-10">
        <input
          className="w-60 h-8 rounded-md pl-5 bg-slate-100"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a new task"
        />
        <button
          className="w-28 h-9 font-semibold bg-blue-700 text-white rounded-md"
          onClick={addTodo}
        >
          {isEditing ? "Save Task" : "Add Task"}
        </button>
      </div>

      <ul className="">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="p-2 bg-gray-100 w-[90%] mx-auto rounded mb-2 flex justify-between items-center"
          >
            {todo}
            <div className="flex gap-2">
              <button
                className="bg-green-500 text-white p-1 rounded w-8 h-8 flex justify-center items-center"
                onClick={() => editTodo(index)}
              >
                <img src={editIcon} alt='Edit Icon'></img>
              </button>
              <button
                className="bg-red-500 text-white p-1 rounded w-8 h-8 flex justify-center items-center"
                onClick={() => deleteTodo(index)}
              >
                <img src={deleteIcon} alt="Delete Icon" className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
