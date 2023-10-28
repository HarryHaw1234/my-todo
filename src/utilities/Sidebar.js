import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { faCalendarPlus, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Modal from "react-modal";

const customStyles = {
  content: {
    width: "80%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function Sidebar(props) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newList, setNewList] = useState({
    icon: "",
    listName: "",
    todolist: [],
    default: false
  })

  function handleChange (e) {
    setNewList(oldData => {return {...oldData, listName: e.target.value}});
  }
  function addList () {
    if(newList.listName !== "" && !(props.lists.find(list => list.listName === newList.listName ))) {
    props.setLists(oldArr => [...oldArr, newList]);
    props.setActiveSite(newList.listName);
    } else {
      return;
    }
  }

  const deleteList = (listName) => {
    props.setActiveSite("My Day")
    const filteredLists = props.lists.filter(list => list.listName !== listName)
    props.setLists(filteredLists)
  }
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#000";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const listElements = props.lists.map((list, index) => {
    return (
      <div
        className={`sidebar-list ${
          props.activeSite === list.listName ? "active" : ""
        }`}
        onClick={(e) => props.handleSite(e, list.listName)}
        data-value={list.listName}
        key={index}
      >
        {list.icon !== "" && <FontAwesomeIcon icon={list.icon} style={{ color: "#8f53ff" }} />}
        <span>{list.listName}</span>
        {!(list.default) && <div className="svg-parent"onClick={() => deleteList(list.listName, index)}><FontAwesomeIcon icon={faTrashCan} style={{ color: "#8f53ff" }}/></div>}
      </div>
    );
  });

  return (
    <>
      <div className="sidebar-header">
        <Link to={"/"}>
          <img src="/logo.svg" alt="Logo" className="logo-image-small" />
        </Link>
        <div
          className="sidebar-close"
          onClick={() => {
            props.handleClick();
          }}
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </div>
      </div>
      <div className="sidebar-lists">{listElements}</div>
      <div className="sidebar-addLists" onClick={openModal}>
        <FontAwesomeIcon icon={faCalendarPlus} />
        <span>Add new list</span>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add new list</h2>
        <input
          type="text"
          placeholder="Enter your list name"
          className="modal-input"
          onChange={handleChange}
          value={newList.listName}
          required
        />
        <div className="btn-group">
          <button className="modal-btn cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button className="modal-btn create-btn" onClick={() => {
            addList();
            closeModal();
            setNewList({
              icon: "",
              listName: "",
              todolist: [],
              default: false
            })
            }}>Create</button>
        </div>
      </Modal>
      </>
  );
}

export default Sidebar;
