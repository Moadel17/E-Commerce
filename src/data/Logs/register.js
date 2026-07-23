import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { baseUrl, REGISTER } from "../../Api/api";
import googleIcon from "../../images/google-icon.png";
import Loading from "../loading/loading";
import "../../style/sign.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  //Ref
  const data = useRef("");

  // ERROR
  const [err, setErr] = useState("");

  // LOADING
  const [loading, setLoading] = useState(false);

  //Navigate
  const nav = useNavigate();

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
      const res = await axios.post(`${baseUrl}/${REGISTER}`, form);
      setLoading(false);
      const token = res.data.token;
      cookie.set("mo", token);
      nav("/dashboard");
    } catch (err) {
      setLoading(false);
      if (err.response.status === 422) {
        setErr("Email has been taken");
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
            <h1>Register Now</h1>
            <Form.Group className="custom-form input-con">
              <Form.Control
                className="input"
                type="text"
                id="name"
                placeholder="Enter Name"
                value={form.name}
                onChange={handleChange}
                required
                ref={data}
              />
              <Form.Label className="label">Name</Form.Label>
            </Form.Group>
            <Form.Group className="custom-form input-con">
              <Form.Control
                className="input"
                type="email"
                id="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
                required
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
              Sign Up
            </button>
            <div className="google-btn">
              <a href="http://127.0.0.1:8000/login-google">
                <div className="icon-back-ground">
                  <img
                    className="google-icon"
                    src={googleIcon}
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
