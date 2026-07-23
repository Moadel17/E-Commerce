import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";
import { baseUrl, GOOGLE_CALL_BACK } from "../../Api/api";

export default function GoogleCallBack() {
  const cookie = Cookie();
  const location = useLocation();

  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(
          `${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`,
        );
        const token = res.data.access_token;
        cookie.set("mo", token);
        window.location.pathname = "/";
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, []);
}
