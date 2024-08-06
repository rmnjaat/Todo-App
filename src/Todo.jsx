import { useMemo, useReducer, useState } from "react";
import TaskList from "./TaskList/TaskList";
import AddTask from "./AddTask/AddTask";
import Search from "./Search/Search";
import "./Style/todo.css";
import reducerFn from "./Utils/Reducerfn";

import { debounce } from "lodash";
function Todo() {
  const [Todos, dispatch] = useReducer(reducerFn, iniTodos);
  const [searchText, setSearchText] = useState("");

  function handleAdd(text) {
    dispatch({ type: "add", id: crypto.randomUUID(), title: text });
  }

  //Defining Handlers

  function handleEdit(task) {
    dispatch({
      type: "edit",
      task: task,
    });
  }

  function handleDelete(id) {
    dispatch({ type: "delete", id: id });
  }

  const handleSearch = useMemo(
    () =>
      debounce((text) => {
        setSearchText(text); // Update search text state
      }, 500),
    []
  );

  // Filtered todos based on search text
  const filteredTodos = Todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchText.toLowerCase())
  );
  
  // returning component
  return (
    <div className="container">
      <AddTask handleAdd={handleAdd}></AddTask>
      <h2 className="heading2 ">Your Tasks</h2>

      <Search onSearch={handleSearch}></Search>

      <TaskList
        todos={filteredTodos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      ></TaskList>
    </div>
  );
}

export default Todo;



//Just for initial values
const iniTodos = [
  {
    id: "7129e0ec-75cf-427f-8ceb-3e5ba62a5999",
    title: "Bring Milk",
    isCompleted: true,
    lastEdited: new Date().toLocaleString()
  },
  {
    id: "7129e0ec-75cf-427f-8ceb-3e5ba62a59s9",
    title: "Make Tea",
    isCompleted: false,
    lastEdited: new Date().toLocaleString()
  },
];
