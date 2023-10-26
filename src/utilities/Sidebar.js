import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
function Sidebar(props) {
  const [lists, setLists] = useState([]);

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <Link to={"/"}>
          <img src="/logo.svg" alt="Logo Image" className="logo-image-small" />
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
    </div>
  );
}

export default Sidebar;
