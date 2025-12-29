import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../../Style/editUser.css";
import Cookie from "cookie-universal";
import { USER } from "../../../../Api/api";
import Loading from "../../../../Components/WebSites/Page/Auth/loading";
import { Axios } from "../../../../Api/axios";

export default function EditUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { id } = useParams();

  // ERROR
  const [err, setErr] = useState("");

  // LOADING
  const [loading, setLoading] = useState(false);

  const [able, setAble] = useState(true);

  //Navigate
  const nav = useNavigate();

  // COOKIE
  const cookie = Cookie();

  useEffect(() => {
    setLoading(true);
    Axios.get(`${USER}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
        setLoading(false);
      })
      .then(() => setAble(false))
      .catch(() => nav("/dashboard/users/page/404", { replace: true }));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await Axios.post(`/${USER}/edit/${id}`, {
        name: name,
        email: email,
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
            style={{ height: "26rem" }}
            onSubmit={handleSubmit}
          >
            <h1>Edit User</h1>
            <Form.Group className="custom-form-user input-con-user">
              <Form.Control
                className="input-user"
                type="text"
                id="name"
                value={name}
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                required
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
            <Form.Group className="custom-form-user input-con-user mt-1 mb-3">
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
              </Form.Select>
              <Form.Label className="label-user">Role</Form.Label>
            </Form.Group>
            <button
              disabled={able}
              className="btn-user"
              style={{ fontFamily: "monospace" }}
            >
              Edit
            </button>
            {err !== "" && <span className="error">{err}</span>}
          </Form>
        </div>
      </div>
    </>
  );
}
