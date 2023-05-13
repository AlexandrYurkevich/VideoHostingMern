import "./styles.css";
import { VscMenu } from "react-icons/vsc"
import { BsClockHistory } from "react-icons/bs"
import { MdSubscriptions, MdLogout } from "react-icons/md"
import { HiHome } from "react-icons/hi"
import { IoLogoReact } from "react-icons/io5"

import { HeaderContext } from "../../HeaderContext"
import { WebContext } from "../../WebContext"
import { useContext } from "react";

export default function HiddenContainer() {
  const { user, setUser, setChannel } = useContext(WebContext);
  const { setSidebarHidden } = useContext(HeaderContext)
  return (
    <div className="hidden-container">
      <div className="hidden-sidebar">
        <div className="sidebar-header">
          <button className="logo-element" onClick={()=>setSidebarHidden(false)}>
            <VscMenu className="logo-menu" alt="menu" />
          </button>
          <a href="/">
          <button className="logo-element">
            <IoLogoReact className="logo-icon" alt="logo" />
            ReactTube
          </button>
          </a>
        </div>
        <div className="hidden-navigationbar">
          <a href="/" className="nav-element-out">
            <button className="nav-element">
              <HiHome className="nav-img" src="" alt="home" />
              Main Page
            </button>
          </a>
          <a href="/history" className="nav-element-out">
            <button className="nav-element">
              <BsClockHistory className="nav-img" src="" alt="history" />
              History
            </button>
          </a>
          <a href="/subscribes" className="nav-element-out">
            <button className="nav-element">
              <MdSubscriptions className="nav-img" src="" alt="history" />
              Subscribes
            </button>
          </a>
        </div>
        <div className="settingsbar">
            {user && <button className="nav-element" onClick={()=>{
              setUser(null);
              setChannel(null);
              sessionStorage.removeItem('reacttube-user')
              sessionStorage.removeItem('reacttube-channel')
              localStorage.removeItem('reacttube-user')
              localStorage.removeItem('reacttube-channel')
              setSidebarHidden(false)
            }}>
              <MdLogout className="nav-img" src="" alt="history" />
              Logout
            </button>}
        </div>
      </div>
      <div className="shadow-container" />
    </div>
  );
}