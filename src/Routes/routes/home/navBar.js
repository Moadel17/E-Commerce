import { useEffect, useState } from "react";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { navLinks } from "./navLinks";
import { Axios } from "../../../Api/axios";
import { CAT } from "../../../Api/api";
import "../../../style/home.css";

export default function NavBar() {
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  // Axios.get(`${CAT}`).then((res) => setCategories(res.data.slice(-7)));
  // }, []);

  // const showCategories = categories.map((category) => {
  //   return (
  //     <Link className="nav-2-item">
  //       <p>
  //         {category.title.length > 15
  //           ? category.title.slice(1, 15) + " ...."
  //           : category.title}
  //       </p>
  //     </Link>
  //   );
  // });

  return (
    <div className="box">
      <div className="nav">
        <div>
          <Link to="/">
            <img
              src={require("../../../images/logo.jpg")}
              style={{ width: "200px", height: "80px" }}
              alt="."
            />
          </Link>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search Product"
            style={{
              width: "500px",
              height: "40px",
              padding: "0 10px",
              border: "1px solid gray",
              outline: "none",
            }}
          />
          <button
            style={{
              width: "100px",
              height: "40px",
              border: "1px solid #3636f5",
              backgroundColor: "#3636f5",
              color: "white",
            }}>
            Search
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/cartPage">
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{
                fontSize: "25px",
              }}
            />
          </Link>
          <Link>
            <FontAwesomeIcon icon={faUser} className="home-profile-icon" />
          </Link>
        </div>
      </div>

      <div className="nav-2">
        {/* {showCategories} */}
        {navLinks.map((link, key) => (
          <Link key={key} to={link.to} className="nav-2-item">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
