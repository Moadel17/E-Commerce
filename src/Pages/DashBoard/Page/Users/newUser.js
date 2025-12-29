import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../../Style/newUser.css";
import Loading from "../../../../Components/WebSites/Page/Auth/loading";
import { Axios } from "../../../../Api/axios";
import { USER } from "../../../../Api/api";

export default function NewUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  //Ref
  const data = useRef("");

  // ERROR
  const [err, setErr] = useState("");

  // LOADING
  const [loading, setLoading] = useState(false);

  //Navigate
  const nav = useNavigate();

  //useEffect
  useEffect(() => {
    data.current.focus();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await Axios.post(`/${USER}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      setLoading(false);
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

      <div className="contianer-user">
        <div className="row-user">
          <Form
            className="Form"
            style={{ height: "30.7rem" }}
            onSubmit={handleSubmit}
          >
            <h1>New User</h1>
            <Form.Group className="custom-form-user input-con-user">
              <Form.Control
                className="input-user"
                type="text"
                id="name"
                value={name}
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                required
                ref={data}
              />
              <Form.Label className="label-user">Name</Form.Label>
            </Form.Group>
            <Form.Group className="custom-form-user input-con-user">
              <Form.Control
                className="input-user"
                type="email"
                id="email"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Label className="label-user">Email</Form.Label>
            </Form.Group>
            <Form.Group className="custom-form-user input-con-user">
              <Form.Control
                className="input-user"
                type="password"
                id="password"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
              <Form.Label className="label-user">Password</Form.Label>
            </Form.Group>
            <Form.Group className="custom-form-user input-con-user mt-1 mb-2">
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option disabled value="">
                  Select Role
                </option>
                <option value="1995">Admin</option>
                <option value="2001">User</option>
                <option value="1996">Writer</option>
                <option value="1999">Product Manger</option>
              </Form.Select>
              <Form.Label className="label-user">Role</Form.Label>
            </Form.Group>
            <button
              className="btn-user"
              style={{ fontFamily: "monospace" }}
              disabled={
                name.length > 1 &&
                email.length > 1 &&
                password.length >= 8 &&
                role !== ""
                  ? false
                  : true
              }
            >
              Add
            </button>
            {err !== "" && <span className="error">{err}</span>}
          </Form>
        </div>
      </div>
    </>
  );
}
