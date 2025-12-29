import "../Style/Bar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../../context/menucontext";
import { Window } from "../../../context/windowcontext";
import { links } from "./NavLink";
import { Axios } from "../../../Api/axios";
import { USER } from "../../../Api/api";

export default function SideBar() {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const window = useContext(Window);
  const windowSize = window.isWindow;
  const [user, setUser] = useState("");
  const nav = useNavigate();
  
    useEffect(() => {
      Axios.get(`/${USER}`)
        .then((data) => setUser(data.data))
        .catch(() => nav("/login", { replace: true }));
    }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0 , 0, 0 ,0.2)",
          display: windowSize < 745 && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar"
        style={{
          left: windowSize < 745 ? (isOpen ? "0" : "-100%") : 0,
          width: isOpen ? "220px" : "fit-content",
          padding: isOpen ? "10px 5px" : "10px",
          position: windowSize < 745 ? "fixed" : "sticky",
        }}
      >
        {links.map(
          (link, key) =>
            link.role.includes(user.role) && (
              <NavLink
                key={key}
                to={link.path}
                className="side-bar-link"
                style={{
                  fontSize: isOpen ? "20px" : "22px",
                  padding: isOpen ? "8px 20px" : "8px 20px",
                  transition: isOpen ? ".4s ease-in-out" : 0,
                }}
              >
                <FontAwesomeIcon icon={link.icon} className="icon" />
                <span style={{ display: isOpen ? "inline" : "none" }}>
                  {link.name}
                </span>
              </NavLink>
            )
        )}
      </div>
    </>
  );
}
