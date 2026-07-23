import { faStar as regular } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import downLoadIcon from "../../../images/DownLoad Icon.png";

export default function SaleProductsCon(props) {
  const round = Math.round(props.rating);
  const stars = Math.min(round, 5);
  const goldStars = Array.from({ length: stars }).map((_, key) => (
    <FontAwesomeIcon
      key={key}
      style={{ cursor: "pointer", color: "gold" }}
      icon={solid}
    />
  ));
  const emptyStars = Array.from({ length: 5 - stars }).map((_, key) => (
    <FontAwesomeIcon key={key} style={{ cursor: "pointer" }} icon={regular} />
  ));
  return (
    <NavLink
      to={`/product/${props.id}`}
      style={{
        width: "300px",
        height: "100%",
        padding: "10px 30px",
        cursor: "pointer",
        textDecoration: "none",
      }}
      className="card">
      <p style={{ color: "gray", fontSize: "16px", cursor: "auto" }}>
        {props.title.length > 20
          ? props.title.slice(1, 20) + "..."
          : props.title}
      </p>
      <p style={{ fontSize: "18px", cursor: "auto" }}>
        {props.description.length > 25
          ? props.description.slice(1, 25) + "..."
          : props.description}
      </p>
      <img
        src={downLoadIcon}
        // src={props.img}
        style={{ width: "200px", margin: "0 auto" }}
        alt="."
      />
      <div style={{ marginTop: "20px" }}>
        {goldStars}
        {emptyStars}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "10px",
          justifyContent: "space-between",
        }}>
        <p style={{ fontSize: "20px", fontWeight: "500", color: "blue" }}>
          {props.discount}$
          <span
            style={{
              paddingLeft: "20px",
              fontSize: "16px",
              color: "black",
              textDecoration: "line-through",
            }}>
            {props.price} $
          </span>
        </p>
        <FontAwesomeIcon
          style={{
            fontSize: "20px",
            border: "1px solid #8080808a",
            padding: "8px",
            cursor: "pointer",
            transition: ".3s all",
          }}
          className="faShoppingCart"
          icon={faShoppingCart}
        />
      </div>
    </NavLink>
  );
}
