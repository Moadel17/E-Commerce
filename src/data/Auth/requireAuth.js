import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import { USER } from "../../Api/api";
import Auth403 from "./auth403";
import Loading from "../loading/loading";

export default function RequireAuth({ allawedRole }) {
  //Navigate
  const nav = useNavigate();

  //User
  const [user, setUser] = useState("");

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => nav("/login", { replace: true }));
  }, []);

  //Cookie & Token
  const cookie = Cookie();
  const token = cookie.get("mo");

  return token ? (
    user === "" ? (
      <Loading />
    ) : allawedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Auth403 role={user.role} />
    )
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
