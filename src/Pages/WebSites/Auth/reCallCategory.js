import NavBar from "../Page/navBar";
import { Outlet } from "react-router-dom";

export default function ReCallCategory() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
