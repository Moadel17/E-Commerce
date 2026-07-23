import { Link } from "react-router-dom";

export default function Auth403({ role }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "ButtonHighlight",
        padding: "30px 20px",
        justifyContent: "center",
      }}
    >
      <div>
        <div
          style={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: "600",
            color: "red",
          }}
        >
          403 - Access Denied
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "600",
            color: "blue",
          }}
        >
          Opps , you don't have permission to access this page.
          <Link
            className="d-block btn btn-primary mt-2"
            style={{ fontSize: "18px", fontWeight: "600" }}
            to={role === "1996" ? "/dashboard/writer" : "/"}
          >
            {role === "1996" ? "Go To Writer Page" : "Go To Home Page"}
          </Link>
        </div>
      </div>
    </div>
  );
}
