import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import MenuContext from "./context/menucontext";
import WindowContext from "./context/windowcontext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/index.css";
import "./style/custom.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WindowContext>
    <MenuContext>
      <Router>
        <App />
      </Router>
    </MenuContext>
  </WindowContext>,
);
