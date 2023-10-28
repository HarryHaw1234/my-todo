import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  faCircle,
  faCircleCheck,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { nanoid } from "nanoid";

function HomeInput(props) {
  const [currentTodo, setCurrentTodo] = useState("");

  const handleKeyUp = (e, currentTodo) => {
    if (e.key === "Enter") createNewTodo(currentTodo);
  };
  const handleChange = (event) => {
    setCurrentTodo(event.target.value);
  };

  const createNewTodo = (todo) => {
    const newTodo = {
      id: nanoid(),
      todo: todo,
      isComplete: false,
      date: new Date(),
    };
    setCurrentTodo("");
    props.setCurrentList((oldArr) => [newTodo, ...oldArr]);
    props.setLists((oldArr) => {
      return oldArr.map((list) => {
        return list.listName === props.activeSite
          ? { ...list, todolist: props.currentList }
          : list;
      });
    });
  };

  const handleComplete = (id) => {
    props.setCurrentList((oldArr) => {
      return oldArr.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      );
    });
  };

  const deleteTodo = (id) => {
    const filteredTodos = props.currentList.filter((todo) => todo.id !== id);
    console.log(filteredTodos)
    props.setCurrentList(filteredTodos);
  };
  

  const todoElements = props.currentList.map((todo, index) => {
    return (
      <div className="home-page-list" key={index}>
        <FontAwesomeIcon
          icon={todo.isComplete ? faCircleCheck : faCircle}
          onClick={() => handleComplete(todo.id)}
        />
        <span>
          {todo.isComplete ? <strike>{todo.todo}</strike> : <>{todo.todo}</>}
        </span>
        <div className="list-icons">
          <div onClick={() => deleteTodo(todo.id)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="home-page-lists">
        <h3>{props.activeSite}</h3>
        {todoElements}
      </div>
      <div className="home-page-input">
        <FontAwesomeIcon icon={faCircle} />
        <input
          type="text"
          placeholder="Enter your todos"
          onChange={handleChange}
          value={currentTodo}
          onKeyUp={(e) => handleKeyUp(e, currentTodo)}
        />
        <div className="icon-button" onClick={() => createNewTodo(currentTodo)}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </div>
      </div>
    </>
  );
}

export default HomeInput;
