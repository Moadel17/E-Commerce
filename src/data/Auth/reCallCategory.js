import { Outlet } from "react-router-dom";
import NavBar from "../../Routes/routes/home/navBar";

export default function ReCallCategory() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
