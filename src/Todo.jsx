import { useMemo, useReducer, useState } from "react";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import Search from "./Search/Search";
import "./todo.css"

import { debounce } from "lodash";
function Todo() {
  // const [Todos, setTodos] = useState(iniTodos);
  const [Todos, dispatch] = useReducer(reducerFn, iniTodos);
  const [searchText, setSearchText] = useState("");

  function handleAdd(text) {
    // setTodos([
    //   ...Todos,
    //   {
    //     id: crypto.randomUUID(),
    //     title: text,
    //     isCompleted: false,
    //     lastEdited: new Date().toLocaleString(),
    //   },
    // ]);

    dispatch({ type: "add", id: crypto.randomUUID(), title: text });
  }

  function handleCheck(task) {
    dispatch({
      type: "checked",
      task: task,
    });
  }

  function handleEdit(task) {
    // console.log(task, "Task printd");
    // setTodos(
    //   Todos.map((todo) => {
    //     if (todo.id != task.id) {
    //       return todo;
    //     } else {
    //       return task;
    //     }
    //   })
    // );x

    dispatch({
      type: "edit",
      task: task,
    });
  }

  function handleDelete(id) {
    // setTodos(Todos.filter((todo) => todo.id != id));

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

  function reducerFn(todos, action) {
    switch (action.type) {
      case "add": {
        return [
          ...todos,
          {
            id: action.id,
            title: action.title,
            isCompleted: false,
            lastEdited: new Date().toLocaleString(),
          },
        ];
      }

      case "edit": {
        return todos.map((todo) => {
          if (todo.id != action.task.id) {
            return todo;
          } else {
            return action.task;
          }
        });
      }

      case "delete": {
        return todos.filter((todo) => todo.id != action.id);
      }

      case "checked": {
        return todos.map((todo) => {
          if (todo.id != action.task.id) {
            return todo;
          } else {
            return action.task;
          }
        });
      }
    }
  }

  console.log(Todos);
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

const iniTodos = [];
