import Cookie from "cookie-universal";
import { Axios } from "../../Api/axios";
import { LOGOUT } from "../../Api/api";

export default function Logout() {
  const cookie = Cookie();

  async function handleLogOut() {
    try {
      await Axios.get(`/${LOGOUT}`);
      cookie.remove("mo");
      window.location.pathname = "/";
    } catch (err) {
      console.log(err);
    }
  }

  return <button onClick={handleLogOut}>Log Out</button>;
}
