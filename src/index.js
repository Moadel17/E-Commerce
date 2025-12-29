import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuContext from "./context/menucontext";
import WindowContext from "./context/windowcontext";
import "./custom.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WindowContext>
    <MenuContext>
      <Router>
        <App />
      </Router>
    </MenuContext>
  </WindowContext>
);
