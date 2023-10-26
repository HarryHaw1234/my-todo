import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faSun,
  faCalendar,
  faStar,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
function Sidebar(props) {

  const [lists, setLists] = useState([
    { icon: faSun, listName: "My Day" },
    { icon: faStar, listName: "Important" },
    { icon: faCalendar, listName: "Planned" },
    { icon: faHouse, listName: "Houseworks" }
  ]);

  const listElements = lists.map(list => {
    return (
        <div className="sidebar-list">
            <FontAwesomeIcon icon={list.icon} style={{color: "#8f53ff"}}/>
            <span>{list.listName}</span>
        </div>
    )
  })

  return (
    <div className="sidebar-container">
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
      <div className="sidebar-lists">
        {listElements}
      </div>
    </div>
  );
}

export default Sidebar;
