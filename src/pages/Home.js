import Sidebar from "../utilities/Sidebar";
import HomeInput from "../utilities/HomeInput";
import { Allotment } from "allotment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { act } from "react-dom/test-utils";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSite, setActiveSite] = useState("My Day");

  const sidebarOpenStyle = {
    transform: sidebarOpen ? `scale(${0})` : `scale(${1})`,
  };

  const handleClick = () => {
    setSidebarOpen((oldData) => !oldData);
  };

  const handleSite = (list) => {
    setActiveSite(list)
  }
  return (
    <div className="home-container">
      <Allotment defaultSizes={[100,300]}>
        <Allotment.Pane
          minSize={250}
          maxSize={350}
          visible={sidebarOpen ? true: false}
        >
          <div className="home-sidebar">
            <Sidebar handleClick={handleClick} handleSite = {handleSite} activeSite = {activeSite}/>
          </div>
        </Allotment.Pane>
        <div className="home-page">
            <HomeInput listName = {activeSite}/>
        </div>
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
