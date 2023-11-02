import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  faCircle,
  faCircleCheck,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { nanoid } from "nanoid";
import Modal from "react-modal";

const customStyles = {
  content: {
    width: window.innerWidth < 415 ? "80%" : "50%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function HomeInput(props) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#000";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [currentTodo, setCurrentTodo] = useState("");
  const [editedTodo, setEditedTodo] = useState("");
  const handleKeyUp = (e, currentTodo) => {
    if (e.key === "Enter") createNewTodo(currentTodo);
  };
  const handleChange = (event) => {
    setCurrentTodo(event.target.value);
  };

  const createNewTodo = (todo) => {
    if (todo === "") return;
    const newTodo = {
      id: nanoid(),
      todo: todo,
      isComplete: false,
      date: new Date(),
    };
    setCurrentTodo("");
    props.setCurrentList((oldArr) => [...oldArr, newTodo]);
    props.setLists((oldArr) => {
      return oldArr.map((list) => {
        return list.listName === props.activeSite
          ? { ...list, todolist: props.currentList }
          : list;
      });
    });
  };

  const updateToDo = (id, newToDo) => {
    props.setCurrentList((oldArr) => {
      return oldArr.map((todolist) =>
        (todolist.id === id && todolist.todo === newToDo) ? { ...todolist, todo: newToDo } : todolist
      );
    });
    setEditedTodo("");
  }
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
          <div onClick={() => openModal()}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </div>
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit your list</h2>
        <input
          type="text"
          placeholder="Enter your new todo"
          className="modal-input"
          onChange={(e) => setEditedTodo(e.target.value)}
          value={editedTodo}
          required
        />
        <div className="btn-group">
          <button className="modal-btn cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button className="modal-btn create-btn" onClick={() => {
            updateToDo(todo.id, editedTodo)
            closeModal();
            }}>Edit</button>
        </div>
      </Modal>
      </div>
    );
  });

  return (
    <>
        <h3>{props.activeSite}</h3>
      <div className="home-page-lists">
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
