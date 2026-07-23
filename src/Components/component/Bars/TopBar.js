import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import { LOGOUT, USER } from "../../../Api/api";
import { Axios } from "../../../Api/axios";
import { Menu } from "../../../context/menucontext";
import "../../../style/Bar.css";

export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const [name, setName] = useState("");
  const cookie = Cookie();
  const nav = useNavigate("");

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setName(data.data.name))
      .catch(() => nav("/login", { replace: true }));
  }, []);

  async function handleLogOut() {
    try {
      await Axios.get(`/${LOGOUT}`);
      cookie.remove("mo");
      window.location.pathname = "/";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="top-bar">
      <div className="logo-con">
        <div className="d-flex align-items-center gap-5">
          <h1>Mo Adel</h1>
          <FontAwesomeIcon
            icon={faBars}
            className="icon"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>

        <div>
          <DropdownButton id="dropdown-basic-button" title={name}>
            <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}
