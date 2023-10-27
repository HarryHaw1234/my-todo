import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import {
  faCircle,
  faCircleCheck,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { nanoid } from "nanoid";

const customStyles = {
  content: {
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
  const [currentTodo, setCurrentTodo] = useState("");

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
  }

  function closeModal() {
    setIsOpen(false);
  }

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
          <div onClick={openModal}>
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            Are you sure you want to delete?
          </h2>
          <button onClick={closeModal} className="modal-btn cancel-btn">
            Cancel
          </button>
          <button
            className="modal-btn delete-btn"
            onClick={() => {
              deleteTodo(todo.id);
              closeModal();
            }}
          >
            Delete
          </button>
        </Modal>
      </div>
    );
  });

  return (
    <>
      <div className="home-page-lists">
        <h3>{props.listName}</h3>
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
          autoFocus
        />
        <div className="icon-button" onClick={() => createNewTodo(currentTodo)}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </div>
      </div>
    </>
  );
}

export default HomeInput;
