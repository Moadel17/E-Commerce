import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import Cookie from "cookie-universal";
import "../Style/sign.css";
import { baseUrl, LOGIN } from "../../../Api/api";
import Loading from "../../../Components/WebSites/Page/Auth/loading";

export default function LogIN() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //Ref
  const data = useRef("");

  // ERROR
  const [err, setErr] = useState("");

  // LOADING
  const [loading, setLoading] = useState(false);

  // COOKIE
  const cookie = Cookie();

  //useEffect
  useEffect(() => {
    data.current.focus();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/${LOGIN}`, form);
      setLoading(false);
      const token = res.data.token;
      const role = res.data.user.role;
      const go = role === "2001" ? "/" : "/dashboard";
      cookie.set("mo", token);
      window.location.pathname = `${go}`;
      console.log(res);
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErr("Wrong Email or Password");
      } else {
        setErr("Server Error");
      }
    }
  }

  return (
    <>
      {loading && <Loading />}

      <div className="contianer">
        <div className="row">
          <Form onSubmit={handleSubmit}>
            <h1>Log In Now</h1>
            <Form.Group className="custom-form input-con">
              <Form.Control
                className="input"
                type="email"
                id="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
                required
                ref={data}
              />
              <Form.Label className="label">Email</Form.Label>
            </Form.Group>
            <Form.Group className="custom-form input-con">
              <Form.Control
                className="input"
                id="password"
                type="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
              />
              <Form.Label className="label">Password</Form.Label>
            </Form.Group>
            <button className="btn" style={{ fontFamily: "monospace" }}>
              Log In
            </button>
            <div className="google-btn">
              <a href="http://127.0.0.1:8000/login-google">
                <div className="icon-back-ground">
                  <img
                    className="google-icon"
                    src={require("../../../images/google-icon.png")}
                    alt="sign-in with google"
                  />
                </div>
                <p className="btn-text">Sign in with google</p>
              </a>
            </div>
            {err !== "" && <span className="error">{err}</span>}
          </Form>
        </div>
      </div>
    </>
  );
}
