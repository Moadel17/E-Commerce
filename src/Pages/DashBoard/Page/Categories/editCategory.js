import { useEffect, useState } from "react";
import "../../Style/editUser.css";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Axios } from "../../../../Api/axios";
import { Cat } from "../../../../Api/api";
import Loading from '../../../../Components/WebSites/Page/Auth/loading'

export default function EditCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();

  // ERROR
  const [err, setErr] = useState("");

  // LOADING
  const [loading, setLoading] = useState(false);

  const [able, setAble] = useState(true);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${Cat}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        setLoading(false);
      })
      .then(() => setAble(false))
      .catch(() =>
        window.location.pathname("/dashboard/categories/page/404", {
          replace: true,
        })
      );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      await Axios.post(`/${Cat}/edit/${id}`, form);
      setLoading(false);
      window.location.pathname = "/dashboard/categories";
    } catch (err) {
      setLoading(false);
      console.log(err);
      setErr(err);
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
            <h1>Edit Category</h1>
            <Form.Group className="custom-form-user input-con-user">
              <Form.Control
                className="input-user"
                type="text"
                id="name"
                value={title}
                placeholder="Enter Name"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Form.Label className="label-user">Tilte</Form.Label>
            </Form.Group>
            <Form.Group className="custom-form-user input-con-user">
              <Form.Control
                className="input-user"
                type="file"
                placeholder="Enter Email"
                onChange={(e) => setImage(e.target.files.item(0))}
              />
              <Form.Label className="label-user">Image</Form.Label>
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
