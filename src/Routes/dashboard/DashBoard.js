import { Outlet } from "react-router-dom";
import { SideBar, TopBar } from "../../Components";

export default function DashBoard() {
  return (
    <div className="dash-con">
      <TopBar />
      <div style={{ paddingTop: "70px", display: "flex", gap: "10px" }}>
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}
