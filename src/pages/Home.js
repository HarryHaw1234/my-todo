import Sidebar from "../utilities/Sidebar";
import HomeInput from "../utilities/HomeInput";
import { Allotment } from "allotment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faSun,
  faCalendar,
  faStar,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSite, setActiveSite] = useState("My Day");
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem("lists")) || [
      { icon: faSun, listName: "My Day", default: true, todolist: [] },
      { icon: faStar, listName: "Important", default: true, todolist: [] },
      { icon: faCalendar, listName: "Planned", default: true, todolist: [] },
      { icon: faHouse, listName: "Houseworks", default: true, todolist: [] },
    ]
  );
  
  const [currentList, setCurrentList] = useState(JSON.parse(localStorage.getItem("lists"))[0].todolist || []);
  useEffect(() => {
    setLists((oldArr) => {
      return oldArr.map((list) => {
        return list.listName === activeSite
          ? { ...list, todolist: currentList }
          : list;
      });
    });
  }, [currentList])
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [currentList, lists]);
  console.log(window.innerWidth)
  const sidebarOpenStyle = {
    transform: sidebarOpen ? `scale(${0})` : `scale(${1})`,
  };

  const homepageStyle = {
    width: sidebarOpen ? `` : `${90}%`,
  };

  const handleClick = () => {
    setSidebarOpen((oldData) => !oldData);
  };

  const handleSite = (event, listName) => {
    if(event.target.classList.contains("svg-parent") || event.target.tagName === "svg") return;
    setLists((oldArr) => {
      return oldArr.map((list) => {
        return list.listName === activeSite
          ? { ...list, todolist: currentList }
          : list;
      });
    });
    if(window.innerWidth < 415) setSidebarOpen(oldData => !oldData)
    setActiveSite(listName);
    const currenttodoList = lists.find((list) => list.listName === listName);
    setCurrentList(currenttodoList.todolist);
  };
  return (
    <div className="home-container">
      <Allotment defaultSizes={[100, 300]}>
        <Allotment.Pane
          minSize={250}
          maxSize={350}
          visible={sidebarOpen ? true : false}
        >
          <div className="home-sidebar">
            <Sidebar
              handleClick={handleClick}
              handleSite={handleSite}
              activeSite={activeSite}
              setActiveSite={setActiveSite}
              lists={lists}
              setLists={setLists}
            />
          </div>
        </Allotment.Pane>
        <Allotment.Pane visible={window.innerWidth < 415 && sidebarOpen ? false : true}>
        <div className="home-page" style={homepageStyle}>
          <HomeInput
            activeSite={activeSite}
            currentList={currentList}
            setCurrentList={setCurrentList}
            setLists={setLists}
          />
        </div>
        </Allotment.Pane>
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
