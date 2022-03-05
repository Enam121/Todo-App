import React, { useReducer, useRef, useEffect } from 'react';
import './ToDoMain.css'

const init = () => {
  const getTodos = localStorage.getItem('todos');
  if (getTodos !== null) {
    return JSON.parse(getTodos);
  }
  return [];
}

const ToDoMain = () => {

  const handleAddNewButton = (): void => {
    const popup: any = document.getElementById("pop-up");
    popup.classList.toggle("show")
  }

  const AddTodoRef = useRef<HTMLInputElement>(null);

  interface Todo {
    id: number;
    text: string | null;
  }

  type ActionType =
    { type: "Add"; text: string | null } | { type: "Remove"; id: number }


  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "Add":
        return [
          ...state,
          {
            id: state.length,
            text: action.text
          }
        ];
      case "Remove":
        return state.filter(({ id }) => id !== action.id);

      default:
        return state;
    }

  }, [], init);

  //add todos in the localstorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]);

  const addTodo = (): void => {
    if (AddTodoRef.current) {
      dispatch({ type: "Add", text: AddTodoRef.current.value });
      AddTodoRef.current.value = "";
    }
  }


  return (
    <div className="card-container">
      <div className="card">
        <div className="header">
          <h2>ACTIVITIES</h2>
        </div>

        <div className="search-box">
          <input type="search" placeholder="search from list" id="" />
        </div>

        <div className='btn-container'>
          <button onClick={handleAddNewButton} className="btn"> +Add New </button>
        </div>

        <div className='popup' id='pop-up'>
          <input type="text" ref={AddTodoRef} />
          <button onClick={() => { addTodo(); handleAddNewButton() }} >Add</button>
        </div>

        <div className="content">
          {
            todos.map((todo, index) => <li key={index}>{todo.text}<button onClick={() => { dispatch({ type: "Remove", id: todo.id }) }}>Remove</button></li>)
          }
        </div>
      </div>
    </div>
  );
};

export default ToDoMain;