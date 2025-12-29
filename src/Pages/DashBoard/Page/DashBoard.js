import { Outlet } from "react-router-dom";
import SideBar from "../../../Components/DashBoard/Page/SideBar";
import TopBar from "../../../Components/DashBoard/Page/TopBar";
import "../Style/dashboard.css";

export default function DashBoard() {
  return (
    <div className="dash-con">
      <TopBar />
      <div style={{paddingTop : '70px' , display : 'flex' , gap : '10px' }}>
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}
