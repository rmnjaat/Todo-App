import { useState } from "react";

function TaskList({ todos, onEdit, onDelete }) {
  return (
    <>
      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id} className="elements">
            <Task todo={todo} onEdit={onEdit} onDelete={onDelete}></Task>
          </li>
        ))}
      </ul>
    </>
  );
}

function Task({ todo, onEdit, onDelete }) {
  let content;
  const [isEditing, setisEditing] = useState(false);
  const [text, setText] = useState(todo.title);
  const [isExpanded, setisExpended] = useState(false);


  //setting content on the basis of editing or save
  if (isEditing) {
    content = (
      <>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input editInput"
        />
      </>
    );
  } else {
    content = <>{todo.title}</>;
  }

  return (
      <>
      <div
        className={todo.isCompleted ? "strike content" : "content"}
      >
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={(e) => {
            onEdit({
              ...todo,
              isCompleted: e.target.checked,
              lastEdited: new Date().toLocaleString(),
            });
          }}
        />
        <div style={{display:"inline"}}  onClick={() => {
          setisExpended(!isExpanded);
        }}>

        {content}

        {isExpanded && (
          <div className="small-text">Last Edited: {todo.lastEdited}</div>
        )}

        </div>
      </div>

      <div className="buttons">
        {!isEditing ? (
          <button
            onClick={() => {
              setisEditing(true);
            }}
            className="button"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={(e) => {
              onEdit({
                ...todo,
                title: text,
                lastEdited: new Date().toLocaleString(),
              });
              setisEditing(false);
            }}
            className="button"
          >
            Save
          </button>
        )}

        <button onClick={() => onDelete(todo.id)} className="button">
          Delete
        </button>
      </div>
    </> 
  );
}

export default TaskList;
