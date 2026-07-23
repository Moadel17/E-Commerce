import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { Cat } from "../../../Api/api";
import { Loading } from "../../../data";
import "../../../style/editUser.css";

export default function NewCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  //Ref
  const data = useRef("");

  // LOADING
  const [loading, setLoading] = useState(false);

  //useEffect
  useEffect(() => {
    data.current.focus();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      await Axios.post(`/${Cat}/add`, form);
      setLoading(false);
      window.location.pathname = "/dashboard/categories";
    } catch (err) {
      setLoading(false);
      console.log(err);
      //   setErr(err);
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
            onSubmit={handleSubmit}>
            <h1>New Category</h1>
            <Form.Group className="custom-form-user input-con-user">
              <Form.Control
                className="input-user"
                type="text"
                id="title"
                value={title}
                placeholder="Enter Title..."
                onChange={(e) => setTitle(e.target.value)}
                required
                ref={data}
              />
              <Form.Label className="label-user">Tilte</Form.Label>
            </Form.Group>
            <Form.Group className="custom-form-user input-con-user">
              <Form.Control
                className="input-user"
                style={{ padding: "10px 20px" }}
                type="file"
                id="image"
                placeholder="Enter Title..."
                onChange={(e) => setImage(e.target.files.item(0))}
                required
              />
              <Form.Label className="label-user">Image</Form.Label>
            </Form.Group>
            <button
              className="btn-user"
              style={{ fontFamily: "monospace" }}
              disabled={title.length > 1 ? false : true}>
              Add
            </button>
            {/* {err !== "" && <span className="error">{err}</span>} */}
          </Form>
        </div>
      </div>
    </>
  );
}
