import Sidebar from "../utilities/Sidebar";
import { Allotment } from "allotment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarOpenStyle = {
    transform: sidebarOpen ? `scale(${0})` : `scale(${1})`,
  };

  const handleClick = () => {
    setSidebarOpen((oldData) => !oldData);
  };
  return (
    <div className="home-container">
      <Allotment defaultSizes={[100,300]}>
        <Allotment.Pane
          minSize={250}
          maxSize={350}
          visible={sidebarOpen ? true: false}
        >
          <div className="home-sidebar">
            <Sidebar handleClick={handleClick}/>
          </div>
        </Allotment.Pane>
        <div className="home-page"></div>
      </Allotment>
      <div
        className="sidebar-open"
        style={sidebarOpenStyle}
        onClick={() => {
          handleClick();
        }}
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </div>
    </div>
  );
}

export default Home;
